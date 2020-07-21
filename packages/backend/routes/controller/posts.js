const { seaquencer } = require('../../lib/seaquencer');
const ModelProviderFactory = require('../../models/modelProviderFactory');
const TweetCrawler = require('../../tasks/crawler/tweetCrawler');

module.exports = class PostController {
  static count(req, res) {
    seaquencer(
      req,
      res,
      (async ({ data }) => {
        const { column, searchWord, from, to } = data;
        const postProvider = ModelProviderFactory.create('post');
        const query = {};
        if (column) query.column = column;
        if (searchWord) query.searchWord = searchWord;
        if (from) query.from = from;
        if (to) query.to = to;

        const searchOption = {};
        console.time('posts:count');
        const count = await postProvider.count(query, searchOption);
        console.timeEnd('posts:count');
        return { count };
      })(req.params),
    );
  }

  static query(req, res) {
    seaquencer(
      req,
      res,
      // (async ({ query, fields, options }) => {
      (async ({ data }) => {
        const { column, searchWord, from, to, limit, skip, sort } = data;
        const postProvider = ModelProviderFactory.create('post');

        const query = {};
        if (column) query.column = column;
        if (searchWord) query.searchWord = searchWord;
        if (from) query.from = from;
        if (to) query.to = to;

        const searchOption = { limit: 20, skip: 0 };
        if (limit) searchOption.limit = limit;
        if (skip) searchOption.skip = skip;
        if (sort) searchOption.sort = sort;
        console.time('posts:find');
        const posts = await postProvider.find(query, searchOption);
        console.timeEnd('posts:find');
        return posts;
      })(req.params),
    );
  }

  static queryByScreenName(req, res) {
    seaquencer(
      req,
      res,
      (async ({ data }) => {
        const { screenName, count, limit, skip } = data;

        const userProvider = ModelProviderFactory.create('user');
        const user = await userProvider.findOne({ screenName });
        if (!user) return {};
        const postProvider = ModelProviderFactory.create('post');
        const posts = await postProvider.find({
          postedBy: user._id,
        });
        return posts;
      })(req.params),
    );
  }

  static register(req, res) {
    seaquencer(
      req,
      res,
      (async ({ data }) => {
        let { tweetID } = data;
        try {
          new URL(tweetID);
          tweetID = /https?:\/\/twitter.com\/?(?:\#!\/)?(?:\w+)\/status(?:es)?\/(\d+)/.exec(
            tweetID,
          )[1];
        } catch (_) {}
        const crawler = new TweetCrawler();
        const result = await crawler.status(
          tweetID,
          {},
          { selfRegister: true },
        );
        return result;
      })(req.params),
    );
  }

  static aggregate(req, res) {
    seaquencer(
      req,
      res,
      (async ({ sort, from, to }) => {
        const postProvider = ModelProviderFactory.create('post');
        const query = [];
        query.push({
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' },
            },
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
            date: '$_id',
            count: 1,
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
        query.push({ $limit: 10 });
        const posts = await postProvider.aggregate(query);
        return posts;
      })(req.params),
    );
  }
};
