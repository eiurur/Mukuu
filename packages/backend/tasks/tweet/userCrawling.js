const TweetCrawler = require('./tweetCrawler');
const ModelProviderFactory = require('../../models/modelProviderFactory');
const { sleep } = require('../../lib/utils');

const CRAWL_INTERVAL_MS = 1000 * 2;

(async () => {
  const crawler = new TweetCrawler();

  try {
    const userProvider = ModelProviderFactory.create('user');
    const user = await userProvider.find({});
    console.log(user.length, user[0]);
    if (user.length === 0) return;
    const screenNames = user.map(u => u.screenName);
    for (const screenName of screenNames) {
      try {
        const searchOption = Object.assign({
          screen_name: screenName,
          include_rts: false,
        });
        await crawler.traverseStatuses(searchOption);
      } catch (e) {
        console.error('TwitterCrawler error', e);
      }
    }
    await sleep(CRAWL_INTERVAL_MS);
  } catch (e) {
    console.error('mochiMochiCrawler error: ', e);
    await browser.close();
    return;
  }
})();
