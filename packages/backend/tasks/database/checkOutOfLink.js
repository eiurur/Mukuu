const path = require('path');
const axios = require("axios");
const { acceptedDomains } = require('@mukuu/common/lib/constants');
const ModelProviderFactory = require('../../models/modelProviderFactory');

const logger = require(path.join('..', '..', 'logger'))('cron');
const { setOutOfLink } = require('../util');
const { sleep } = require('../../lib/utils');

const parse = (text) => {
  const urls = text
    .split(/\r\n|\n|\s/)
    .filter(word => acceptedDomains.some(domain => word.indexOf(domain) !== -1))
    .map(url => {
      const match = url.match(/(https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[\w-./?%&=#!+]*))/);
      if (!match) return null;
      return match[1];
    });
  return urls
    .filter(url => !!url);
};

(async () => {
  try {
    logger.info('UPDATE QUOTED STATUS');

    const postProvider = ModelProviderFactory.create('post');
    const limit = 20;
    let skip = 0;
    while (true) {
      const query = {};
      const searchOption = { isOutOfLink: false,
        limit,
        skip,
        sort: 'createdAtDesc', };
      const posts = await postProvider.find(query, searchOption);
      if (!posts || posts.length <= 0) break;
      for (const post of posts) {
        const urls = parse(post.text);
        if (!urls || !urls.length) continue;
        try {
          const results = await Promise.all(urls.map(url => {
            console.log(url, post.createdAt);
            if (url.indexOf("https://mega.nz") !== -1) return true;
            return axios.head(url);
          }));
          await setOutOfLink(post, false);
        } catch (e) {
          console.log(e.response && e.response.status);
          if (e.response && e.response.status === 404) {
            await setOutOfLink(post, true);
          }
        }
        await sleep(500);
      }
      skip += limit;
      console.log(skip);
    }
    console.log("FIN");
  } catch (e) {
    logger.info(e);
  }
})();
