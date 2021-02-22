const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const dayjs = require('dayjs');

const { pattern, acceptedDomains } = require('@mukuu/common/lib/constants');
const { sleep, expandUrlOfTweet } = require('../../lib/utils');
const { addQuoteStatus, addInReply, addReplyStatus } = require('../util');
const TweetClient = require("../twitterClient")
const ModelProviderFactory = require('../../models/modelProviderFactory');
const logger = require(path.join('..', '..', 'logger'))('cron');

const SEARCH_INTERVAL = 1000 * 2;

const mapper = {
  user: (user) => {
    return {
      idStr: user.id_str,
      name: user.name,
      screenName: user.screen_name,
      url: user.url,
      description: user.description,
      protected: user.protected,
      followersCount: user.followers_count,
      friendsCount: user.friends_count,
      favouritesCount: user.favourites_count,
      statusesCount: user.statuses_count,
      profileBackgroundColor: user.profile_background_color,
      profileBackgroundImageUrl: user.profile_background_image_url_https,
      profileImageUrl: user.profile_image_url_https,
      profileBannerUrl: user.profile_banner_url,
      createdAt: dayjs(user.created_at.replace('+0000', '')).valueOf(),
      updatedAt: Date.now(),
    };
  },
  post: (tweet, postedBy) => {
    return {
      idStr: tweet.id_str,
      text: tweet.full_text,
      entities: JSON.stringify(tweet.extended_entities || tweet.entities),
      favoriteCount: tweet.favorite_count,
      retweetCount: tweet.retweet_count,
      totalCount: tweet.favorite_count + tweet.retweet_count,
      // replied: replied ? JSON.stringify(replied) : '',
      selfRegister: !!tweet.selfRegister,
      postedBy: postedBy,
      createdAt: dayjs(tweet.created_at.replace('+0000', '')).valueOf(),
      updatedAt: Date.now(),
    };
  },
};

module.exports = class TweetCrawler {
  constructor() {}

  async traverseStatuses(searchParam, isFinish) {
    await this.start('statuses', searchParam, {
      rejectPattern: (text) =>
        pattern.rejectedWords.test(text) ||
        acceptedDomains.every((domain) => text.indexOf(domain) === -1),
      isFinish: isFinish,
    });
  }

  async traverseSearch(searchParam) {
    await this.start('search', searchParam, {
      rejectPattern: (text) =>
        !pattern.acceptedWords.test(text) ||
        pattern.rejectedWords.test(text) ||
        acceptedDomains.every((domain) => text.indexOf(domain) === -1),
    });
  }

  async start(api, searchParam, { rejectPattern, isFinish }) {
    let maxId = 0;
    logger.debug('~~~ START TWEET CRAWLING ~~~');
    while (1) {
      try {
        const searchOption = Object.assign(searchParam, {
          max_id: maxId,
        });
        if (!searchParam.max_id) delete searchParam.max_id;

        const { statuses, search_metadata } = await this[api](searchOption);
        if (!statuses) return;

        const originalStatuses = statuses.filter(
          (tweet) => !tweet.retweeted_status,
        );
        logger.debug(originalStatuses.length);
        let updatedUserData = false;
        for (let tweet of originalStatuses) {
          tweet = expandUrlOfTweet(tweet);
          if (!updatedUserData) {
            await this.saveUser(tweet);
            updatedUserData = true;
          }
          const isDeniedPost = await this.findDenyPost(tweet);
          if (isDeniedPost) {
            logger.debug('REJECT becasue denied post:', tweet.id_str);
            continue;
          }
          const isDeniedUser = await this.findDenyUser(tweet);
          if (isDeniedUser) {
            logger.debug('REJECT becasue denied user:', tweet.user.id_str);
            continue;
          }
          if (rejectPattern && rejectPattern(tweet.full_text.toLowerCase())) {
            logger.debug('REJECT:', tweet.full_text.toLowerCase());
            continue;
          }
          await this.save(tweet);
        }
        const tailTweet = statuses[statuses.length - 1];
        if (!tailTweet) return;
        maxId = this.decStrNum(tailTweet.id_str);
        logger.debug(tailTweet.id_str);
        logger.debug(maxId);

        await sleep(SEARCH_INTERVAL);
        if (statuses.length <= 0) return;
        if (isFinish && isFinish(tailTweet)) return;
      } catch (e) {
        logger.debug(e);
        return;
      }
    }
    logger.debug('~~~ FINISH TWEET CRAWLING ~~~');
  }

  async search(option) {
    return await TweetClient.search(option)
  }

  async statuses(option = {}) {
    return await TweetClient.statuses(option)
  }

  async status(tweetId, option = {}) {
    return await TweetClient.status(tweetId, option)
  }

  async findDenyPost(tweet) {
    const denyPostProvider = ModelProviderFactory.create('denypost');
    const ex = await denyPostProvider.findOne({
      idStr: tweet.id_str 
    });
    return !!ex;
  }

  async findDenyUser(tweet) {
    const denyUserProvider = ModelProviderFactory.create('denyuser');
    const ex = await denyUserProvider.findOne({
      idStr: tweet.user.id_str
    });
    return !!ex;
  }

  async save(tweet) {
    const dbUser = await this.saveUser(tweet);
    const post = await this.savePost(tweet, dbUser);
    await addQuoteStatus(post);
    await addReplyStatus(post);
    await addInReply(post, tweet);
  }

  async saveUser(tweet) {
    const userProvider = ModelProviderFactory.create('user');
    const user = {
      query: { idStr: tweet.user.id_str },
      data: mapper.user(tweet.user),
      options: { new: true, upsert: true },
    };
    const dbUser = await userProvider.findOneAndUpdate(
      user.query,
      user.data,
      user.options,
    );
    return dbUser;
  }

  async savePost(tweet, dbUser) {
    const postProvider = ModelProviderFactory.create('post');
    // const replied = await this.fetchReplied(tweet.id_str);
    const post = {
      query: { idStr: tweet.id_str },
      data: mapper.post(tweet, dbUser._id),
      options: { new: true, upsert: true },
    };
    const dbPost = await postProvider.findOneAndUpdate(
      post.query,
      post.data,
      post.options,
    );
    return dbPost;
  }

  async fetchReplied(tweetId) {
    return await TweetClient.fetchReplied(tweetId)
  }

  decStrNum(n) {
    var i, result;
    n = n.toString();
    result = n;
    i = n.length - 1;
    while (i > -1) {
      if (n[i] === '0') {
        result = result.substring(0, i) + '9' + result.substring(i + 1);
        i--;
      } else {
        result =
          result.substring(0, i) +
          (parseInt(n[i], 10) - 1).toString() +
          result.substring(i + 1);
        return result;
      }
    }
    return result;
  }
};
