const ModelProviderFactory = require('../../models/modelProviderFactory');
const path = require('path');
const logger = require(path.join('..', '..', 'logger'))('cron');

(async () => {
  try {
    logger.info('MIGRATE HISTORY TO SEARCH_HISTORY DATABASE');

    const hp = ModelProviderFactory.create('history');
    const hsp = ModelProviderFactory.create('searchhistory');

    const query = {};
    const searchOption = {};
    const histories = await hp.find(query, searchOption);
    for (const history of histories) {
      for (let i = 0; i < history.count; i++) {
        const newSH = new hsp.schema();
        newSH.word = history.text;
        await newSH.save();
        logger.info('update  : ', newSH.word, `${i + 1}回目`);
      }
    }
  } catch (e) {
    logger.info(e);
  }
})();
