<template>
  <el-dialog title :visible.sync="isOpen">
    <div class="config scrollable">
      <section>
        <h1>設定一覧</h1>
        <section>
          <el-divider content-position="left">
            <span class="title">
              <i class="el-icon-view" />
              <span>表示関係</span>
            </span>
          </el-divider>
          <div>
            <el-checkbox :value="shouldHideReply" @change="changeReply">リプライツイートを表示しない</el-checkbox>
          </div>
          <div>
            <el-checkbox :value="shouldHideNoImage" @change="changeImage" disabled>画像がないツイートを表示しない</el-checkbox>
          </div>
          <div>
            <span class="caution">
              <i class="el-icon-warning-outline" />
              <span>設定を変更した瞬間、再検索が走ります。</span>
            </span>
          </div>
        </section>
      </section>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.config {
  & section {
    padding-bottom: 1rem;
    p > span + span {
      margin-left: .5rem;;
    }
    i + span {
      margin-left: .5rem;
    }
    .title {
      font-size: 1rem;
    }
    .caution {
      font-size: .75rem;
      color: #F56C6C;
      opacity: .75;
    }
  }
}
</style>

<script>
export default {
  name: "Config",
  computed: {
    isOpen: {
      get() {
        return this.$store.getters["modal/getConfig"];
      },
      set() {
        this.$store.dispatch("modal/updateConfig");
      },
    },
    shouldHideReply() {
      return this.$store.getters["config/shouldHideReply"];
    },
    shouldHideNoImage() {
      return this.$store.getters["config/shouldHideNoImage"];
    }
  },
  methods: {
    changeReply() {
      this.$store.dispatch("config/updateHideReplyStatus");
      this.$store.dispatch("saveLocalStorage");
    },
    changeImage() {
      this.$store.dispatch("config/updateHideNoImage");
      this.$store.dispatch("saveLocalStorage");
    }
  }
};
</script>
