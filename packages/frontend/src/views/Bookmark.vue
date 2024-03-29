<template>
  <el-row :gutter="20">
    <el-col :span="4" class="hidden-smartphone hidden-tablet">
      <div>
        <el-form
          :inline="true"
          @submit.native.prevent
          size="small"
          class="right-side el-form--inline"
        >
          <el-form-item>
            <Counter
              :current="current"
              :total="total"
              @changeCurrentNumber="changeCurrentNumber"
            ></Counter>
          </el-form-item>
        </el-form>
        <el-form
          :inline="true"
          @submit.native.prevent
          size="small"
          class="right-side el-form--inline"
        >
          <el-form-item>
            <el-button icon="el-icon-link" @click="openLinks" :disabled="!isShownBookmarks"
              >{{ total }}件({{ totalLinksCount }}タブ)のDLリンクを開く</el-button
            >
          </el-form-item>
        </el-form>
        <el-form
          :inline="true"
          @submit.native.prevent
          size="small"
          class="right-side el-form--inline"
        >
          <el-form-item>
            <el-button
              type="warning"
              icon="el-icon-folder-checked"
              @click="archive"
              :disabled="!canArchive"
              >アーカイブする</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-folder-opened" @click="restore" :disabled="!canRestore"
              >表示を戻す</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div>
        <BookmarkArchive
          :archives="archives"
          :passSelection="passSelection"
          :passClosen="passClosen"
        ></BookmarkArchive>
      </div>
      <div class="sb">
        <Spons></Spons>
      </div>
    </el-col>
    <el-col :span="12">
      <section class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="canLoad">
        <Post
          :post="post"
          :useDrawer="true"
          :useSticky="false"
          mediaType="flex"
          :key="post._id"
          v-for="post in posts"
        ></Post>
        <div class="center" v-if="isEmptyWatches">
          ブックマークに登録がありません。
        </div>
        <div class="fix-loader flex justify-center" v-if="shouldShowLoader">
          <Loader :shouldShowLoader="shouldShowLoader"></Loader>
        </div>
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
.title {
  font-size: 0.77rem; // 14px(this font-size) / 18px(root font-size)
  color: #606266;
  line-height: 40px;
}
</style>

<script>
import UserDrawer from "@/container/UserDrawer.vue";
import Post from "@/components/Post.vue";
import Loader from "@/components/Loader.vue";
import Counter from "@/components/Counter.vue";
import Spons from "@/components/sponsor/Spons.vue";
import BookmarkArchive from "@/components/BookmarkArchive.vue";
import { parseToExternalLinks } from "@/plugins/tweet";

export default {
  name: "bookmark",
  data() {
    return {
      skip: 0,
      limit: 5,
      total: 0,
      posts: [],
      links: [],
      totalLinksCount: 0,
      isLoading: false,
      isCompletedLoading: false,
      isEmptyWatches: false,
      isSelectedArchive: false
    };
  },
  components: {
    UserDrawer,
    Post,
    Loader,
    Counter,
    BookmarkArchive,
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
    },
    isShownBookmarks() {
      return this.posts.length > 0;
    },
    hasBookmarks() {
      return this.$store.getters["bookmark/bookmarks"].length > 0;
    },
    canArchive() {
      return this.hasBookmarks && !this.isSelectedArchive;
    },
    canRestore() {
      return this.hasBookmarks && this.isSelectedArchive;
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
    updateArchives() {
      const archives = this.$store.getters["bookmark/archives"];
      this.archives = archives.map(item => ({
        _id: item.id,
        word: this.$dayjs(item.createdAt).format("YYYY/MM/DD HH:mm"),
        count: item.bookmarks.length
      }));
    },
    updateLinks() {
      this.links = this.bookmarks
        .map(bookmark => parseToExternalLinks(bookmark.text))
        .flat()
        .map(link => link.url);
      this.totalLinksCount = this.links.length;
    },
    initialize() {
      this.updateBookmarks();
      this.updateArchives();
      this.updateLinks();
      this.isSelectedArchive = false;
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

      const url = [window.location.href, new URLSearchParams({ skip: this.skip }).toString()].join(
        "?"
      );
      this.$ga.page({
        location: url
      });
    },
    openUserDrawer(postedBy) {
      if (!postedBy) return;
      const payload = { ...postedBy };
      this.$store.dispatch("drawer/initialize", payload);
      this.$store.dispatch("saveLocalStorage");
    },
    archive() {
      this.$store.dispatch("bookmark/addArchive");
      this.$store.dispatch("saveLocalStorage");
      this.initialize();
      this.search();
    },
    restore() {
      this.initialize();
      this.search();
    },
    passSelection(item) {
      this.isSelectedArchive = true;
      const archives = this.$store.getters["bookmark/archives"];
      const selected = archives.find(e => e.id === item._id);
      this.bookmarks = selected ? selected.bookmarks.reverse() : [];
      this.updateLinks();
      this.search();
    },
    passClosen(item) {
      if (window.confirm(`「${item.word}」 のブックマークを削除してもよろしいでしょうか？`)) {
        const payload = { id: item._id };
        this.$store.dispatch("bookmark/removeArchive", payload);
        this.$store.dispatch("saveLocalStorage");
        this.updateArchives();
        this.$forceUpdate(); // FIXME: del
      }
    },
    openLinks() {
      const urls = this.links;
      if (window.confirm(`${urls.length} つのタグを新しく開きます。よろしいでしょうか？`)) {
        urls.map(url => window.open(url, "_blank"));
      }
    }
  }
};
</script>
