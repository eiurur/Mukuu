<template>
  <div class="quote-container" v-if="post.text">
    <article class="post" :class="{quoted: isQuoted}">
      <div class="text-container">
        <UserProfile :post="post" :useDrawer="useDrawer"></UserProfile>
      </div>
      <div class="quote">
        <img
          v-lazy="`${media}?format=jpg&name=medium`"
          class="original"
          data-zoomable
        />
        <div class="text" v-html="$activateLink(post.text)"></div>
      </div>
      <PostFooter :class="{shrink: isQuoted}" :post="post" :isQuoted="isQuoted"></PostFooter>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.quote-container {
  contain: content;
  display: flex;
  flex-direction: row;
  & + .quote-container {
    margin-top: 1rem;
  }
}
.quote {
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  img {
    object-fit: cover;
    width: 120px;
    height: 120px;
    margin-right: 1rem;
    border-radius: .5rem;
  }
  .text {
    font-size: .8rem;
  }
}
article.post {
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  border-radius: 0.25rem;
  padding: 1rem;

  &.quoted {
    width: 100%;
    box-shadow: none;
    border: 1px solid rgb(196, 207, 214);
    border-radius: 1rem;
    margin-top: 0.5rem;
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

  .text-container {
    .text {
      word-break: break-word;
      white-space: pre-wrap;
      font-size: 1rem;
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
import mediumZoom from "medium-zoom";
import UserProfile from "@/components/UserProfile.vue";
import PostFooter from "@/components/PostFooter.vue";
import { parseToExternalLinks } from "@/plugins/tweet";

export default {
  name: "Quote",
  components: { PostFooter, UserProfile },
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
  computed: {
    media() {
      if (!this.post.entities) return null;
      if (!this.post.entities.media) return null;
      return this.post.entities.media[0].media_url_https;
    },
    hasExternalLink: {
      get() {
        return parseToExternalLinks(this.post.text).length > 0;
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      const images = Array.from(
        document.querySelectorAll("[data-zoomable]:not(.medium-zoom-image)")
      );
      images.map(
        img =>
          (img.onload = () =>
            !img.classList.contains("medium-zoom-image") &&
            mediumZoom(img, { background: "#000" }))
      );
    });
  }
};
</script>
