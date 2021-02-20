<template>
  <el-row :gutter="20">
    <el-col :span="4" class="hidden-smartphone hidden-tablet">
      <div>
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
            <el-select v-model="searchOption.sort">
              <template slot="prefix">
                <i class="el-icon-sort prefix-icon"></i>
              </template>
              <el-option
                label="登録日時が新しい順"
                value="createdAtDesc"
              ></el-option>
              <el-option
                label="登録日時が古い順"
                value="createdAtAsc"
              ></el-option>
              <el-option
                label="フォロワーが多い順"
                value="followersCountDesc"
              ></el-option>
              <el-option
                label="投稿数が多い順"
                value="postCountDesc"
              ></el-option>
              <!-- <el-option label="人気順" value="PopularDesc"></el-option> -->
            </el-select>
          </el-form-item>
        </el-form>
        <el-form
          :inline="true"
          @submit.native.prevent
          size="mini"
          class="between"
        >
          <el-form-item>
            <el-button type="danger" icon="el-icon-refresh" @click="clear"
              >クリア</el-button
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
      </div>
      <div class="sb">
        <Spons></Spons>
      </div>
    </el-col>
    <el-col :span="12">
      <section
        class="infinite-list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="canLoad"
      >
        <article class="profile" v-for="user in users" :key="user._id">
          <div class="identity">
            <Icon :user="user" :useUserDrawer="true" :size="73"></Icon>
            <div class="names">
              <span class="name">{{ user.name }}</span>
              <ScreenName :screenName="user.screenName"></ScreenName>
            </div>
            <WatchBtn
              :class="{ absolute: true }"
              :user="user"
              :hasText="true"
              :style="{ right: 0 }"
            ></WatchBtn>
          </div>
          <div class="description">
            <div
              v-html="$activateLink(user.description)"
            ></div>
          </div>
          <div class="counts">
            <div>
              {{ user.postCount }}
              <span class="suffix">投稿数</span>
            </div>
            <div>
              {{ user.statusesCount }}
              <span class="suffix">ツイート</span>
            </div>
            <div>
              {{ user.friendsCount }}
              <span class="suffix">フォロー</span>
            </div>
            <div>
              {{ user.followersCount }}
              <span class="suffix">フォロワー</span>
            </div>
          </div>
          <!-- <FlexMediaList :media="use.medias" class="media-list"></FlexMediaList> -->
          <GridMediaList
            v-if="$mq == 'sm'"
            :useImageOnly="true"
            :media="user.medias"
          ></GridMediaList>
          <FlexMediaList
            v-else
            :media="user.medias"
            :useImageOnly="true"
            :useFixedWidth="true"
            class="media-list"
          ></FlexMediaList>
          <div>
            <UserSearchLink :user="user"></UserSearchLink>
          </div>
        </article>
        <Loader :shouldShowLoader="shouldShowLoader"></Loader>
      </section>
    </el-col>
    <el-col :span="8" class="hidden-smartphone hidden-tablet">
      <UserDrawer></UserDrawer>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.profile {
  & > div:not(:last-child) {
    padding-bottom: 1rem;
  }
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 1rem;
  contain: content;

  .identity {
    display: flex;
    font-size: 1rem;
    line-height: 1.5;
    flex-direction: row;
    align-items: center;
    position: relative;
    .names {
      flex-direction: column;
      display: flex;
      padding-left: 1rem;
      overflow: hidden;
      & .name {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .description {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-weight: 500;
  }
  .counts {
    font: bold;
    display: flex;
    justify-content: space-around;
  }
}
.suffix {
  opacity: 0.5;
  font-size: 60%;
}
.profile + .profile {
  margin-top: 1rem;
}
.media-list {
  height: 240px;
}
</style>

<script>
import mediumZoom from "medium-zoom";
import Icon from "@/components/Icon.vue";
import ScreenName from "@/components/ScreenName.vue";
import UserDrawer from "@/container/UserDrawer.vue";
import Loader from "@/components/Loader.vue";
import Counter from "@/components/Counter.vue";
import FlexMediaList from "@/components/FlexMediaList.vue";
import GridMediaList from "@/components/GridMediaList.vue";
import Spons from "@/components/sponsor/Spons.vue";
import UserSearchLink from "@/components/links/UserSearchLink.vue";
import WatchBtn from "@/components/btn/WatchBtn.vue";
import { debounce } from "../plugins/util";
import user from "../api/user";

export default {
  name: "users",
  data() {
    return {
      skip: 0,
      limit: 5,
      total: 0,
      users: [],
      isLoading: false,
      isCompletedLoading: false,
      searchOption: {
        searchWord: "",
        sort: "postCountDesc",
      },
    };
  },
  components: {
    ScreenName,
    UserDrawer,
    Icon,
    Loader,
    Counter,
    FlexMediaList,
    GridMediaList,
    Spons,
    UserSearchLink,
    WatchBtn,
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
  },
  watch: {
    searchOption: {
      handler() {
        this.search({ skip: 0 });
      },
      deep: true,
    },
  },
  created() {
    this.search = debounce(({ skip } = {}) => {
      this.isCompletedLoading = false;
      this.skip = skip || 0;
      this.users = [];
      Promise.all([this.fetchCount(), this.load()]);
    }, 200).bind(this);
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
        sort: "postCountDesc",
      };
      this.skip = 0;
    },
    async fetchCount() {
      const { count } = await user.fetchCount({ ...this.searchOption });
      this.total = count;
    },
    async load() {
      this.isLoading = true;
      const { data, url } = await user.fetch({
        ...{ limit: this.limit, skip: this.skip, includePostNum: 4 },
        ...this.searchOption,
      });
      if (data.length < 1) {
        this.isLoading = false;
        this.isCompletedLoading = true;
        return;
      }
      const expandedUsers = data.map((p) => {
        const ret = p;
        ret.posts = p.posts.map((post) => {
          if (post.entities) post.entities = JSON.parse(post.entities);
          return post;
        });
        ret.medias = this.takeMedias(ret.posts, {
          format: "jpg",
          name: "medium",
          count: 4,
        });
        if (p.entities) ret.entities = JSON.parse(p.entities);
        return ret;
      });
      this.users = [...this.users, ...expandedUsers];
      this.skip += this.limit;
      this.isLoading = false;
      this.$ga.page({
        location: url,
      });
    },
    takeMedias(tweets, { count = 4 } = {}) {
      return (
        tweets
          .filter((p) => p.entities && p.entities.media)
          .map((p) => p.entities.media)
          // .map(media =>
          //   media.map(m => `${m.media_url_https}?format=${format}&name=${name}`)
          // )
          .flat()
          .sort(() => Math.random() - Math.random())
          .slice(0, count)
      );
    },
    imageWidthStyle(medias) {
      if (!medias) return {};
      return {
        w33p: medias.length === 3,
        w50p: medias.length === 2,
        w100p: medias.length === 1,
      };
    },
  },
  updated() {
    this.$nextTick(() => {
      const images = Array.from(
        document.querySelectorAll("[data-zoomable]:not(.medium-zoom-image)")
      );
      images.map(
        (img) =>
          (img.onload = () =>
            !img.classList.contains("medium-zoom-image") &&
            mediumZoom(img, { background: "#000" }))
      );
    });
  },
};
</script>
