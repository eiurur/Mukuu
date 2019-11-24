<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-form ref="form" :model="searchOption" label-width="56px">
        <el-form-item label="検索">
          <el-input placeholder="検索" prefix-icon="el-icon-search" v-model="searchOption.searchWord"></el-input>
        </el-form-item>
        <el-form-item label="並替">
          <el-select v-model="searchOption.sort" placeholder="please select sort type">
            <el-option label="投稿日時が新しい順" value="createdAtDesc"></el-option>
            <el-option label="投稿日時が古い順" value="createdAtAsc"></el-option>
            <el-option label="リツイートが多い順" value="retweetCountDesc"></el-option>
            <el-option label="お気に入りが多い順" value="favoriteCountDesc"></el-option>
            <!-- <el-option label="人気順" value="PopularDesc"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="開始日">
          <el-date-picker
            type="date"
            placeholder="開始日"
            v-model="searchOption.from"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="終了日">
          <el-date-picker
            type="date"
            placeholder="終了日"
            v-model="searchOption.to"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <Counter :current="current" :total="total"></Counter>
    </el-col>
    <el-col :span="12">
      <section class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="canLoad">
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
</style>

<script>
import post from "../api/post";
import UserDrawer from "@/components/UserDrawer.vue";
import Post from "@/components/Post.vue";
import Loader from "@/components/Loader.vue";
import Counter from "@/components/Counter.vue";

export default {
  name: "home",
  data() {
    return {
      skip: 0,
      limit: 5,
      total: 0,
      posts: [],
      isLoading: false,
      isCompletedLoading: false,
      searchOption: {
        searchWord: "",
        sort: "createdAtDesc",
        from: "",
        to: ""
      }
    };
  },
  components: {
    UserDrawer,
    Post,
    Loader,
    Counter
  },
  computed: {
    canLoad() {
      return this.isCompletedLoading || this.isLoading;
    },
    shouldShowLoader() {
      return !this.isCompletedLoading && this.isLoading;
    },
    current() {
      return this.posts.length;
    }
  },
  watch: {
    searchOption: {
      handler() {
        this.skip = 0;
        this.posts = [];
        this.fetchCount();
        this.load();
      },
      deep: true
    }
  },
  mounted() {
    this.fetchCount();
  },
  methods: {
    async fetchCount() {
      this.total = await post.fetchCount(Object.assign({}, this.searchOption));
    },
    async load() {
      this.isLoading = true;
      const newPosts = await post.fetch(
        Object.assign({ limit: this.limit, skip: this.skip }, this.searchOption)
      );
      if (newPosts.length < 1) {
        this.isLoading = false;
        this.isCompletedLoading = true;
        return;
      }
      const expandedPosts = newPosts.map((p, i) => {
        const ret = p;
        if (p.entities) ret.entities = JSON.parse(p.entities);
        this.addDividingFlag(i, newPosts);
        return ret;
      });
      this.posts = [...this.posts, ...expandedPosts];
      this.skip += this.limit;
      this.isLoading = false;
    },
    addDividingFlag(index, posts) {
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
      const payload = Object.assign({}, postedBy);
      this.$store.dispatch("drawer/initialize", payload);
    }
  }
};
</script>