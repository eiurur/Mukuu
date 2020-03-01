<template>
  <div>
    <a class="item" v-if="!this.bookmark" @click="addBookmark">
      <el-tooltip placement="top" effect="light">
        <div slot="content">ブックマーク</div>
        <span>
          <i class="el-icon-star-off"></i>
          ブックマーク
        </span>
      </el-tooltip>
    </a>
    <a class="item" v-if="this.bookmark" @click="removeBookmark">
      <el-tooltip placement="top" effect="light">
        <div slot="content">ブックマーク解除</div>
        <span>
          <i class="el-icon-star-on"></i>
          ブックマーク解除
        </span>
      </el-tooltip>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: block;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 4rem;
  padding: 0rem 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<script>
export default {
  name: "BookmarkBtn",
  props: ["post"],
  computed: {
    bookmark: {
      get() {
        const bookmark = this.$store.getters["bookmark/find"](this.post);
        return !!bookmark;
      }
    }
  },
  methods: {
    addBookmark() {
      this.$store.dispatch("drawer/addBookmark", this.post);
    },
    removeBookmark() {
      this.$store.dispatch("drawer/removeBookmak", this.post);
    }
  }
};
</script>
