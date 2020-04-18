<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <div>
        <el-form :inline="true" @submit.native.prevent size="mini" class="right-side">
          <el-form-item>
            <Counter
              :current="current"
              :total="total"
              @changeCurrentNumber="changeCurrentNumber"
            ></Counter>
          </el-form-item>
        </el-form>
      </div>
      <div class="sb">
        <Spons></Spons>
      </div>
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
      &:before {
        content: "@";
      }
    }
  }
}
</style>

<script>
import UserDrawer from "@/components/UserDrawer.vue";
import Post from "@/components/Post.vue";
import Loader from "@/components/Loader.vue";
import Counter from "@/components/Counter.vue";
import Spons from "@/components/Spons.vue";

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
      isEmptyWatches: false
    };
  },
  components: {
    UserDrawer,
    Post,
    Loader,
    Counter,
    Spons
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
    this.bookmarks = this.$store.getters["bookmark/bookmarks"];
    if (Array.isArray(this.bookmarks)) {
      this.bookmarks = Array.from(this.bookmarks).reverse();
    }
  },
  mounted() {
    this.fetchCount();
  },
  methods: {
    changeCurrentNumber(skip) {
      this.search({ skip });
    },
    async fetchCount() {
      if (!this.bookmarks.length) return;
      this.total = this.bookmarks.length;
    },
    async load() {
      this.isLoading = true;
      if (!this.bookmarks.length) {
        this.isLoading = false;
        this.isEmptyWatches = true;
        return;
      }
      const data = this.bookmarks.slice(this.skip, this.skip + this.limit);
      if (data.length < 1) {
        this.isLoading = false;
        this.isCompletedLoading = true;
        return;
      }
      this.posts = [...this.posts, ...data];
      this.skip += this.limit;
      this.isLoading = false;
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
