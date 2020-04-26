<template>
  <section class="infinite-list" ref="scrollable" v-if="user">
    <section class="profile">
      <div :style="{ background: `#${user.profileBackgroundColor}` }">
        <img v-lazy="`${user.profileBannerUrl}/web`" class="banner" />
      </div>
      <Icon class="icon" :user="user" :useTwitterPage="true"></Icon>
      <WatchBtn
        :class="{ absolute: true }"
        :hasText="true"
        :user="user"
        :style="{ top: 250 + 'px', right: 1 + 'rem' }"
      ></WatchBtn>
      <div class="text">
        <div>
          <span class="name">{{ user.name }}</span>
          <span class="screen-name">{{ user.screenName }}</span>
        </div>
        <div v-if="user.hostname">
          <i class="el-icon-link"></i>
          <a :href="user.url" target="_blank">{{ user.hostname }}</a>
        </div>
        <div v-html="$activateLink(user.description)"></div>
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
    <section v-infinite-scroll="loadPost" infinite-scroll-disabled="isDisableLoading">
      <Post :post="post" :useDrawer="false" mediaType="grid" :key="post._id" v-for="post in posts"></Post>
      <Loader :shouldShowLoader="shouldShowLoader"></Loader>
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
    box-shadow: 0 0 0 4px white;
  }
  & .banner {
    object-fit: cover;
    height: 240px;
    width: 100%;
  }
  & .text {
    word-break: break-word;
    background: white;
    padding: 0.5rem 1rem;
    padding-top: 3rem;
    font-size: 1rem;

    & .screen-name {
      padding-left: 0.5rem;
      opacity: 0.5;
      &:before {
        content: "@";
      }
    }
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
import UserSearchLink from "@/components/UserSearchLink.vue";
import WatchBtn from "@/components/WatchBtn.vue";

export default {
  name: "UserDrawer",
  components: {
    Post,
    Icon,
    Loader,
    UserSearchLink,
    WatchBtn
  },
  props: ["postedBy"],
  computed: {
    user: {
      get() {
        const user = this.$store.getters["drawer/getUser"];
        if (!user) return user;
        const { url } = user;
        const hostname = url ? new URL(url).hostname : "";
        return Object.assign(user, {
          hostname
        });
      }
    },
    posts: {
      get() {
        return this.$store.getters["drawer/getPosts"];
      }
    },
    isDisableLoading: {
      get() {
        return (
          this.$store.getters["drawer/isCompletedLoading"] ||
          this.$store.getters["drawer/isLoading"]
        );
      }
    },
    shouldShowLoader: {
      get() {
        return (
          !this.$store.getters["drawer/isCompletedLoading"] &&
          this.$store.getters["drawer/isLoading"]
        );
      }
    }
  },
  watch: {
    // この関数は question が変わるごとに実行されます。
    postedBy() {
      this.$refs.scrollable.scrollTop = 0;
    }
  },
  methods: {
    async loadPost() {
      await this.$store.dispatch("drawer/loadPost");
    }
  }
};
</script>
