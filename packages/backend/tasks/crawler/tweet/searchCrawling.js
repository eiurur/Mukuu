const TweetCrawler = require('../tweetCrawler');
const dayjs = require('dayjs');

const {
  acceptedDomains,
  acceptedWords,
} = require('@mukuu/common/lib/constants');

(async () => {
  try {
    const crawler = new TweetCrawler();
    const urls = acceptedDomains.join(' OR ');
    const words = acceptedWords.join(' OR ');
    const searchOption = {
      q: `url:${urls} ${words}`,
    };
    await crawler.traverseSearch(searchOption);
  } catch (e) {
    console.error(e);
  }
})();
