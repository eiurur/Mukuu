const { seaquencer } = require('../../lib/seaquencer');
const ModelProviderFactory = require('../../models/modelProviderFactory');
const TweetCrawler = require('../../tasks/crawler/tweetCrawler');
const { formatTweet } = require('../../lib/utils');

module.exports = class PostController {
  static count(req, res) {
    seaquencer(
      req,
      res,
      (async ({ data }) => {
        const { column, searchWord, higherRetweet, from, to } = data;
        const postProvider = ModelProviderFactory.create('post');
        const query = {};
        if (column) query.column = column;
        if (searchWord) query.searchWord = searchWord;
        if (higherRetweet) query.higher = higherRetweet;
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
        const { column, searchWord, higherRetweet, from, to, limit, skip, sort } = data;
        const postProvider = ModelProviderFactory.create('post');

        const query = {};
        if (column) query.column = column;
        if (searchWord) query.searchWord = searchWord;
        if (higherRetweet) query.higher = higherRetweet;
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
        const { screenName, column, count, limit, skip } = data;

        const userProvider = ModelProviderFactory.create('user');
        const user = await userProvider.findOne({ screenName });
        if (!user) return {};
        const postProvider = ModelProviderFactory.create('post');
        const query = {};
        query.postedBy = user._id;
        if (column) query.column = column;
        const posts = await postProvider.find(query);
        return posts;
      })(req.params),
    );
  }

  static register(req, res) {
    seaquencer(
      req,
      res,
      (async ({ data }) => {
        const crawler = new TweetCrawler();
        const isSearch = Array.isArray(data);
        if (isSearch) {
          for (const row of data) {
            try {
              const tweet = formatTweet(row);
              if (!tweet) continue;
              await crawler.saveByTAC(tweet);
            } catch (e) {
              console.error(e);
            }
          }
          return "ok";
        }

        const isUserTimeline = Object(data) === data;
        if (isUserTimeline) {
          const hasError = data.errors;
          if (hasError) return "Result has error";
          const isEmpty = !data.data.user.result;
          if (isEmpty) return "Tweet is empty";
          const isLockUser = data.data.user.__typename === "UserUnavailable";
          if (isLockUser) return "User is lock";
          const isCursor = !data.data.user.result.timeline_v2;
          if (isCursor) return "timeline_v2 hasnot timeline";

          const { entries } = data.data.user.result.timeline_v2.timeline.instructions.find(timeline => timeline.type === "TimelineAddEntries");

          for (const row of entries) {
            try {
              const tweet = formatTweet(row);
              if (!tweet) continue;
              await crawler.saveByTAC(tweet);
            } catch (e) {
              console.error(e);
            }
          }
          return "ok";
        }

        return "None";
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
            $sort: { count: -1, _id: -1 },
          });
        }
        query.push({ $limit: 10 });
        const posts = await postProvider.aggregate(query);
        return posts;
      })(req.params),
    );
  }
};
