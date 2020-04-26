const path = require('path');

const ModelProviderFactory = require('../../models/modelProviderFactory');
const { pattern } = require('@mukuu/common/lib/constants');
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
