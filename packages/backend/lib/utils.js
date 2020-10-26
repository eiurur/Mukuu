const util = require('util');
const crypto = require('crypto');

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const createParams = (params) => {
  const result = [];
  for (const k in params) {
    const v = params[k];
    result.push(`${k}=${v}`);
  }
  return result.join('&');
};

const createHash = (key, algorithm) => {
  algorithm = algorithm || 'sha256';
  return crypto.createHash(algorithm).update(key).digest('hex');
};
const createUID = (size, base) => {
  size = size || 32;
  base =
    base || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const len = base.length;
  const buf = [];
  let i = 0;

  while (i < size) {
    buf.push(base[Math.floor(Math.random() * len)]);
    ++i;
  }
  return buf.join('');
};

const random = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const expandUrlOfTweet = (tweet) => {
  if (!tweet) return tweet;

  if (tweet.entities && tweet.entities.urls) {
    tweet.entities.urls.map((urls) => {
      tweet.full_text = tweet.full_text.replace(urls.url, urls.expanded_url);
    });
  }
  if (tweet.extended_entities && tweet.extended_entities.urls) {
    tweet.extended_entities.urls.map((urls) => {
      tweet.full_text = tweet.full_text.replace(urls.url, urls.expanded_url);
    });
  }
  if (tweet.user && tweet.user.entities) {
    if (
      tweet.user.description &&
      tweet.user.entities.description &&
      tweet.user.entities.description.urls
    ) {
      tweet.user.entities.description.urls.map((urls) => {
        tweet.user.description = tweet.user.description.replace(
          urls.url,
          urls.expanded_url,
        );
      });
    }
    if (
      tweet.user.url &&
      tweet.user.entities.url &&
      tweet.user.entities.url.urls
    ) {
      tweet.user.entities.url.urls.map((urls) => {
        tweet.user.url = tweet.user.url.replace(urls.url, urls.expanded_url);
      });
    }
  }
  return tweet;
};

module.exports = {
  sleep,
  createParams,
  createHash,
  createUID,
  random,
  expandUrlOfTweet,
};
