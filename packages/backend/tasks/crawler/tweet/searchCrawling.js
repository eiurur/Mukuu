const TweetCrawler = require('../tweetCrawler');
const dayjs = require('dayjs');

(async () => {
  try {
    const crawler = new TweetCrawler();
    // let timestamp = dayjs().format('YYYY-MM-DD');
    const searchOption = {
      // since: dayjs(timestamp).format('YYYY-MM-DD_00:00:00_JST'),
      // until: dayjs(timestamp).format('YYYY-MM-DD_23:59:59_JST'),
      q:
        'url:ux.getuploader.com OR url:drive.google.com COM3D2 OR CM3D2 OR カスタムオーダーメイド3D2 OR カスタムメイド3D2 OR オダメ OR カスメ',
    };
    await crawler.traverseSearch(searchOption);
    // timestamp = dayjs(timestamp)
    //   .add(1, 'd')
    //   .format('YYYY-MM-DD');
  } catch (e) {
    console.error(e);
  }
})();
