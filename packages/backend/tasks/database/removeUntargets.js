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

    const denyPostProvider = ModelProviderFactory.create('denypost');
    const denyPosts = await denyPostProvider.find();
    if (denyPosts.length === 0) return;
    const denyPostQuery = {
      idStr: new RegExp(`(${denyPosts.map((post) => post.idStr).join('|')})`),
    };
    await postProvider.remove(denyPostQuery);
  } catch (e) {
    logger.info(e);
  }
})();
