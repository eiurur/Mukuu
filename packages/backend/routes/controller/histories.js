const { seaquencer } = require('../../lib/seaquencer');
const ModelProviderFactory = require('../../models/modelProviderFactory');

module.exports = class HistoryController {
  static register(req, res) {
    seaquencer(
      req,
      res,
      (async ({ word }) => {
        // 一旦
        // const historyProvider = ModelProviderFactory.create('history');
        // const history = {
        //   query: { word: word },
        //   data: { $inc: { count: 1 }, updatedAt: Date.now() },
        //   options: { new: true, upsert: true },
        // };
        // await historyProvider.findOneAndUpdate(
        //   history.query,
        //   history.data,
        //   history.options,
        // );

        const shProvider = ModelProviderFactory.create('searchHistory');
        const newSH = new shProvider.schema();
        newSH.word = word;
        await newSH.save();
        return { result: 'ok' };
      })(req.params),
    );
  }

  static query(req, res) {
    seaquencer(
      req,
      res,
      // (async ({ query, fields, options }) => {
      (async ({ sort, from, to }) => {
        const historyProvider = ModelProviderFactory.create('history');
        const query = {};
        if (from) query.from = from;
        if (to) query.to = to;
        const searchOption = { limit: 8, skip: 0 };
        if (sort) searchOption.sort = sort;
        const historys = await historyProvider.find(query, searchOption);
        return historys;
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
        if (from) match.createdAt.$gte = new Date(from);
        if (to) match.createdAt.$lt = new Date(to);
        if (from || to) {
          query.push({
            $match: match,
          });
        }
        query.push({
          $group: {
            _id: '$word',
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
            sum: 1,
          },
        });
        if (sort) {
          query.push({
            $sort: { createdAt: -1 },
          });
        } else {
          query.push({
            $sort: { count: -1 },
          });
        }
        query.push({ $limit: 8 });
        console.log(query);
        const historys = await shProvider.aggregate(query);
        return historys;
      })(req.params),
    );
  }
};
