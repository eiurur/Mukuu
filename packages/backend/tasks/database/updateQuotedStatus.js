const ModelProviderFactory = require('../../models/modelProviderFactory');
const path = require('path');
const logger = require(path.join('..', '..', 'logger'))('cron');
const { addQuoteStatus, addInReply } = require('../util');

(async () => {
  try {
    logger.info('UPDATE QUOTED STATUS');

    const postProvider = ModelProviderFactory.create('post');
    const query = {};
    const searchOption = {};
    const posts = await postProvider.find(query, searchOption);
    for (const post of posts) {
      await addQuoteStatus(post);
      await addInReply(post);
    }
  } catch (e) {
    logger.info(e);
  }
})();
