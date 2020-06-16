<template>
  <div class="words">
    <span
      v-for="item in history"
      :key="item._id"
      :title="item.word"
      @click="selectSearchWord(item)"
    >
      <span class="oneline-text">{{ item.word }}</span>
      <span class="post-count">{{ item.postCount }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.words > span {
  justify-content: space-between;
  display: flex;
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  border: 1px solid #d5d8db;
  background: #eee;
  color: #606266;
  cursor: pointer;
  word-break: break-word;
  transition: all 0.3s ease;
  font-size: 0.77rem; // 14px(this font-size) / 18px(root font-size)
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  & + span {
    margin-top: 0.5rem;
  }
  &:hover {
    background: white;
    border: 1px solid #eee;
  }
}
.post-count {
  margin-left: 0.5rem;
}
</style>
<script>
export default {
  name: "SearchHisotry",
  props: ["history", "shouldUpdate", "passSearchWord"],
  methods: {
    selectSearchWord({ word, postCount }) {
      this.passSearchWord(word);
      if (this.shouldUpdate) {
        this.$store.dispatch("searchHistory/addSearchWord", {
          word,
          postCount
        });
        this.$store.dispatch("saveLocalStorage");
      }
    }
  }
};
</script>
