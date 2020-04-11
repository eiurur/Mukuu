const { seaquencer } = require('../../lib/seaquencer');
const ModelProviderFactory = require('../../models/modelProviderFactory');

module.exports = class HistoryController {
  static register(req, res) {
    seaquencer(
      req,
      res,
      (async ({ text }) => {
        const historyProvider = ModelProviderFactory.create('history');
        const history = {
          query: { text: text },
          data: { $inc: { count: 1 }, updatedAt: Date.now() },
          options: { new: true, upsert: true },
        };
        await historyProvider.findOneAndUpdate(
          history.query,
          history.data,
          history.options,
        );
        return { result: 'ok' };
      })(req.params),
    );
  }

  static query(req, res) {
    seaquencer(
      req,
      res,
      // (async ({ query, fields, options }) => {
      (async ({ sort }) => {
        const historyProvider = ModelProviderFactory.create('history');
        const query = {};
        const searchOption = { limit: 8, skip: 0 };
        if (sort) searchOption.sort = sort;
        const historys = await historyProvider.find(query, searchOption);
        return historys;
      })(req.params),
    );
  }
};
