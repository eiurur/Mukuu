<template>
  <el-row :gutter="20">
    <el-col :span="4" class="hidden-smartphone hidden-tablet">
      <div>
        <el-form :inline="true" @submit.native.prevent size="mini" class="between el-form--inline">
          <el-form-item>
            <el-button icon="el-icon-link" @click="openLinks" :disabled="!isShownBookmarks"
              >{{ total }} 件のDLリンクを開く</el-button
            >
          </el-form-item>
          <el-form-item>
            <Counter
              :current="current"
              :total="total"
              @changeCurrentNumber="changeCurrentNumber"
            ></Counter>
          </el-form-item>
        </el-form>
        <el-form :inline="true" @submit.native.prevent size="mini" class="el-form--inline">
          <el-form-item>
            <el-button icon="el-icon-folder-checked" @click="archive" :disabled="!canArchive"
              >アーカイブ</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-folder-opened" @click="restore" :disabled="!canRestore"
              >復元</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div>
        <BookmarkHistory
          :history="history"
          :passSelection="passSelection"
          :passClosen="passClosen"
        ></BookmarkHistory>
      </div>
      <div class="sb">
        <SponsWide></SponsWide>
      </div>
    </el-col>
    <el-col :span="12">
      <section class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="canLoad">
        <Post
          :post="post"
          :useDrawer="true"
          mediaType="flex"
          :key="post._id"
          v-for="post in posts"
        ></Post>
        <div class="center" v-if="isEmptyWatches">ブックマークに登録がありません。</div>
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
</style>

<script>
import UserDrawer from "@/container/UserDrawer.vue";
import Post from "@/components/Post.vue";
import Loader from "@/components/Loader.vue";
import Counter from "@/components/Counter.vue";
import SponsWide from "@/components/sponsor/SponsWide.vue";
import BookmarkHistory from "@/components/BookmarkHistory.vue";
import { parseToExternalLinks } from "@/plugins/tweet";

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
      isSelectedHistory: false
    };
  },
  components: {
    UserDrawer,
    Post,
    Loader,
    Counter,
    BookmarkHistory,
    SponsWide
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
    isShownBookmarks() {
      return this.posts.length > 0;
    },
    hasBookmarks() {
      return this.$store.getters["bookmark/bookmarks"].length > 0;
    },
    canArchive() {
      return this.hasBookmarks && !this.isSelectedHistory;
    },
    canRestore() {
      return this.hasBookmarks && this.isSelectedHistory;
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
    this.initialize();
  },
  mounted() {
    this.fetchCount();
  },
  methods: {
    changeCurrentNumber(skip) {
      this.search({ skip });
    },
    fetchCount() {
      this.total = this.bookmarks.length;
    },
    updateBookmarks() {
      this.bookmarks = this.$store.getters["bookmark/bookmarks"];
      if (Array.isArray(this.bookmarks)) {
        this.bookmarks = Array.from(this.bookmarks).reverse();
        this.bookmarks = this.bookmarks.map(bookmark => {
          bookmark.shouldShowDivider = false;
          return bookmark;
        });
      }
    },
    updateHistory() {
      const history = this.$store.getters["bookmark/history"];
      this.history = history.map(item => ({
        _id: item.id,
        word: this.$dayjs(item.createdAt).format("YYYY/MM/DD HH:mm"),
        count: item.bookmarks.length
      }));
    },
    initialize() {
      this.updateBookmarks();
      this.updateHistory();
      this.isSelectedHistory = false;
    },
    async load() {
      this.isLoading = true;
      if (!this.bookmarks.length) {
        this.isLoading = false;
        this.isEmptyWatches = true;
        this.posts = [];
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
    },
    archive() {
      this.$store.dispatch("bookmark/addHistory");
      this.$store.dispatch("saveLocalStorage");
      this.initialize();
      this.search();
    },
    restore() {
      this.initialize();
      this.search();
    },
    passSelection(item) {
      this.isSelectedHistory = true;
      const history = this.$store.getters["bookmark/history"];
      const selected = history.find(e => e.id === item._id);
      this.bookmarks = selected ? selected.bookmarks : [];
      this.search();
    },
    passClosen(item) {
      if (window.confirm(`「${item.word}」 のブックマークを削除してもよろしいでしょうか？`)) {
        const payload = { id: item._id };
        this.$store.dispatch("bookmark/removeHistory", payload);
        this.$store.dispatch("saveLocalStorage");
        this.updateHistory();
        this.$forceUpdate(); // FIXME: del
      }
    },
    openLinks() {
      const urls = this.bookmarks
        .map(bookmark => parseToExternalLinks(bookmark.text))
        .flat()
        .map(link => link.url);
      if (window.confirm(`${urls.length} つのタグを新しく開きます。よろしいでしょうか？`)) {
        urls.map(url => window.open(url, "_blank"));
      }
    }
  }
};
</script>
