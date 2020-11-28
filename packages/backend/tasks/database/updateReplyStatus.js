const ModelProviderFactory = require('../../models/modelProviderFactory');
const path = require('path');
const logger = require(path.join('..', '..', 'logger'))('cron');
const { addReplyStatus } = require('../util');

(async () => {
  try {
    logger.info('UPDATE QUOTES');

    const postProvider = ModelProviderFactory.create('post');
    const query = {};
    const searchOption = {};
    const posts = await postProvider.find(query, searchOption);
    for (const post of posts) {
      const dbPost = await addReplyStatus(post);
      // if (dbPost) {
      //   logger.info('update  : ', JSON.stringify(dbPost));
      // }
    }
  } catch (e) {
    logger.info(e);
  }
})();
