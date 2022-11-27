const path = require('path');
const axios = require("axios");
const ModelProviderFactory = require('../../models/modelProviderFactory');

const logger = require(path.join('..', '..', 'logger'))('cron');
const { setOutOfLink } = require('../util');
const { sleep } = require('../../lib/utils');

(async () => {
  try {
    logger.info('UPDATE QUOTED STATUS');

    const postProvider = ModelProviderFactory.create('post');
    const limit = 20;
    let skip = 0;
    while (true) {
      const query = {};
      const searchOption = { isOutOfLink: false, limit, skip };
      const posts = await postProvider.find(query, searchOption);
      if (!posts || posts.length <= 0) break;
      for (const post of posts) {
        const entities = JSON.parse(post.entities);
        if (entities && entities.urls) {
          for (const urls of entities.urls) {
            try {
              console.log(urls.expanded_url);
              if (urls.expanded_url.indexOf("https://mega.nz") !== -1) {
                await setOutOfLink(post, false);
                continue; // FREEZEするのでスキップ
              }
              const { status } = await axios.head(urls.expanded_url, {
                headers: {
                  referer: urls.expanded_url,
                }
              });
              await setOutOfLink(post, false);
              console.log(status);
            } catch (e) {
              console.log(e.response && e.response.status);
              if (e.response && e.response.status === 404) {
                await setOutOfLink(post, true);
              }
            }
            await sleep(500);
          }
        }
      }
      skip += limit;
    }
  } catch (e) {
    logger.info(e);
  }
})();
