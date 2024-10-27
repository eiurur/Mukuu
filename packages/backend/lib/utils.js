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

const random = (array) => array[Math.floor(Math.random() * array.length)];

/**
 * REF: https://github.com/tsukumijima/KonomiTV/blob/master/server/app/utils/TwitterGraphQLAPI.py
 */
const formatTweet = (rawPost) => {
  if (rawPost.content.__typename !== "TimelineTimelineItem") {
    return null;
  }
  // もし '__typename' が 'TweetWithVisibilityResults' なら、ツイート情報がさらにネストされているのでそれを取得
  let tweet = rawPost.content.itemContent.tweet_results;
  if (tweet.result.__typename === "TweetWithVisibilityResults") {
    tweet = tweet.tweet;
  }

  const legacyTweet = tweet.result.legacy;
  if (tweet.result.__typename === "Tweet") {
    const retweeted = legacyTweet.retweeted_status_result;
    if (retweeted) {
      if (retweeted.result.__typename === "Tweet") {
        const retweetedTweet = retweeted.result.legacy;
        const retweetedUser = retweeted.result.core.user_results.result.legacy;
        retweetedUser.id_str = retweeted.result.core.user_results.result.rest_id;
        retweetedTweet.user = retweetedUser;
        // console.log("Retweet:", retweetedTweet);
        return retweetedTweet;
      }
      return null;
    }

    const quoted = legacyTweet.quoted_status_result;
    if (quoted) {
      if (quoted.result.__typename === "Tweet") {
        const quotedTweet = quoted.result.legacy;
        const quotedUser = quoted.result.core.user_results.result.legacy;
        quotedUser.id_str = quoted.result.core.user_results.result.rest_id;
        quotedTweet.user = quotedUser;
        // console.log("Quoted:", quotedTweet);
        return quotedTweet;
      }
      return null;
    }

    const legacyUser = tweet.result.core.user_results.result.legacy;
    legacyUser.id_str = tweet.result.core.user_results.result.rest_id;
    legacyTweet.user = legacyUser;
    // console.log("Tweet:", legacyTweet);
    return legacyTweet;
  }
  return null;
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
  formatTweet,
  expandUrlOfTweet,
};
