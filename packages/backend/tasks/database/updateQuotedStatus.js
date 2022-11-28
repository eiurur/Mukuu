const path = require('path');
const ModelProviderFactory = require('../../models/modelProviderFactory');

const logger = require(path.join('..', '..', 'logger'))('cron');
const { addQuoteStatus, addInReply } = require('../util');

(async () => {
  try {
    logger.info('UPDATE QUOTED STATUS');

    const postProvider = ModelProviderFactory.create('post');
    const limit = 20;
    let skip = 0;
    while (true) {
      const query = {};
      const searchOption = { limit, skip };
      const posts = await postProvider.find(query, searchOption);
      if (!posts || posts.length <= 0) break;
      for (const post of posts) {
        await addQuoteStatus(post);
        await addInReply(post);
      }
      skip += limit;
    }
  } catch (e) {
    logger.info(e);
  }
})();
