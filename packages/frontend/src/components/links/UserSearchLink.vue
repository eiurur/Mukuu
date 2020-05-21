<template>
  <a class="user-search-word" :href="this.twitterSearchLink" target="_blank">
    <i class="el-icon-link"></i>
    <span>Twitterで検索する</span>
  </a>
</template>

<style lang="scss" scoped>
.user-search-word {
  display: block;
  text-align: center;
  transition: background 0.3s;
  border-radius: 1rem;
  padding: 0 1rem;
  &:hover {
    background: #edf4fb;
  }

  i + span,
  span + i {
    margin-left: 0.5rem;
  }
}
</style>

<script>
import { acceptedDomains } from "@mukuu/common/lib/constants";

const domains = acceptedDomains.join(" OR ");

export default {
  name: "UserSearchLink",
  props: ["user"],
  computed: {
    twitterSearchText: {
      get() {
        return encodeURIComponent(`from:${this.user.screenName} ${domains}`);
      }
    },
    twitterSearchLink: {
      get() {
        return `https://twitter.com/search?q=${this.twitterSearchText}&f=live`;
      }
    }
  }
};
</script>
