<template>
  <section class="infinite-list" ref="scrollable" v-if="user">
    <section class="profile">
      <div :style="{background: `#${user.profileBackgroundColor}`}">
        <img :src="user.profileBannerUrl" class="banner" />
      </div>
      <div class="icon">
        <img :src="user.icon" />
      </div>
      <div class="text">
        <div>{{user.name}} @ {{user.screenName}}</div>
        <div v-if="user.hostname">
          <i class="el-icon-link"></i>
          <a :href="user.url" target="_blank">{{user.hostname}}</a>
        </div>
        <div v-html="$activateLink(user.description)"></div>
      </div>
    </section>
    <section v-infinite-scroll="loadPost" infinite-scroll-disabled="isCompletedLoading">
      <Post :post="post" :useDrawer="false" :key="post._id" v-for="post in posts"></Post>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-radius: 1rem;
  position: relative;
  & .text > div + div {
    padding-top: 0.5rem;
  }
  & .icon {
    position: absolute;
    top: calc(240px - 40px);
    left: 1rem;
    border-radius: 100%;
    border: 4px solid white;
    & img {
      border-radius: 100%;
    }
  }
  & .banner {
    object-fit: cover;
    height: 240px;
    width: 100%;
  }
  & .text {
    background: white;
    padding: 1rem;
    padding-top: calc(1rem + 2.5rem);
    font-size: 1rem;
  }
  & i > * {
    padding-left: 0.5rem;
  }
}
</style>

<script>
import Post from "@/components/Post.vue";

export default {
  name: "UserDrawer",
  components: {
    Post
  },
  props: ["postedBy"],
  computed: {
    user: {
      get() {
        const user = this.$store.getters["drawer/getUser"];
        if (!user) return user;
        const icon = user.profileImageUrl
          ? user.profileImageUrl.replace("_normal", "_bigger")
          : "";
        const hostname = user.url ? new URL(user.url).hostname : "";
        return Object.assign(user, {
          icon,
          hostname
        });
      }
    },
    posts: {
      get() {
        return this.$store.getters["drawer/getPosts"];
      }
    },
    isCompletedLoading: {
      get() {
        return this.$store.getters["drawer/isCompletedLoading"];
      }
    }
  },
  mouted() {
    this.$refs.scrollable.scrollTop = 0;
  },
  methods: {
    async loadPost() {
      await this.$store.dispatch("drawer/loadPost");
    }
  }
};
</script>