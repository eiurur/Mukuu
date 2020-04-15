const ModelProviderFactory = require('../../models/modelProviderFactory');
const path = require('path');
const logger = require(path.join('..', '..', 'logger'))('cron');

(async () => {
  try {
    logger.info('REMOVE DATABASE');
    const postProvider = ModelProviderFactory.create('post');
    const query = {
      text: /(^@.+|コイカツ|koika2|ハニーセレクト|HoneySelect|スカイリム|\[ダウンロード\] )/,
    };
    await postProvider.remove(query);
  } catch (e) {
    logger.info(e);
  }
})();
