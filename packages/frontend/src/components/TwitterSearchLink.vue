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
        const domains = "ux.getuploader.com OR drive.google.com";
        const HASH_TAGS =
          "#COM3D2 OR #CM3D2 OR #カスタムメイド3D2 OR #カスタムオーダーメイド3D2";
        const WORDS =
          "COM3D2 OR CM3D2 OR カスタムオーダーメイド3D2 OR カスタムメイド3D2 OR オダメ OR カスメ";
        return encodeURIComponent(
          `${this.searchWord} ${domains} ${HASH_TAGS} OR ${WORDS}`
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
