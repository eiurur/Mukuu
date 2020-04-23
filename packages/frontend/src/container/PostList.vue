<template>
  <section class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="canLoad">
    <TwitterSearchLink :searchWord="searchOption.searchWord" v-if="isEmpty">
      <template v-slot:caption>
        <p>サイト内で見つかりませんでした。</p>
      </template>
    </TwitterSearchLink>
    <Post :post="post" :useDrawer="true" :key="post._id" v-for="post in posts"></Post>
    <TwitterSearchLink :searchWord="searchOption.searchWord" v-if="isLoadedLast" class="wrap"></TwitterSearchLink>
    <Loader :shouldShowLoader="shouldShowLoader"></Loader>
  </section>
</template>

<style lang="scss" scoped>
section + section {
  margin-top: 1rem;
}
</style>

<script>
import dayjs from "dayjs";
import Loader from "@/components/Loader.vue";
import Post from "@/components/Post.vue";
import TwitterSearchLink from "@/components/TwitterSearchLink.vue";
import { debounce } from "../plugins/util";
import post from "../api/post";

export default {
  name: "PostList",
  data() {
    return {
      posts: [],
      isLoading: false,
      isEmpty: false,
      isCompletedLoading: false,
      canWatchSearchOption: false
    };
  },
  props: {
    searchOption: Object,
    skip: { type: Number, default: 0 },
    limit: { type: Number, default: 5 },
    total: { type: Number, default: 0 }
  },
  components: {
    Loader,
    Post,
    TwitterSearchLink
  },
  computed: {
    canLoad() {
      return this.isCompletedLoading || this.isLoading;
    },
    shouldShowLoader() {
      return !this.isCompletedLoading && this.isLoading;
    },
    isLoadedLast() {
      return this.total === this.current;
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
    this.search = debounce(({ skip }) => {
      this.isCompletedLoading = false;
      this.isEmpty = false;
      this.skip = skip || 0;
      this.posts = [];
      this.fetchCount();
      this.load();
    }, 500);
  },
  mounted() {
    this.restoreSearchOptionFromQueryString();
    this.fetchCount();
  },
  methods: {
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
