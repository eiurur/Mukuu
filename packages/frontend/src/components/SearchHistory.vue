<template>
  <section class="history infinite-list">
    <div class="padding">
      <div class="title">最近の検索ワード</div>
      <div class="words">
        <span v-for="item in relatedHistory" :key="item._id" @click="selectSearchWord(item.text)">{{
          item.text
        }}</span>
      </div>
      <el-divider></el-divider>
      <div class="title">よく検索されているワード</div>
      <div class="words">
        <span v-for="item in mostHistory" :key="item._id" @click="selectSearchWord(item.text)">{{
          item.text
        }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.history {
  margin-left: 1rem;
  .title {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
  }
  .words > span {
    display: inline-block;
    padding: 0.25rem 1rem;
    border-radius: 1rem;
    border: 1px solid #d5d8db;
    background: #eee;
    color: #606266;
    cursor: pointer;
    word-break: break-word;
    transition: all 0.3s ease;
    font-size: 14px;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &:hover {
      background: white;
      border: 1px solid #eee;
    }
    // & + span {
    //   margin-top: 0.25rem;
    // }
  }
}
</style>
<script>
import history from "../api/history";

export default {
  name: "SearchHisotry",
  props: ["word"],
  data() {
    return {
      timerID: null,
      relatedHistory: [],
      mostHistory: []
    };
  },
  methods: {
    async pourHistory() {
      this.relatedHistory = await this.fetch({ sort: "updatedAtDesc" });
      this.mostHistory = await this.fetch({ sort: "countDesc" });
    },
    async fetch(param) {
      const { data } = await history.fetch("search", param);
      return data;
    },
    selectSearchWord(text) {
      this.$emit("selectSearchWord", text);
    }
  },
  async mounted() {
    await this.pourHistory();
    this.timerID = setInterval(async () => {
      await this.pourHistory();
    }, 15 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timerID);
  }
};
</script>
