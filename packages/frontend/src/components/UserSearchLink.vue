<template>
  <div class="user-search-word">
    <div class="center">
      <a :href="this.twitterSearchLink" target="_blank">
        <i class="el-icon-link"></i>
        <span>Twitterで検索する</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-search-word {
  i + span,
  span + i {
    margin-left: 0.5rem;
  }
}
</style>

<script>
export default {
  name: "UserSearchLink",
  props: ["user"],
  computed: {
    twitterSearchText: {
      get() {
        return encodeURIComponent(
          `from:${this.user.screenName} ux.getuploader.com OR drive.google.com`
        );
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
