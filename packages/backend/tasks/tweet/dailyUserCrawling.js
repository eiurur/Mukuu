const path = require('path');
const dayjs = require('dayjs');
const TweetCrawler = require('./tweetCrawler');
const ModelProviderFactory = require('../../models/modelProviderFactory');
const { sleep } = require('../../lib/utils');
const logger = require(path.join('..', '..', 'logger'))('cron');

const CRAWL_INTERVAL_MS = 1000 * 2;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const CRAWL_RANGE_DAYS_MS = 3 * ONE_DAY_MS;

(async () => {
  const crawler = new TweetCrawler();

  try {
    const userProvider = ModelProviderFactory.create('user');
    const user = await userProvider.find({});
    logger.info(user.length, user[0]);
    if (user.length === 0) return;
    const userIdList = user.map((u) => u.idStr);
    for (const userId of userIdList) {
      try {
        const searchOption = Object.assign({
          user_id: userId,
          include_rts: false,
        });
        const isFinish = (tweet) => {
          const currentAt = dayjs().valueOf();
          const tweetedAt = dayjs(
            tweet.created_at.replace('+0000', ''),
          ).valueOf();
          logger.info('isFinish');
          logger.info(currentAt);
          logger.info(tweetedAt);
          logger.info(CRAWL_RANGE_DAYS_MS);
          logger.info(
            currentAt - tweetedAt,
            currentAt - tweetedAt > CRAWL_RANGE_DAYS_MS,
          );
          return currentAt - tweetedAt > CRAWL_RANGE_DAYS_MS;
        };
        await crawler.traverseStatuses(searchOption, isFinish);
      } catch (e) {
        logger.info('TwitterCrawler error', e);
      }
    }
    await sleep(CRAWL_INTERVAL_MS);
  } catch (e) {
    logger.info('SiteCrawler error: ', e);
    return;
  }
})();
