<template>
  <section class="history infinite-list">
    <div class="padding margin">
      <div class="title">検索ワード</div>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name">
          <SearchWords
            :history="tab.history"
            :shouldUpdate="tab.shouldUpdate"
            :passSearchWord="passSearchWord"
          ></SearchWords>
        </el-tab-pane>
        <el-tab-pane label="履歴" name="self">
          <SearchWords
            :history="selfHistory"
            :shouldUpdate="false"
            :passSearchWord="passSearchWord"
          ></SearchWords>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.history {
  margin-left: 0.5rem;
  .margin {
    margin-bottom: .5rem;
  }
  .title {
    font-size: 0.75rem; // 14px(this font-size) / 18px(root font-size)
    color: #606266;
    line-height: 32px;
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
import SearchWords from "@/components/SearchWords.vue";

import history from "../api/history";

export default {
  name: "SearchHisotry",
  props: ["word", "passSearchWord"],
  components: { SearchWords },
  data() {
    const today = this.$dayjs().valueOf();
    const yesterday = this.$dayjs()
      .add(-1, "days")
      .valueOf();
    const lastWeek = this.$dayjs()
      .add(-7, "days")
      .valueOf();
    // const lastMonth = this.$dayjs()
    //   .add(-30, "days")
    //   .valueOf();
    return {
      activeName: "first",
      timerID: null,
      tabs: [
        {
          name: "first",
          label: "直近",
          args: {
            from: yesterday,
            sort: { createdAtLatest: -1 }
          },
          history: [],
          shouldUpdate: true
        },
        {
          name: "second",
          label: "日",
          cacheKey: "day",
          args: {
            from: yesterday,
            to: today
          },
          history: [],
          shouldUpdate: true
        },
        {
          name: "third",
          label: "週",
          cacheKey: "week",
          args: {
            from: lastWeek,
            to: today
          },
          history: [],
          shouldUpdate: true
        },
        // {
        //   name: "fourth",
        //   label: "月",
        //   cacheKey: "month",
        //   args: {
        //     from: lastMonth,
        //     to: today
        //   },
        //   history: [],
        //   shouldUpdate: true
        // },
        {
          name: "five",
          label: "累計",
          cacheKey: "total",
          args: {},
          history: [],
          shouldUpdate: true
        }
      ]
    };
  },
  computed: {
    selfHistory() {
      return this.$store.getters["searchHistory/searchWords"];
    }
  },
  methods: {
    async pourHistory() {
      this.tabs.map(async tab => {
        if (tab.cacheKey) {
          tab.history = await this.aggregate({ cacheKey: tab.cacheKey });
        } else if (tab.args) {
          tab.history = await this.aggregate(tab.args);
        }
      });
    },
    async aggregate(param) {
      const { data } = await history.aggregate("search", param);
      return data;
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
      }, 6 * 60 * 1000);
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
