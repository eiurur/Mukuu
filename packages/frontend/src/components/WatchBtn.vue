<template>
  <div class="btn">
    <a class="item" v-if="!this.watch" @click="addWatch">
      <el-tooltip placement="top" effect="light">
        <div slot="content">ウォッチリストに登録する</div>
        <span>
          <i class="el-icon-star-off"></i>
          ウォッチ
        </span>
      </el-tooltip>
    </a>
    <a class="item" v-if="this.watch" @click="removeWatch">
      <el-tooltip placement="top" effect="light">
        <div slot="content">ウォッチリストから解除する</div>
        <span>
          <i class="el-icon-star-on"></i>
          ウォッチ解除
        </span>
      </el-tooltip>
    </a>
  </div>
</template>

<style lang="scss" scoped>
div.btn {
  position: absolute;
  top: calc(240px + 10px);
  right: 1rem;
  font-size: 1rem;
  & > .item {
    display: block;
    background: white;
    color: #bbb;
    border-radius: 4rem;
    padding: 0rem 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: #bbb 1px solid;
  }
}
</style>

<script>
export default {
  name: "WatchBtn",
  props: ["user"],
  computed: {
    watch: {
      get() {
        const id = this.user.idStr;
        const watch = this.$store.getters["watch/find"](id);
        return !!watch;
      }
    }
  },
  methods: {
    addWatch() {
      this.$store.dispatch("watch/addWatch", this.user);
      this.$store.dispatch("saveLocalStorage");
    },
    removeWatch() {
      this.$store.dispatch("watch/removeWatch", this.user);
      this.$store.dispatch("saveLocalStorage");
    }
  }
};
</script>
