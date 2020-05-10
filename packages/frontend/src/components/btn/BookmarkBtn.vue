<template>
  <div class="bookmark">
    <span class="item add" v-if="!this.bookmark" @click="addBookmark">
      <span title="ブックマーク">
        <i class="el-icon-collection-tag"></i>
      </span>
    </span>
    <span class="item remove" v-if="this.bookmark" @click="removeBookmark">
      <span title="ブックマーク解除">
        <i class="el-icon-collection-tag"></i>
      </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.bookmark {
  .item {
    cursor: pointer;
    display: block;
    border-radius: 4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: 1px solid #bbb;
    color: #bbb;
    border-radius: 4rem;
    line-height: 1.7;
    &.remove {
      background: #1c84e8;
      border: 1px solid #1c84e8;
      color: white;
    }
    & > span {
      padding: 0rem 1rem;
    }
  }
}
</style>

<script>
export default {
  name: "BookmarkBtn",
  props: ["post"],
  computed: {
    bookmark: {
      get() {
        const id = this.post.idStr;
        const bookmark = this.$store.getters["bookmark/find"](id);
        return !!bookmark;
      }
    }
  },
  methods: {
    addBookmark() {
      this.$store.dispatch("bookmark/addBookmark", this.post);
      this.$store.dispatch("saveLocalStorage");
    },
    removeBookmark() {
      this.$store.dispatch("bookmark/removeBookmark", this.post);
      this.$store.dispatch("saveLocalStorage");
    }
  }
};
</script>
