const { seaquencer } = require('../../lib/seaquencer');
const ModelProviderFactory = require('../../models/modelProviderFactory');

module.exports = class HistoryController {
  static register(req, res) {
    seaquencer(
      req,
      res,
      (async ({ word }) => {
        if (word === undefined || word === null) return { result: 'invalid' };
        const normalizedWord = word.trim();
        if (normalizedWord === '') return { result: 'invalid' };
        const postProvider = ModelProviderFactory.create('post');
        const query = {};
        query.searchWord = normalizedWord;
        const postCount = await postProvider.count(query);

        const shProvider = ModelProviderFactory.create('searchHistory');
        const newSH = new shProvider.schema();
        newSH.word = normalizedWord;
        newSH.postCount = postCount;
        await newSH.save();
        return { word, postCount };
      })(req.params),
    );
  }

  static aggregate(req, res) {
    seaquencer(
      req,
      res,
      (async ({ sort, from, to }) => {
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
            $sort: { count: -1 },
          });
        }
        query.push({ $limit: 8 });
        const histories = await shProvider.aggregate(query);
        return histories;
      })(req.params),
    );
  }
  static random(req, res) {
    seaquencer(
      req,
      res,
      (async ({ sort, limit }) => {
        const shProvider = ModelProviderFactory.create('searchHistory');
        const query = [];
        query.push({
          $match: { postCount: { $gte: 1 } },
        });
        const size = Number(limit || 1);
        query.push({ $sample: { size } });
        const history = await shProvider.aggregate(query);
        return history;
      })(req.params),
    );
  }
};
