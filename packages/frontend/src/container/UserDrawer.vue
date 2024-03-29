<template>
  <section class="infinite-list drawer" ref="scrollable" v-if="user">
    <DrawerHistory></DrawerHistory>
    <section class="profile">
      <div :style="{ background: `#${user.profileBackgroundColor}` }">
        <img
          v-lazy="`${user.profileBannerUrl}/web`"
          :alt="`${user.profileBannerUrl}/web`"
          class="banner" />
      </div>
      <Icon class="icon" :user="user" :useTwitterPage="true"></Icon>
      <WatchBtn
        :class="{ absolute: true }"
        :hasText="true"
        :user="user"
        :style="{ top: 250 + 'px', right: 1 + 'rem' }"
      ></WatchBtn>
      <div class="text">
        <div class="names">
          <span class="name">{{ user.name }}</span>
          <ScreenName :screenName="user.screenName"></ScreenName>
        </div>
        <div v-if="user.hostname">
          <i class="el-icon-link"></i>
          <BlankLink :href="user.url" :text="user.hostname"></BlankLink>
        </div>
        <div class="description" v-html="$activateLink(user.description)"></div>
      </div>
      <div class="footer">
        <div class="counts">
          <div>
            {{ user.postCount }}
            <span class="suffix">投稿数</span>
          </div>
          <div>
            <UserSearchLink :user="user"></UserSearchLink>
          </div>
        </div>
      </div>
    </section>
    <section
      class="inifinite-scroll-container"
      v-infinite-scroll="loadPost"
      infinite-scroll-disabled="isDisableLoading"
      infinite-scroll-distance="200"
    >
      <Post
        :post="post"
        :useDrawer="false"
        mediaType="grid"
        :key="post._id"
        v-for="post in posts"
      ></Post>

    <div class="fix-loader flex justify-center" v-if="shouldShowLoader">
      <Loader :shouldShowLoader="shouldShowLoader"></Loader>
    </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.drawer {
  position: relative;
}
.inifinite-scroll-container {
  padding-top: 1rem;
  position: relative;
}
.profile {
  display: flex;
  flex-direction: column;
  border-radius: .5rem;
  position: relative;
  contain: content;
  & .text > div + div {
    padding-top: 0.5rem;
  }
  & .icon {
    position: absolute;
    top: calc(240px - 40px);
    left: 1rem;
    box-shadow: 0 0 0 4px white;
    overflow: hidden;
  }
  & .banner {
    object-fit: cover;
    height: 240px;
    width: 100%;
  }
  & .text {
    word-break: break-word;
    white-space: pre-wrap;
    background: white;
    padding: 0.5rem 1rem;
    padding-top: 3rem;
    font-size: 1rem;
    & .screen-name {
      padding-left: 0.25rem;
    }
  }
  & .description {
    white-space: pre-wrap;
    flex-wrap: wrap;
    font-weight: 500;
  }
  & i > * {
    padding-left: 0.5rem;
  }
}

.footer {
  padding: 0.5rem 0 1rem;
  background: white;
  .counts {
    font: bold;
    display: flex;
    justify-content: space-around;
  }
  .suffix {
    opacity: 0.5;
    font-size: 60%;
  }
}
</style>

<script>
import Post from "@/components/Post.vue";
import Icon from "@/components/Icon.vue";
import Loader from "@/components/Loader.vue";
import ScreenName from "@/components/ScreenName.vue";
import UserSearchLink from "@/components/links/UserSearchLink.vue";
import WatchBtn from "@/components/btn/WatchBtn.vue";
import BlankLink from '../components/BlankLink.vue';
import DrawerHistory from "../components/DrawerHistory.vue";

export default {
  name: "UserDrawer",
  components: {
    Post,
    Icon,
    Loader,
    ScreenName,
    UserSearchLink,
    WatchBtn,
    BlankLink,
    DrawerHistory
  },
  props: ["postedBy"],
  computed: {
    user: {
      get() {
        const user = this.$store.getters["drawer/getUser"];
        if (!user) return user;
        const { url } = user;
        let hostname = '';
        try {
          hostname = url ? new URL(url).hostname : ""; // NOTE: github-issue:#60
        } catch (e) {
          //
        }
        return Object.assign(user, {
          hostname,
        });
      },
    },
    posts: {
      get() {
        return this.$store.getters["drawer/getPosts"];
      },
    },
    selectableHistory: {
      get() {
        return this.history.slice(5, 20);
      }
    },
    showableHistory: {
      get() {
        return this.history.slice(0, 5);
      }
    },
    history: {
      get() {
        return this.$store.getters["drawer/getHistory"];
      }
    },
    isDisableLoading: {
      get() {
        return (
          this.$store.getters["drawer/isCompletedLoading"] ||
          this.$store.getters["drawer/isLoading"]
        );
      },
    },
    shouldShowLoader: {
      get() {
        return (
          !this.$store.getters["drawer/isCompletedLoading"] &&
          this.$store.getters["drawer/isLoading"]
        );
      },
    },
    shouldHideReply() {
      return !this.$store.getters["config/shouldHideReply"];
    },
    shouldHideOutOfLink() {
      return !this.$store.getters["config/shouldHideOutOfLink"];
    },
  },
  watch: {
    async shouldHideReply() {
      await this.$store.dispatch("drawer/initialize", this.user);
    },
    async shouldHideOutOfLink() {
      await this.$store.dispatch("drawer/initialize", this.user);
    },
    postedBy() {
      this.$refs.scrollable.scrollTop = 0;
    },
  },
  methods: {
    async loadPost() {
      await this.$store.dispatch("drawer/loadPost");
    },
  },
};
</script>
