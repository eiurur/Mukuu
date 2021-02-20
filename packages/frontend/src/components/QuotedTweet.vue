<template>
  <Quote
    mediaType="grid"
    :useDrawer="true"
    :isQuoted="true"
    :post="quotedStatus"></Quote>
</template>

<style lang="scss" scoped>

</style>
<script>
import Quote from "@/components/Quote.vue";
import { expandRecusively } from "@/plugins/post";

export default {
  name: "QuotedTweet",
  components: {
    Quote,
  },
  props: ["post"],
  computed: {
    postedBy() {
      const tweet = JSON.parse(this.post.quoted);
      const { user } = tweet;
      if (!user) return {};
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
        createdAt: this.$dayjs(user.created_at.replace('+0000', '')).valueOf(),
        updatedAt: Date.now(),
      };
    },
    quotedStatus() {
      const tweet = JSON.parse(this.post.quoted);
      if (!tweet) return {};
      const post = {
        idStr: tweet.id_str,
        text: tweet.full_text,
        entities: JSON.stringify(tweet.extended_entities || tweet.entities),
        favoriteCount: tweet.favorite_count,
        retweetCount: tweet.retweet_count,
        totalCount: tweet.favorite_count + tweet.retweet_count,
        postedBy: this.postedBy,
        createdAt: this.$dayjs(tweet.created_at.replace('+0000', '')).valueOf(),
        updatedAt: Date.now(),
      };
      return expandRecusively(post);
    }
  }
};
</script>
