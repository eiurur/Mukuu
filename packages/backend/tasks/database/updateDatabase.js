const ModelProviderFactory = require('../../models/modelProviderFactory');
const path = require('path');
const logger = require(path.join('..', '..', 'logger'))('cron');

(async () => {
  try {
    logger.info('UPDATE DATABASE');

    const userProvider = ModelProviderFactory.create('user');
    const postProvider = ModelProviderFactory.create('post');

    const query = {};
    const searchOption = {};
    const users = await userProvider.find(query, searchOption);
    logger.info('update users count : ', users.length);
    for (const user of users) {
      const postQuery = { column: { postedBy: user._id } };
      const postSearchOption = {};
      const posts = await postProvider.find(postQuery, postSearchOption);
      const entity = {
        query: { idStr: user.idStr },
        data: Object.assign(user, { postCount: posts.length }),
        options: { new: true, upsert: true },
      };
      const dbUser = await userProvider.findOneAndUpdate(
        entity.query,
        entity.data,
        entity.options,
      );
      logger.info('update  : ', JSON.stringify(dbUser));
    }
  } catch (e) {
    logger.info(e);
  }
})();
