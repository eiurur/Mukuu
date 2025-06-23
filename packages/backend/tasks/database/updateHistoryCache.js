const path = require('path');
const dayjs = require('dayjs');

const logger = require(path.join('..', '..', 'logger'))('cron');
const ModelProviderFactory = require('../../models/modelProviderFactory');

const aggregateAndUpsert = async (cacheKey, { sort, from, to }) => {
  logger.info(cacheKey, from, to);
  const shProvider = ModelProviderFactory.create('searchHistory');
  const query = [];
  const match = { createdAt: {} };
  if (from) match.createdAt.$gte = new Date(Number(from));
  if (to) match.createdAt.$lt = new Date(Number(to));

  if (from || to) {
    query.push({
      $match: match,
    });
  }
  query.push({
    $group: {
      _id: '$word',
      postCount: { $last: '$postCount' },
      createdAtLatest: { $max: '$createdAt' },
      count: {
        $sum: 1,
      },
    },
  });
  query.push({
    $project: {
      _id: 0,
      word: '$_id',
      count: 1,
      postCount: 1,
      createdAtLatest: 1,
    },
  });
  if (sort) {
    query.push({
      $sort: { createdAtLatest: -1 },
    });
  } else {
    query.push({
      $sort: { count: -1, _id: -1 },
    });
  }
  query.push({ $limit: 10 });
  const histories = await shProvider.aggregate(query);

  const shcProvider = ModelProviderFactory.create('searchHistoryCache');
  const cacheQuery = { cacheKey };
  const cacheData = {
    cacheKey,
    histories: JSON.stringify(histories),
    updatedAt: Date.now()
  };
  const cacheOption = { new: true, upsert: true };
  const result = await shcProvider.findOneAndUpdate(cacheQuery, cacheData, cacheOption);
  logger.info(result);
};

const deleteOldSearchHistory = async () => {
  logger.info('DELETE OLD HISTORY RECORDS');
  const thirtyDaysAgo = dayjs().add(-30, "days").toDate();
  try {
    const shProvider = ModelProviderFactory.create('searchHistory');
    const deleteResult = await shProvider.remove({
      createdAt: { $lt: thirtyDaysAgo }
    });
    const deletedCount = deleteResult.deletedCount || deleteResult.n || 0;
    logger.info(`Deleted ${deletedCount} old search history records`);
  } catch (error) {
    logger.error('Failed to delete old search history records:', error);
  }
};

(async () => {
  const today = dayjs().valueOf();
  const yesterday = dayjs()
    .add(-1, "days")
    .valueOf();
  const lastWeek = dayjs()
    .add(-7, "days")
    .valueOf();
  const lastMonth = dayjs()
    .add(-30, "days")
    .valueOf();
  const list = [
    {
      cacheKey: "day",
      args: {
        from: yesterday,
        to: today
      },
    },
    {
      cacheKey: "week",
      args: {
        from: lastWeek,
        to: today
      },
    },
    {
      cacheKey: "month",
      args: {
        from: lastMonth,
        to: today
      },
    }
  ];
  try {
    logger.info('UPDATE HISTORY');
    for (const row of list) {
      await aggregateAndUpsert(row.cacheKey, row.args);
    }

    // 古い検索履歴レコードを削除
    await deleteOldSearchHistory();
  } catch (e) {
    logger.info(e);
  }
})();