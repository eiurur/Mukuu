<template>
  <el-dialog title :visible.sync="isOpen">
    <div class="config scrollable">
      <section>
        <h1>設定一覧</h1>
        <section>
          <div>
            <span class="caution">
              <i class="el-icon-warning-outline" />
              <span>設定を変更した瞬間、再検索が走ります。</span>
            </span>
          </div>
        </section>
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
        </section>
        <section>
          <el-divider content-position="left">
            <span class="title">
              <i class="el-icon-tickets" />
              <span>読み込み関係</span>
            </span>
          </el-divider>
          <div>
            <el-checkbox :value="shouldUsePagination" @change="changePagination">ページングをページネーション方式にする</el-checkbox>
            <div class="note">※ Home画面のみ対象</div>
          </div>
        </section>
        <section>
          <el-divider content-position="left">
            <span class="title">
              <i class="el-icon-document" />
              <span>設定情報の入出力</span>
            </span>
          </el-divider>
          <div>
            <el-button icon="el-icon-download" type="primary" round @click="exportJson" size="mini">
              ファイルにエクスポートする
            </el-button>
            <el-button icon="el-icon-upload2" @click="checkFile" round  size="mini">
              ファイルからインポートする
            </el-button>
            <input type="file" id="fileinput" style="display: none;" @change="importJson" accept="application/json">
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
  .note {
    font-size: .75rem;
    color: #bbb;
    margin-left: 1.5rem;
    margin-bottom: 12px; // element-uiのcheckboxのmargin-bottom(8px)に合わせる
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
    },
    shouldUsePagination() {
      return this.$store.getters["config/shouldUsePagination"];
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
    },
    changePagination() {
      this.$store.dispatch("config/updatePaginationStatus");
      this.$store.dispatch("saveLocalStorage");
    },
    loadContent() {
      const store = localStorage.getItem("store");
      if (store) {
        const ret = JSON.parse(store);
        ret.add = { works: [] }; // works keyがないとロード直後にReferenceErrorになる
        return JSON.stringify(ret);
      }
      return "";
    },
    exportJson() {
      try {
        const now = this.$dayjs().format("YYYYMMDD_HHmmss");
        const fileName = `mukuu_${now}.json`;
        const contentType = 'text/plain';
        const content = this.loadContent();

        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        this.$message.success("設定情報をダウンロードしました");
      } catch (err) {
        this.$message.error(`設定情報のダウンロードに失敗しました：${err}`);
      }
    },
    checkFile() {
      document.querySelector('#fileinput').click();
    },
    importJson() {
      const file = document.querySelector('#fileinput').files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        try {
          const state = JSON.parse(e.target.result);
          if (!state.bookmark || !state.config || !state.drawer || !state.watch || !state.modal || !state.searchHistory) {
            throw new Error("不正なJSONファイルです");
          }
          this.$store.dispatch("restoreLocalStorage", state);
          this.$message.success("設定情報をインポートしました");
        } catch (err) {
          this.$message.error(`設定情報のインポートに失敗しました：${err}`);
        }
      };
    }
  }
};
</script>
