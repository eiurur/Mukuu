const dayjs = require('dayjs');

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

module.exports = mapper