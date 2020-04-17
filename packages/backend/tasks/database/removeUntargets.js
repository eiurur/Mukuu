const ModelProviderFactory = require('../../models/modelProviderFactory');
const path = require('path');
const { pattern } = require(path.join('..', '..', 'config', 'constants'));
const logger = require(path.join('..', '..', 'logger'))('cron');

(async () => {
  try {
    logger.info('REMOVE DATABASE');
    const postProvider = ModelProviderFactory.create('post');
    const query = {
      text: pattern.rejectedWords,
    };
    await postProvider.remove(query);
  } catch (e) {
    logger.info(e);
  }
})();
