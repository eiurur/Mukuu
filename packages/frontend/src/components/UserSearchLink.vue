<template>
  <div class="user-search-word">
    <div class="center">
      <p>
        <a :href="this.twitterSearchLink" target="_blank">
          <i class="el-icon-link"></i>
          <span>Twitterで検索する</span>
        </a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-search-word {
  i + span {
    margin-left: 0.5rem;
  }
}
</style>

<script>
export default {
  name: "UserSearchLink",
  props: ["word"],
  computed: {
    twitterSearchText: {
      get() {
        return encodeURIComponent(
          `from:${this.word} ux.getuploader.com OR drive.google.com`
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
