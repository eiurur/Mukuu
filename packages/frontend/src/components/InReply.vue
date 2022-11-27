<template>
  <div class="reply-container" v-if="reply.text">
    <article class="post">
      <div>
        <PostIcon :post="post" :useDrawer="useDrawer"></PostIcon>
        <div class="reply-connection"></div>
      </div>
      <div class="reply" :class="gridStyle">
        <div class="header">
          <div class="profile">
            <div class="names">
              <span class="name">{{ post.postedBy.name }}</span>
              <ScreenName :screenName="post.postedBy.screenName"></ScreenName>
            </div>
          </div>
          <div class="createdAt">
            <BlankLink :href="post.sourceUrl" :text="post.createdAt"></BlankLink>
          </div>
        </div>
        <div class="main">
          <img
            v-if="imageSrc"
            v-lazy="`${imageSrc}?format=jpg&name=medium`"
            :alt="`${imageSrc}?format=jpg&name=medium`"
            class="original"
            data-zoomable
          />
          <div class="text" v-html="$activateLink(reply.text)"></div>
        </div>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.reply-connection {
    background-color: #bbb;
    width: 2px;
    flex-grow: 1;
    height: 100%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    flex-shrink: 0;
    margin-top: .5rem;
}
.reply-container {
  contain: content;
  display: flex;
  flex-direction: row;
  width: 100%;
  article {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .names {
    font-weight: 500;
  }
}
.out-of-link {
  .reply-container {
    width: calc(100% + 2rem);
    padding: 1rem 1rem 0rem 1rem;
    margin: -1rem -1rem 1rem -1rem;
    background: white;
  }
}
.reply {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  padding-bottom: 2rem;
  background: white;
  width: 100%;
  &.grid {
    .main {
      flex-direction: column-reverse ;
      .text {
        margin-bottom: 1rem;
      }
      img {
        width: 100%;
        height: 200px;
        margin-right: 0;
      }
    }

  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 1rem;
    font-size: 1rem;
    line-height: 1.5;
    contain: content;
    & .createdAt {
      white-space: nowrap;
      & a {
        color: #bbb;
        &:hover {
          color: #179afc;
        }
      }
    }
    .names {
      & > span + span {
        margin-left: .25rem;
      }
    }
  }
  .main {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-top: 1rem;
    padding-left: 1rem;
    font-weight: 500;
  }
  img {
    object-fit: cover;
    width: 120px;
    height: 120px;
    margin-right: 1rem;
    border-radius: .5rem;
  }
  .text {
    font-size: .8rem;
    word-break: break-word;
    width: 100%;
  }
}
</style>
<script>
import mediumZoom from "medium-zoom";
import ScreenName from "@/components/ScreenName.vue";
import PostIcon from "@/components/PostIcon.vue";
import BlankLink from "@/components/BlankLink.vue";
import { parseToExternalLinks } from "@/plugins/tweet";
import { expandRecusively } from "@/plugins/post";

const mapper = require('@mukuu/common/lib/mapper');

export default {
  name: "InReply",
  components: { BlankLink, PostIcon, ScreenName },
  props: ["post", "useDrawer", "isGrid"],
  computed: {
    postedBy() {
      const tweet = JSON.parse(this.post.inReply);
      const { user } = tweet;
      if (!user) return {};
      return mapper.user(user);
    },
    reply() {
      const tweet = JSON.parse(this.post.inReply);
      if (!tweet) return {};
      const post = mapper.post(tweet, this.postedBy);
      return expandRecusively(post);
    },
    media() {
      const tweet = JSON.parse(this.post.inReply);
      if (!tweet.entities) return null;
      return tweet.entities.media;
    },
    imageSrc() {
      if (!this.media) return null;
      return this.media[0].media_url_https;
    },
    hasExternalLink: {
      get() {
        return parseToExternalLinks(this.post.text).length > 0;
      },
    },
    gridStyle() {
      if (!this.isGrid) return {};
      return { grid: true };
    }
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
