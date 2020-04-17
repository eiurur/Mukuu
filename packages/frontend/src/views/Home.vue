<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <div>
        <el-form ref="form" :model="searchOption">
          <el-form-item>
            <el-input
              placeholder="検索"
              prefix-icon="el-icon-search"
              :clearable="true"
              @blur="registerHistory"
              v-model="searchOption.searchWord"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchOption.sort" placeholder="please select sort type">
              <template slot="prefix">
                <i class="el-icon-sort prefix-icon"></i>
              </template>
              <el-option label="投稿日時が新しい順" value="createdAtDesc"></el-option>
              <el-option label="投稿日時が古い順" value="createdAtAsc"></el-option>
              <el-option label="リツイートが多い順" value="retweetCountDesc"></el-option>
              <el-option label="お気に入りが多い順" value="favoriteCountDesc"></el-option>
              <el-option label="人気順" value="totalCountDesc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="日付"
              v-model="searchOption.to"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <el-form :inline="true" @submit.native.prevent size="mini" class="between">
          <el-form-item>
            <el-button type="danger" icon="el-icon-refresh" @click="clear">クリア</el-button>
          </el-form-item>
          <el-form-item>
            <Counter
              :current="current"
              :total="total"
              @changeCurrentNumber="changeCurrentNumber"
            ></Counter>
          </el-form-item>
        </el-form>
      </div>
      <SearchHistory @selectSearchWord="selectSearchWord"></SearchHistory>
      <SponsWide></SponsWide>
    </el-col>
    <el-col :span="12">
      <section class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="canLoad">
        <TwitterSearchLink :searchWord="searchOption.searchWord" v-if="isEmpty"></TwitterSearchLink>
        <Post :post="post" :useDrawer="true" :key="post._id" v-for="post in posts"></Post>
        <Loader :shouldShowLoader="shouldShowLoader"></Loader>
      </section>
    </el-col>
    <el-col :span="8">
      <UserDrawer></UserDrawer>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
section + section {
  margin-top: 1rem;
}
</style>

<script>
import dayjs from "dayjs";
import Counter from "@/components/Counter.vue";
import Loader from "@/components/Loader.vue";
import Post from "@/components/Post.vue";
import SearchHistory from "@/components/SearchHistory.vue";
import SponsWide from "@/components/SponsWide.vue";
import UserDrawer from "@/components/UserDrawer.vue";
import TwitterSearchLink from "@/components/TwitterSearchLink.vue";
import { debounce } from "../plugins/util";
import post from "../api/post";
import history from "../api/history";

export default {
  name: "home",
  data() {
    return {
      skip: 0,
      limit: 5,
      total: 0,
      posts: [],
      isLoading: false,
      isEmpty: false,
      isCompletedLoading: false,
      canWatchSearchOption: false,
      searchOption: {
        searchWord: "",
        sort: "createdAtDesc",
        // from: "",
        to: ""
      },
      registerTimerID: null
    };
  },
  components: {
    Counter,
    Loader,
    Post,
    SearchHistory,
    SponsWide,
    TwitterSearchLink,
    UserDrawer
  },
  computed: {
    canLoad() {
      return this.isCompletedLoading || this.isLoading;
    },
    shouldShowLoader() {
      return !this.isCompletedLoading && this.isLoading;
    },
    current() {
      return Math.min(this.skip, this.total);
    }
  },
  watch: {
    searchOption: {
      handler() {
        if (this.canWatchSearchOption) {
          this.search({});
        }
      },
      deep: true
    }
  },
  created() {
    this.search = ({ skip }) => {
      this.isCompletedLoading = false;
      this.isEmpty = false;
      this.skip = skip || 0;
      this.posts = [];
      this.fetchCount();
      this.load();
    };
  },
  mounted() {
    this.restoreSearchOptionFromQueryString();
    this.fetchCount();
  },
  methods: {
    registerHistory: debounce(e => {
      if (!e.target.value) return;
      history.register("search", { word: e.target.value });
    }, 1000),
    clear() {
      this.searchOption = {
        searchWord: "",
        sort: "createdAtDesc",
        to: ""
      };
      this.skip = 0;
    },
    restoreSearchOptionFromQueryString() {
      const { searchWord, to, sort, skip } = this.$route.query;
      this.searchOption = {
        searchWord: searchWord || "",
        to: !to ? "" : dayjs(to).format("YYYY-MM-DD"),
        sort: sort || "createdAtDesc"
      };
      this.skip = skip ? Number(skip) : 0;
    },
    storeSearchOptionToQueryString() {
      this.$router.push({
        query: {
          searchWord: this.searchOption.searchWord || "",
          to: !this.searchOption.to ? "" : dayjs(this.searchOption.to).format("YYYY-MM-DD"),
          sort: this.searchOption.sort || "createdAtDesc",
          skip: this.skip
        }
      });
    },
    selectSearchWord(searchWord) {
      this.searchOption.searchWord = searchWord;
    },
    changeCurrentNumber(skip) {
      this.search({ skip });
    },
    async fetchCount() {
      const { count } = await post.fetchCount({ ...this.searchOption });
      this.total = count;
    },
    async load() {
      this.isLoading = true;
      const { data, url } = await post.fetch({
        ...{ limit: this.limit, skip: this.skip },
        ...this.searchOption
      });
      this.canWatchSearchOption = true;
      if (data.length < 1) {
        if (this.posts.length < 1) {
          this.isEmpty = true;
        }
        this.isLoading = false;
        this.isCompletedLoading = true;
        return;
      }
      const expandedPosts = data.map((p, i) => {
        const ret = p;
        if (p.entities) ret.entities = JSON.parse(p.entities);
        this.addDividingFlag(i, data);
        return ret;
      });
      this.posts = [...this.posts, ...expandedPosts];
      this.storeSearchOptionToQueryString();
      this.skip += this.limit;
      this.isLoading = false;
      this.$ga.page({
        location: url
      });
    },
    addDividingFlag(index, posts) {
      if (!["createdAtAsc", "createdAtDesc"].includes(this.searchOption.sort)) {
        return;
      }
      const current = posts[index];
      if (index === 0) {
        if (this.posts.length === 0) {
          current.shouldShowDivider = true;
          return;
        }
        const preInAll = this.posts[this.posts.length - 1];
        if (preInAll.createdAt !== current.createdAt) {
          current.shouldShowDivider = true;
          return;
        }
        return;
      }
      const pre = posts[index - 1];
      if (pre.createdAt !== current.createdAt) {
        current.shouldShowDivider = true;
      }
    },
    openUserDrawer(postedBy) {
      if (!postedBy) return;
      const payload = { ...postedBy };
      this.$store.dispatch("drawer/initialize", payload);
      this.$store.dispatch("saveLocalStorage");
    }
  }
};
</script>
