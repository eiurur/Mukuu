<template>
  <div class="reply-container" v-if="reply.text">
    <article class="post">
      <div>
        <PostIcon :post="post" :useDrawer="useDrawer"></PostIcon>
        <div class="reply-connection"></div>
      </div>
      <div class="reply">
        <div class="header">
          <div class="profile">
            <div class="names">
              <span class="name">{{ post.postedBy.name }}</span>
              <ScreenName :screenName="post.postedBy.screenName"></ScreenName>
            </div>
          </div>
          <div class="createdAt">
            <a :href="post.sourceUrl" target="_blank">{{ post.createdAt }}</a>
          </div>
        </div>
        <div class="main">
          <img
            v-lazy="`${media}?format=jpg&name=medium`"
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
.reply {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  padding-bottom: 1rem;
  background: white;
  width: 100%;
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
    margin-left: 1rem;
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
    white-space: pre-wrap;
    width: 100%;
  }
}
</style>
<script>
import mediumZoom from "medium-zoom";
import ScreenName from "@/components/ScreenName.vue";
import PostIcon from "@/components/PostIcon.vue";
import { parseToExternalLinks } from "@/plugins/tweet";
import { expandRecusively } from "@/plugins/post";

export default {
  name: "InReply",
  components: { PostIcon, ScreenName },
  props: ["post", "useDrawer"],
  computed: {
    postedBy() {
      const tweet = JSON.parse(this.post.inReply);
      const { user } = tweet;
      if (!user) return {};
      return {
        idStr: user.id_str,
        name: user.name,
        screenName: user.screen_name,
        url: user.url,
        description: user.description,
        protected: user.protected,
        followersCount: user.followers_count,
        friendsCount: user.friends_count,
        favouritesCount: user.favourites_count,
        statusesCount: user.statuses_count,
        profileBackgroundColor: user.profile_background_color,
        profileBackgroundImageUrl: user.profile_background_image_url_https,
        profileImageUrl: user.profile_image_url_https,
        profileBannerUrl: user.profile_banner_url,
        createdAt: this.$dayjs(user.created_at.replace('+0000', '')).valueOf(),
        updatedAt: Date.now(),
      };
    },
    reply() {
      const tweet = JSON.parse(this.post.inReply);
      if (!tweet) return {};
      const post = {
        idStr: tweet.id_str,
        text: tweet.full_text,
        entities: JSON.stringify(tweet.extended_entities || tweet.entities),
        favoriteCount: tweet.favorite_count,
        retweetCount: tweet.retweet_count,
        totalCount: tweet.favorite_count + tweet.retweet_count,
        postedBy: this.postedBy,
        createdAt: this.$dayjs(tweet.created_at.replace('+0000', '')).valueOf(),
        updatedAt: Date.now(),
      };
      return expandRecusively(post);
    },
    media() {
      const tweet = JSON.parse(this.post.inReply);
      if (!tweet.entities) return null;
      if (!tweet.entities.media) return null;
      return tweet.entities.media[0].media_url_https;
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
