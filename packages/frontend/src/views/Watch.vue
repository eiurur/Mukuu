<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <Counter :current="current" :total="total"></Counter>
      <section class="infinite-list">
        <div class="watch" :key="user._id" v-for="user in watches">
          <div class="user">
            <div class="icon" @click="openUserDrawer(user)">
              <img v-lazy="user.profileImageUrl" onerror="this.style.display = 'none'" />
            </div>
            <div class="profile">
              <div class="names">
                <span class="name">{{ user.name }}</span>
                <span class="screen-name">@{{ user.screenName }}</span>
              </div>
            </div>
            <WatchBtn :user="user"></WatchBtn>
          </div>
        </div>
      </section>
    </el-col>
    <el-col :span="12">
      <section class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="canLoad">
        <Post :post="post" :useDrawer="true" :key="post._id" v-for="post in posts"></Post>
        <div class="center" v-if="isEmptyWatches">ウォッチリストに登録がありません。</div>
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
.watches {
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
import WatchBtn from "@/components/WatchBtn.vue";
import post from "../api/post";

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
      isEmptyWatches: false,
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
    Counter,
    WatchBtn
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
    this.watches = this.$store.getters["watch/watches"];
  },
  mounted() {
    this.fetchCount();
  },
  methods: {
    async fetchCount() {
      if (!this.watches.length) return;
      const { count } = await post.fetchCount({
        ...{ postedBy: this.watches.map(user => user._id) },
        ...this.searchOption
      });
      this.total = count;
    },
    async load() {
      this.isLoading = true;
      if (!this.watches.length) {
        this.isLoading = false;
        this.isEmptyWatches = true;
        return;
      }
      const { data, url } = await post.fetch({
        ...{ limit: this.limit, skip: this.skip },
        ...{ postedBy: this.watches.map(user => user._id) },
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
