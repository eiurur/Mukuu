<template>
  <el-row :gutter="20">
    <el-col :span="4" class="hidden-smartphone hidden-tablet">
      <el-form :inline="true" @submit.native.prevent size="mini" class="right-side">
        <el-form-item>
          <Counter
            :current="current"
            :total="total"
            @changeCurrentNumber="changeCurrentNumber"
          ></Counter>
        </el-form-item>
      </el-form>
      <section class="infinite-list">
        <div class="watch" :key="user._id" v-for="user in watches">
          <div class="user">
            <div class="icon" @click="openUserDrawer(user)">
              <img v-lazy="user.profileImageUrl" onerror="this.style.display = 'none'" />
            </div>
            <div class="profile">
              <div class="names">
                <span class="name">{{ user.name }}</span>
                <ScreenName :screenName="user.screenName"></ScreenName>
              </div>
            </div>
            <WatchBtn :user="user"></WatchBtn>
          </div>
        </div>
      </section>
    </el-col>
    <el-col :span="12">
      <section class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="canLoad">
        <Post
          :post="post"
          :useSticky="useSticky"
          :useDrawer="true"
          mediaType="flex"
          :key="post._id"
          v-for="post in posts"
        ></Post>
        <div class="center" v-if="isEmptyWatches">ウォッチリストに登録がありません。</div>
        <Loader :shouldShowLoader="shouldShowLoader"></Loader>
      </section>
    </el-col>
    <el-col :span="8" class="hidden-smartphone hidden-tablet">
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
  .profile {
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 0.75rem;
    font-size: 0.75rem;
    line-height: 1.8;
    overflow: hidden;
    & .names {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      & .name {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .btn {
    flex-shrink: 0;
  }
}
</style>

<script>
import ScreenName from "@/components/ScreenName.vue";
import UserDrawer from "@/container/UserDrawer.vue";
import Post from "@/components/Post.vue";
import Loader from "@/components/Loader.vue";
import Counter from "@/components/Counter.vue";
import WatchBtn from "@/components/btn/WatchBtn.vue";
import { addDividingFlag, expandRecusively } from "@/plugins/post";
import post from "../api/post";

export default {
  name: "watch",
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
    ScreenName,
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
      return Math.min(this.skip, this.total);
    },
    useSticky() {
      return true;
      //      return !this.searchOption.searchWord;
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
    this.search = ({ skip } = {}) => {
      this.isCompletedLoading = false;
      this.isEmptyWatches = false;
      this.skip = skip || 0;
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
    changeCurrentNumber(skip) {
      this.search({ skip });
    },
    async fetchCount() {
      if (!this.watches.length) return;
      const { count } = await post.fetchCount({
        ...{ column: { postedBy: this.watches.map(user => user._id) } },
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
        ...{ column: { postedBy: this.watches.map(user => user._id) } },
        ...this.searchOption
      });
      if (data.length < 1) {
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
      this.skip += this.limit;
      this.isLoading = false;
      this.$ga.page({
        location: url
      });
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
