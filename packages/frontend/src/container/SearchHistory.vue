<template>
  <section class="history infinite-list">
    <div class="padding">
      <div class="title">検索ワード</div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="直近" name="first">
          <div class="words">
            <span
              v-for="item in relatedHistory"
              :key="item._id"
              @click="selectSearchWord(item)"
              :title="item.word"
            >
              <span class="word">{{ item.word }}</span>
              <span class="postCount">{{ item.postCount }}</span>
            </span>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="日" name="second">
          <div class="words">
            <span
              v-for="item in todayHistory"
              :key="item._id"
              @click="selectSearchWord(item)"
              :title="item.word"
            >
              <span class="word">{{ item.word }}</span>
              <span class="postCount">{{ item.postCount }}</span>
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="週" name="third">
          <div class="words">
            <span
              v-for="item in weeklyHistory"
              :key="item._id"
              @click="selectSearchWord(item)"
              :title="item.word"
            >
              <span class="word">{{ item.word }}</span>
              <span class="postCount">{{ item.postCount }}</span>
            </span>
          </div>
        </el-tab-pane>-->
        <!-- <el-tab-pane label="月" name="fourth">
          <div class="words">
            <span
              v-for="item in monthlyHistory"
              :key="item._id"
              @click="selectSearchWord(item.word)"
            >
              <span class="word">{{ item.word }}</span>
              <span class="postCount">{{ item.postCount }}</span>
            </span>
          </div>
        </el-tab-pane>-->
        <el-tab-pane label="累計" name="five">
          <div class="words">
            <span
              v-for="item in mostHistory"
              :key="item._id"
              @click="selectSearchWord(item)"
              :title="item.word"
            >
              <span class="word">{{ item.word }}</span>
              <span class="postCount">{{ item.postCount }}</span>
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="履歴" name="six">
          <div class="words">
            <span
              v-for="item in selfHistory"
              :key="item._id"
              @click="selectSearchWord(item, false)"
              :title="item.word"
            >
              <span class="word">{{ item.word }}</span>
              <span class="postCount">{{ item.postCount }}</span>
            </span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.history {
  margin-left: 0.5rem;
  .title {
    font-size: 0.77rem; // 14px(this font-size) / 18px(root font-size)
    color: #606266;
    line-height: 40px;
  }
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
    .word {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &:hover {
      background: white;
      border: 1px solid #eee;
    }
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
      activeName: "first",
      timerID: null,
      relatedHistory: [],
      todayHistory: [],
      weeklyHistory: [],
      monthlyHistory: [],
      mostHistory: []
    };
  },
  computed: {
    selfHistory() {
      return this.$store.getters["searchHistory/searchWords"];
    }
  },
  methods: {
    async pourHistory() {
      // const today = this.$dayjs().valueOf();
      // const yesterday = this.$dayjs()
      //   .add(-1, "days")
      //   .valueOf();
      // const lastWeek = this.$dayjs()
      //   .add(-7, "days")
      //   .valueOf();
      // const lastMonth = this.$dayjs()
      //   .add(-30, "days")
      //   .valueOf();
      this.relatedHistory = await this.aggregate({ sort: { createdAt: -1 } });
      // this.todayHistory = await this.aggregate({
      //   from: yesterday,
      //   to: today
      // });
      // this.weeklyHistory = await this.aggregate({
      //   from: lastWeek,
      //   to: today
      // });
      // this.monthlyHistory = await this.aggregate({
      //   from: lastMonth,
      //   to: today
      // });
      this.mostHistory = await this.aggregate({});
    },
    async aggregate(param) {
      const { data } = await history.aggregate("search", param);
      return data;
    },
    selectSearchWord({ word, postCount }, updating = true) {
      this.$emit("selectSearchWord", word);
      if (updating) {
        this.$store.dispatch("searchHistory/addSearchWord", {
          word,
          postCount
        });
        this.$store.dispatch("saveLocalStorage");
      }
    },
    handlePolling() {
      if (document.visibilityState === "visible") {
        this.pourHistory();
        this.startPolling();
      } else {
        this.stopPolling();
      }
    },
    startPolling() {
      this.timerID = setInterval(async () => {
        await this.pourHistory();
      }, 3 * 60 * 1000);
    },
    stopPolling() {
      clearInterval(this.timerID);
    }
  },
  async mounted() {
    await this.pourHistory();
    this.startPolling();
  },
  created() {
    document.addEventListener("visibilitychange", this.handlePolling);
  },
  beforeDestroy() {
    window.removeEventListener("visibilitychange", this.handlePolling);
    this.stopPolling();
  }
};
</script>
