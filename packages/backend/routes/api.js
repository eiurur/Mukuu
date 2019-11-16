const API_VERSION = 'v1';

const { seaquencer } = require('../lib/seaquencer');
const { logging, parameters } = require('../middleware');
const ModelProviderFactory = require('../models/modelProviderFactory');

module.exports = app => {
  app.get(
    `/api/${API_VERSION}/posts/@:screenName`,
    [parameters.getParameters, logging.log],
    (req, res) =>
      seaquencer(
        req,
        res,
        (async ({ screenName, count, limit, skip }) => {
          const userProvider = ModelProviderFactory.create('user');
          const user = await userProvider.findOne({ screenName });
          if (!user) return {};
          const postProvider = ModelProviderFactory.create('post');
          const posts = await postProvider.find({
            postedBy: user._id,
          });
          return posts;
        })(req.params),
      ),
  );
  app.get(
    `/api/${API_VERSION}/users/:screenName`,
    [parameters.getParameters, logging.log],
    (req, res) =>
      seaquencer(
        req,
        res,
        (async ({ screenName }) => {
          const userProvider = ModelProviderFactory.create('user');
          const user = await userProvider.findOne({ screenName });
          return user || {};
        })(req.params),
      ),
  );

  app.get(
    `/api/${API_VERSION}/posts`,
    [parameters.getParameters, logging.log],
    (req, res) =>
      seaquencer(
        req,
        res,
        // (async ({ query, fields, options }) => {
        (async ({ postedBy, searchWord, from, to, limit, skip, sort }) => {
          const postProvider = ModelProviderFactory.create('post');

          const query = {};
          if (postedBy) query.postedBy = postedBy;
          if (searchWord) query.searchWord = searchWord;
          if (from) query.from = from;
          if (to) query.to = to;

          const searchOption = { limit: 20, skip: 0 };
          if (limit) searchOption.limit = limit;
          if (skip) searchOption.skip = skip;
          if (sort) searchOption.sort = sort;
          const posts = await postProvider.find(query, searchOption);
          return posts;
        })(req.params),
      ),
  );
  app.get(
    `/api/${API_VERSION}/users`,
    [parameters.getParameters, logging.log],
    (req, res) =>
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
              const postQuery = { postedBy: user._id };
              const postSearchOption = {
                limit: includePostNum,
                skip: 0,
                sort: 'retweetCountDesc',
              };
              const posts = await postProvider.find(
                postQuery,
                postSearchOption,
              );
              usersWithPost.push(Object.assign(user.toJSON(), { posts }));
            }
            return usersWithPost;
          }
          return users || [];
        })(req.params),
      ),
  );
};
