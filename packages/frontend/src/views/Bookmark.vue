<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-form ref="form" :model="searchOption">
        <el-form-item>
          <el-input
            placeholder="検索"
            prefix-icon="el-icon-search"
            :clearable="true"
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
            <!-- <el-option label="人気順" value="PopularDesc"></el-option> -->
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true" @submit.native.prevent size="mini" class="between">
        <el-form-item>
          <el-button type="danger" icon="el-icon-close" @click="clear">クリア</el-button>
        </el-form-item>
        <el-form-item>
          <Counter :current="current" :total="total" @changeCurrentNumber="changeCurrentNumber"></Counter>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12">
      <section class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="canLoad">
        <Post :post="post" :useDrawer="true" :key="post._id" v-for="post in posts"></Post>
        <div class="center" v-if="isEmptyWatches">ブックマークに登録がありません。</div>
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
  margin-top: 0.5rem;
}
.bookmarks {
  margin-top: 1rem;
  overflow: hidden;
}
.watch {
  position: relative;
  background: white;
  border-radius: 0.25rem;
  padding: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.watch + .watch {
  margin-top: 1rem;
}
.user {
  display: flex;
  align-items: center;
  .icon {
    height: 48px;
    width: 48px;
    min-width: 48px;
    max-height: 48px;
    background: rgba(0, 0, 0, 0.12);
    border-radius: 100%;
    cursor: pointer;
    img {
      border-radius: 100%;
    }
  }
}
.profile {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.8;
  & .names {
    display: flex;
    flex-direction: column;
    & .screen-name {
      opacity: 0.5;
    }
  }
}
</style>

<script>
import UserDrawer from "@/components/UserDrawer.vue";
import Post from "@/components/Post.vue";
import Loader from "@/components/Loader.vue";
import Counter from "@/components/Counter.vue";
import post from "../api/post";

export default {
  name: "bookmark",
  data() {
    return {
      skip: 0,
      limit: 5,
      total: 0,
      posts: [],
      isLoading: false,
      isCompletedLoading: false,
      isEmptyWatches: false,
      searchOption: {
        searchWord: "",
        sort: "createdAtDesc",
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
        this.search();
      },
      deep: true
    }
  },
  created() {
    this.search = () => {
      this.isCompletedLoading = false;
      this.isEmptyWatches = false;
      this.skip = 0;
      this.posts = [];
      this.fetchCount();
      this.load();
    };
    this.bookmarks = this.$store.getters["bookmark/bookmarks"];
  },
  mounted() {
    this.fetchCount();
  },
  methods: {
    changeCurrentNumber(skip) {
      this.search({ skip });
    },
    clear() {
      this.searchOption = {
        searchWord: "",
        sort: "createdAtDesc",
        to: ""
      };
    },
    async fetchCount() {
      if (!this.bookmarks.length) return;
      const { count } = await post.fetchCount({
        ...{ column: { _id: this.bookmarks.map(post => post._id) } },
        ...this.searchOption
      });
      this.total = count;
    },
    async load() {
      this.isLoading = true;
      if (!this.bookmarks.length) {
        this.isLoading = false;
        this.isEmptyWatches = true;
        return;
      }
      const { data, url } = await post.fetch({
        ...{ limit: this.limit, skip: this.skip },
        ...{ column: { _id: this.bookmarks.map(post => post._id) } },
        ...this.searchOption
      });
      if (data.length < 1) {
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
    }
  }
};
</script>
