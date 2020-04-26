const path = require('path');
const TweetCrawler = require('../tweetCrawler');
const ModelProviderFactory = require('../../../models/modelProviderFactory');
const { sleep } = require('../../../lib/utils');
const logger = require(path.join('..', '..', '..', 'logger'))('cron');

const CRAWL_INTERVAL_MS = 1000 * 2;

(async () => {
  const crawler = new TweetCrawler();
  try {
    await crawler.traverseStatuses();
    await sleep(CRAWL_INTERVAL_MS);
  } catch (e) {
    logger.info('error: ', e);
    return;
  }
})();
