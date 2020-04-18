<template>
  <section class="history infinite-list">
    <div class="padding">
      <div class="title">検索ワード</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="直近" name="first">
          <div class="words">
            <span
              v-for="item in relatedHistory"
              :key="item._id"
              @click="selectSearchWord(item.word)"
            >
              <span class="word">{{ item.word }}</span>
              <span class="postCount">{{ item.postCount }}</span>
            </span>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="日" name="second">
          <div class="words">
            <span v-for="item in todayHistory" :key="item._id" @click="selectSearchWord(item.word)">
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
              @click="selectSearchWord(item.word)"
            >
              <span class="word">{{ item.word }}</span>
              <span class="postCount">{{ item.postCount }}</span>
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="月" name="fourth">
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
        </el-tab-pane> -->
        <el-tab-pane label="上位" name="five">
          <div class="words">
            <span v-for="item in mostHistory" :key="item._id" @click="selectSearchWord(item.word)">
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
    font-size: 14px;
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
    font-size: 14px;
    width: 100%;
    & + span {
      margin-top: 0.5rem;
    }
    .word {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .postCount {
    }

    &:hover {
      background: white;
      border: 1px solid #eee;
    }
    // & + span {
    //   margin-top: 0.25rem;
    // }
  }
}
</style>
<script>
// import dayjs from "dayjs";
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
  methods: {
    async pourHistory() {
      this.relatedHistory = await this.aggregate({ sort: { createdAt: -1 } });
      // this.todayHistory = await this.aggregate({
      //   from: dayjs()
      //     .add(-1, "days")
      //     .format("YYYY-MM-DD"),
      //   to: dayjs().format("YYYY-MM-DD")
      // });
      // this.weeklyHistory = await this.aggregate({
      //   from: dayjs()
      //     .add(-7, "days")
      //     .format("YYYY-MM-DD"),
      //   to: dayjs().format("YYYY-MM-DD")
      // });
      // this.monthlyHistory = await this.aggregate({
      //   from: dayjs()
      //     .add(-30, "days")
      //     .format("YYYY-MM-DD"),
      //   to: dayjs().format("YYYY-MM-DD")
      // });
      this.mostHistory = await this.aggregate({});
    },
    async aggregate(param) {
      const { data } = await history.aggregate("search", param);
      return data;
    },
    handleClick() {},
    selectSearchWord(text) {
      this.$emit("selectSearchWord", text);
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
      }, 15 * 1000);
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
