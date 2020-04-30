const TweetCrawler = require('../tweetCrawler');
const dayjs = require('dayjs');

const {
  acceptedDomains,
  acceptedWords,
} = require('@mukuu/common/lib/constants');

(async () => {
  try {
    const crawler = new TweetCrawler();
    // let timestamp = dayjs().format('YYYY-MM-DD');

    const urls = acceptedDomains.join(' OR ');
    const words = acceptedWords.join(' OR ');
    const searchOption = {
      // since: dayjs(timestamp).format('YYYY-MM-DD_00:00:00_JST'),
      // until: dayjs(timestamp).format('YYYY-MM-DD_23:59:59_JST'),
      q: `url:${urls} ${words}`,
    };
    await crawler.traverseSearch(searchOption);
    // timestamp = dayjs(timestamp)
    //   .add(1, 'd')
    //   .format('YYYY-MM-DD');
  } catch (e) {
    console.error(e);
  }
})();
