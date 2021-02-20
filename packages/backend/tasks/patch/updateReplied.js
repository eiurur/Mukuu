const path = require('path');
const ModelProviderFactory = require('../../models/modelProviderFactory');
const TweetCrawler = require('../../tasks/crawler/tweetCrawler');
const logger = require(path.join('..', '..', 'logger'))('update_replied');

(async () => {
  try {
    logger.info('UPDATE DATABASE');

    const crawler = new TweetCrawler();
    const postProvider = ModelProviderFactory.create('post');

    const query = {};
    const searchOption = {};
    const posts = await postProvider.find(query, searchOption);
    logger.info('update replied : ', posts.length);
    for (const post of posts) {
      const replied = await crawler.fetchReplied(post.idStr);
      if (!replied) continue;
      const entity = {
        query: { idStr: post.idStr },
        data: Object.assign(post, {
          replied: JSON.stringify(replied),
        }),
        options: { new: true, upsert: true },
      };
      const dbPost = await postProvider.findOneAndUpdate(
        entity.query,
        entity.data,
        entity.options,
      );
      logger.info('update  : ', JSON.stringify(dbPost));
    }
  } catch (e) {
    logger.info(e);
  }
})();
