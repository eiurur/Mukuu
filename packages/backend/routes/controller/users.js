const { seaquencer } = require('../../lib/seaquencer');
const ModelProviderFactory = require('../../models/modelProviderFactory');

module.exports = class UserController {
  static count(req, res) {
    seaquencer(
      req,
      res,
      (async ({ screenName, searchWord, postedBy }) => {
        const userProvider = ModelProviderFactory.create('user');

        const query = {};
        if (screenName) query.screenName = screenName;
        if (postedBy) query.postedBy = postedBy;
        if (searchWord) query.searchWord = searchWord;

        const searchOption = {};
        const count = await userProvider.count(query, searchOption);

        return { count };
      })(req.params),
    );
  }

  static get(req, res) {
    seaquencer(
      req,
      res,
      (async ({
        screenName,
        searchWord,
        postedBy,
        limit,
        skip,
        sort,
        includePostNum,
      }) => {
        const userProvider = ModelProviderFactory.create('user');

        const query = {};
        if (screenName) query.screenName = screenName;
        if (postedBy) query.postedBy = postedBy;
        if (searchWord) query.searchWord = searchWord;

        const searchOption = { limit: 20, skip: 0 };
        if (limit) searchOption.limit = limit;
        if (skip) searchOption.skip = skip;
        if (sort) searchOption.sort = sort;
        const users = await userProvider.find(query, searchOption);

        if (includePostNum && Number(includePostNum) > 0) {
          const postProvider = ModelProviderFactory.create('post');
          const usersWithPost = [];
          for (const user of users) {
            const postQuery = { column: { postedBy: user._id } };
            const postSearchOption = {
              limit: includePostNum,
              skip: 0,
              sort: 'retweetCountDesc',
            };
            const posts = await postProvider.find(postQuery, postSearchOption);
            usersWithPost.push(Object.assign(user.toJSON(), { posts }));
          }
          return usersWithPost;
        }
        return users || [];
      })(req.params),
    );
  }

  static getByScreenName(req, res) {
    seaquencer(
      req,
      res,
      (async ({ screenName }) => {
        const userProvider = ModelProviderFactory.create('user');
        const user = await userProvider.findOne({ screenName });
        return user || {};
      })(req.params),
    );
  }
};
