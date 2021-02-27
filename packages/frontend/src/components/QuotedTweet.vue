<template>
  <Quote
    mediaType="grid"
    :useDrawer="true"
    :isQuoted="true"
    :isGrid="isGrid"
    :post="quotedStatus"></Quote>
</template>

<style lang="scss" scoped>

</style>
<script>
import Quote from "@/components/Quote.vue";
import { expandRecusively } from "@/plugins/post";

const mapper = require('@mukuu/common/lib/mapper');

export default {
  name: "QuotedTweet",
  components: {
    Quote,
  },
  props: ["post", "isGrid"],
  computed: {
    postedBy() {
      const tweet = JSON.parse(this.post.quoted);
      const { user } = tweet;
      if (!user) return {};
      return mapper.user(user);
    },
    quotedStatus() {
      const tweet = JSON.parse(this.post.quoted);
      if (!tweet) return {};
      const post = mapper.post(tweet, this.postedBy);
      return expandRecusively(post);
    }
  }
};
</script>
