const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const Twit = require('twit');

const logger = require(path.join('..', 'logger'))('cron');

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports = class TweetClient {
  static async statuses(option) {
    const param = Object.assign(
      {
        count: 200,
        tweet_mode: 'extended',
        include_entities: true,
      },
      option,
    );
    const { data } = await T.get('statuses/user_timeline', param);
    return { statuses: data };
  }

  static async search(option) {
    const param = Object.assign(
      {
        result_type: 'mixed',
        count: 200,
        tweet_mode: 'extended',
        include_entities: true,
      },
      option,
    );
    logger.debug(param);
    const { data } = await T.get('search/tweets', param);
    return data;
  }

  static async status(tweetId, option = {}) {
    const param = Object.assign(
      {
        result_type: 'mixed',
        count: 200,
        tweet_mode: 'extended',
        include_entities: true,
      },
      option,
    );
    const { data } = await T.get(`statuses/show/${tweetId}`, param);
    return data;
  }

  static async fetchReplied(tweetId) {
    try {
      const repley = await this.status(tweetId);
      const repliedId = repley && repley.in_reply_to_status_id_str;
      if (!repliedId) return null;
      const replied = await this.status(repliedId);
      return replied;
    } catch (e) {
      return null;
    }
  }
};
