<template>
  <fragment>
    <div
      class="mukuu el-divider el-divider--horizontal"
      :class="{ sticky: useSticky }"
      v-if="post.shouldShowDivider"
    >
      <div class="mukuu el-divider__text is-center">{{ post.createdAt }}</div>
    </div>

    <div class="post-container" v-if="hasExternalLink">
      <article class="post" :class="{quoted: isQuoted}">
        <div class="text-container">
          <UserProfile :post="post" :useDrawer="useDrawer"></UserProfile>
          <div class="text" v-html="$activateLink(post.text)"></div>
        </div>
        <GridMediaList
          v-if="$mq == 'sm' || isGrid"
          :media="post.entities.media"
        ></GridMediaList>
        <FlexMediaList v-else :media="post.entities.media"></FlexMediaList>
        <Post
        v-if="post.quotedStatuses && post.quotedStatuses[0]"
        mediaType="grid"
        :useDrawer="true"
        :isQuoted="true"
        :post="post.quotedStatuses[0]"></Post>
        <!-- <div v-if="post.quotedStatuses && post.quotedStatuses[0]">
        <Post
        v-for="quote in post.quotedStatuses"
        mediaType="grid"
        :useDrawer="true"
        :isQuoted="true"
        :key="quote._id"
        :post="quote"></Post>
        </div> -->
        <PostFooter :class="{shrink: isQuoted}" :post="post" :isQuoted="isQuoted"></PostFooter>
      </article>
    </div>
  </fragment>
</template>

<style lang="scss" scoped>
.post-container {
  & + .post-container {
    margin-top: 1rem;
  }
}
article.post {
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  border-radius: 0.25rem;
  padding: 1rem;

  & > div + div {
    margin-top: 0.5rem;
  }

  &.quoted {
    box-shadow: none;
    border: 1px solid rgb(196, 207, 214);
    border-radius: 1rem;
    margin: 0.5rem 0;
    .shrink {
      opacity: 0.1;
      transition: all ease .25s;
    }
    &:hover {
      .shrink {
        opacity: 1;
      }
    }
  }

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  .text-container {
    .text {
      word-break: break-word;
      white-space: pre-wrap;
      font-size: 1rem;
      font-weight: 500;
    }

    & > div + div {
      padding-top: 1rem;
    }
  }
  & i + * {
    padding-left: 0.5rem;
  }
}
</style>

<script>
import FlexMediaList from "@/components/FlexMediaList.vue";
import GridMediaList from "@/components/GridMediaList.vue";
import PostFooter from "@/components/PostFooter.vue";
import UserProfile from "@/components/UserProfile.vue";
import { parseToExternalLinks } from "@/plugins/tweet";

export default {
  name: "Post",
  components: { FlexMediaList, GridMediaList, PostFooter, UserProfile },
  props: {
    post: {
      type: Object,
    },
    prePost: {
      type: Object,
    },
    mediaType: {
      type: String,
    },
    useDrawer: {
      type: Boolean,
      default: false,
    },
    useSticky: {
      type: Boolean,
      default: false,
    },
    isQuoted: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openUserDrawer(postedBy) {
      if (!postedBy || !this.useDrawer) return;
      const payload = { ...postedBy };
      this.$store.dispatch("drawer/initialize", payload);
      this.$store.dispatch("saveLocalStorage");
    },
  },
  computed: {
    isGrid: {
      get() {
        return this.mediaType === "grid";
      },
    },
    isFlex: {
      get() {
        return this.mediaType === "flex";
      },
    },
    hasExternalLink: {
      get() {
        return parseToExternalLinks(this.post.text).length > 0;
      },
    },
  },
};
</script>
