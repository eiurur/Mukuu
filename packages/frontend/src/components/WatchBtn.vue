<template>
  <div class="btn">
    <a class="item add" v-if="!this.watch" @click="addWatch">
      <el-tooltip placement="top" effect="light">
        <div slot="content">ウォッチリストに登録する</div>
        <span>
          <i class="el-icon-view"></i>
          <span v-if="this.hasText">ウォッチ</span>
        </span>
      </el-tooltip>
    </a>
    <a class="item remove" v-if="this.watch" @click="removeWatch">
      <el-tooltip placement="top" effect="light">
        <div slot="content">ウォッチリストから削除する</div>
        <span>
          <i class="el-icon-view"></i>
          <span v-if="this.hasText">ウォッチ解除</span>
        </span>
      </el-tooltip>
    </a>
  </div>
</template>

<style lang="scss" scoped>
div.btn {
  font-size: 1rem;

  &.absolute {
    position: absolute;
  }
  i + span {
    padding-left: 0.25rem;
  }
  & > .item {
    display: block;
    background: white;
    border: #bbb 1px solid;
    color: #bbb;
    border-radius: 4rem;
    padding: 0rem 1rem;
    line-height: 1.7;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &.remove {
      background: #fe346e;
      border: #fe346e;
      color: white;
    }
  }
}
</style>

<script>
export default {
  name: "WatchBtn",
  props: ["user", "hasText"],
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
