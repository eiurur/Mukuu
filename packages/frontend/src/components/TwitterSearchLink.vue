<template>
  <div class="twitter-search-word">
    <div class="center">
      <p>サイト内で見つかりませんでした。</p>
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
.twitter-search-word {
  height: 100%;
  i + span {
    margin-left: 0.5rem;
  }
}
</style>

<script>
export default {
  name: "TwitterSearchLink",
  props: ["searchWord"],
  computed: {
    twitterSearchText: {
      get() {
        return encodeURIComponent(
          `${this.searchWord} ux.getuploader.com OR drive.google.com #COM3D2 OR #CM3D2 OR #カスタムメイド3D2 OR #カスタムオーダーメイド3D2`
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
