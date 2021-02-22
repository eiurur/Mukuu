<template>
  <section class="container" ref="scrollable">
    <TwitterSearchLink :searchWord="searchOption.searchWord" v-if="isEmpty" class="wrap">>
    <template v-slot:caption>
      <p>サイト内で見つかりませんでした。</p>
    </template>
    </TwitterSearchLink>
    <Post
      :post="post"
      :useDrawer="true"
      :useSticky="useSticky"
      mediaType="flex"
      :key="post._id"
      v-for="post in posts"
    ></Post>
    <TwitterSearchLink :searchWord="searchOption.searchWord" v-if="isLoadedLast" class="tail"></TwitterSearchLink>
    <Loader :shouldShowLoader="shouldShowLoader"></Loader>
    <div class="pagination-container">
      <el-pagination
        v-show="!shouldShowLoader"
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="true"
        :current-page="currentPage"
        :page-size="20"
        :pager-count="pagerCount"
        :total="total">
      </el-pagination>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section + section {
  margin-top: 0.5rem;
}
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100%;
}
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: .5rem;
}
</style>

<script>
import Loader from "@/components/Loader.vue";
import Post from "@/components/Post.vue";
import TwitterSearchLink from "@/components/links/TwitterSearchLink.vue";

import { addDividingFlag, expandRecusively } from "@/plugins/post";
import { debounce } from "@/plugins/util";
import post from "@/api/post";

export default {
  name: "PaginatePostList",
  props: {
    searchOption: Object,
    passPagination: Function,
    limit: Number,
    preSkip: Number
  },
  data() {
    return {
      skip: 0,
      total: 0,
      currentPage: 1,
      posts: [],
      isLoading: false,
      isEmpty: false,
      isCompletedLoading: false,
      canWatchSearchOption: false,
      registerTimerID: null
    };
  },
  components: {
    Loader,
    Post,
    TwitterSearchLink
  },
  computed: {
    shouldShowLoader() {
      return !this.isCompletedLoading && this.isLoading;
    },
    isLoadedLast() {
      return !this.shouldShowLoader && this.total !== 0 && this.total === this.current;
    },
    current() {
      return Math.min(this.skip, this.total);
    },
    useSticky() {
      return true;
      //      return !this.searchOption.searchWord;
    },
    shouldHideReply() {
      return !this.$store.getters["config/shouldHideReply"];
    },
    column() {
      const ret = { column: {} };
      if (!this.shouldHideReply) ret.column.isReply = false;
      if (!Object.keys(ret.column).length) return {};
      return ret;
    },
    shouldUsePagination() {
      return this.$store.getters["config/shouldUsePagination"];
    },
    pagerCount() {
      if (this.$mq === "sm") return 3;
      if (this.$mq === "md") return 5;
      return 7;
    }
  },
  watch: {
    shouldHideReply() {
      if (this.canWatchSearchOption) {
        this.search({});
      }
    },
    searchOption: {
      handler() {
        if (this.canWatchSearchOption) {
          this.search({});
        }
      },
      deep: true
    }
  },
  mounted() {
    this.search({ skip: this.preSkip });
  },
  created() {
    this.search = debounce(async ({ skip }) => {
      this.isCompletedLoading = false;
      this.isEmpty = false;
      this.skip = skip || 0;
      this.posts = [];
      await Promise.all([this.fetchCount(), this.load({ skip: this.skip })]);
      this.currentPage = Math.max(1, Math.ceil(this.skip / this.limit)); // NOTE: totalがセットされていないと代入してもViewに反映されない
    }, 150).bind(this);
  },
  methods: {
    storeSearchOptionToQueryString() {
      this.$router.push({
        query: {
          searchWord: this.searchOption.searchWord || "",
          to: !this.searchOption.to ? "" : this.$dayjs(this.searchOption.to).format("YYYY-MM-DD"),
          sort: this.searchOption.sort || "createdAtDesc",
          skip: this.skip
        }
      });
    },
    async fetchCount() {
      const { count } = await post.fetchCount({
        ...this.column,
        ...this.searchOption
      });
      this.total = count;
      this.passPagination({ current: this.current, total: this.total });
    },
    async load({ skip }) {
      this.isLoading = true;
      const { data, url } = await post.fetch({
        ...{ limit: this.limit, skip },
        ...this.column,
        ...this.searchOption,
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
      const expandedPosts = data.map(p => expandRecusively(p));
      expandedPosts.map((p, i) => addDividingFlag({
        current: expandedPosts[i],
        pre: i > 0 ? expandedPosts[i - 1] : null,
        tail: this.posts.length > 0 ? this.posts[this.posts.length - 1] : null,
        sort: this.searchOption.sort
      }));
      this.posts = expandedPosts;
      this.skip = skip;
      this.storeSearchOptionToQueryString();
      this.skip = skip + this.limit;
      this.isLoading = false;
      this.$ga.page({
        location: url
      });
      this.passPagination({ current: this.current, total: this.total });
    },
    changeCurrentNumber(skip) {
      this.search({ skip });
    },
    handleSizeChange(number) {
      this.posts = [];
      this.currentPage = number;
      this.load({ skip: (number - 1) * this.limit });
      this.scrollToTop();
    },
    handleCurrentChange(number) {
      this.posts = [];
      this.currentPage = number;
      this.load({ skip: (number - 1) * this.limit });
      this.scrollToTop();
    },
    scrollToTop() {
      this.$refs.scrollable.scrollTop = 0;
    }
  }
};
</script>
