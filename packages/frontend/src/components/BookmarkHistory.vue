<template>
  <div class="items">
    <span class="row" v-for="item in history" :key="item._id">
      <span class="prefix" v-if="passClosen">
        <i class="el-icon-close" @click="close(item)"></i>
      </span>
      <span class="item" :title="item.word" @click="select(item)">
        <span class="oneline-text">{{ item.word }}</span>
        <span class="count">{{ item.count }}</span>
      </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.items {
  .row {
    display: flex;
    padding: 0.25rem 0;
    justify-content: space-between;
    align-items: center;
  }
  .prefix {
    display: flex;
    align-items: center;
    margin-right: 0.25rem;
    & > * {
      padding: 0.25rem;
      border-radius: 100%;
      cursor: pointer;
      color: #d5d8db;
      border: 1px solid #d5d8db;
      transition: all 0.3s ease;
    }
    :hover {
      color: #606266;
      background: white;
      border: 1px solid #eee;
    }
  }
  .item {
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
    .count {
      margin-left: 0.5rem;
    }
  }
}
</style>
<script>
export default {
  name: "BookmarkHistory",
  props: ["history", "shouldUpdate", "passSelection", "passClosen"],
  methods: {
    select(item) {
      this.passSelection(item);
    },
    close(item) {
      this.passClosen(item);
    }
  }
};
</script>
