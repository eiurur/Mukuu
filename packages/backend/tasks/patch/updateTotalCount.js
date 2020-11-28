const ModelProviderFactory = require('../../models/modelProviderFactory');
const path = require('path');
const logger = require(path.join('..', '..', 'logger'))('cron');

(async () => {
  try {
    logger.info('UPDATE DATABASE');

    const postProvider = ModelProviderFactory.create('post');

    const query = {};
    const searchOption = {};
    const posts = await postProvider.find(query, searchOption);
    logger.info('update posts count : ', posts.length);
    for (const post of posts) {
      const entity = {
        query: { idStr: post.idStr },
        data: Object.assign(post, {
          totalCount: post.retweetCount + post.favoriteCount,
        }),
        options: { new: true, upsert: true },
      };
      const dbPost = await postProvider.findOneAndUpdate(
        entity.query,
        entity.data,
        entity.options,
      );
      // logger.info('update  : ', JSON.stringify(dbPost));
    }
  } catch (e) {
    logger.info(e);
  }
})();
