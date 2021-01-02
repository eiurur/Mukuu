<template>
  <section class="container" ref="scrollable" v-infinite-scroll="load" infinite-scroll-disabled="disbledLoad">
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
.twitter-search-word {
  display: flex;
  &.wrap {
    flex: 1;
  }
  &.tail {
    display: flex;
    padding: 0.25rem 1rem;
    border-radius: 1rem;
    border: 1px solid #d5d8db;
    background: #eee;
    cursor: pointer;
    word-break: break-word;
    transition: all 0.3s ease;
    font-size: 0.77rem; // 14px(this font-size) / 18px(root font-size)
    width: 100%;
    margin: 1rem 0;
    &:hover {
      background: white;
      border: 1px solid #eee;
    }
  }
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
  name: "InfinitePostList",
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
    disbledLoad() {
      return this.isCompletedLoading || this.isLoading;
    },
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
    this.isLoading = true;
    this.search({ skip: this.preSkip });
  },
  created() {
    this.search = debounce(({ skip }) => {
      this.isCompletedLoading = false;
      this.isEmpty = false;
      this.skip = skip || 0;
      this.posts = [];
      Promise.all([this.fetchCount(), this.load()]);
    }, 100).bind(this);
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
    async load() {
      this.isLoading = true;
      const { data, url } = await post.fetch({
        ...{ limit: this.limit, skip: this.skip },
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
      this.posts = [...this.posts, ...expandedPosts];
      this.storeSearchOptionToQueryString();
      this.skip += this.limit;
      this.isLoading = false;
      this.$ga.page({
        location: url
      });
      this.passPagination({ current: this.current, total: this.total });
    },
  }
};
</script>
