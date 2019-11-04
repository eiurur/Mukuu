<template>
  <article class="post">
    <div class="text-container">
      <div class="user">
        <div class="icon" @click="openUserDrawer(post.postedBy)">
          <img :src="post.postedBy.profileImageUrl" />
        </div>
        <div class="profile">
          <div class="names">
            <span class="name">{{post.postedBy.name}}</span>
            <span class="screen-name">@{{post.postedBy.screenName}}</span>
          </div>
          <div class="createdAt">
            <a :href="post.sourceUrl" target="_blank">{{post.createdAt}}</a>
          </div>
        </div>
      </div>
      <div class="text" v-html="$activateLink(post.text)"></div>
    </div>
    <div v-if="post.entities.media" class="images">
      <img
        :key="media.id_str"
        v-for="media in post.entities.media"
        :src="`${media.media_url}:small`"
        class="original"
        data-zoomable
      />
    </div>
    <div class="control">
      <div class="attributes">
        <div class="item retweet">
          <span>{{post.retweetCount}}</span>
          <span class="suffix">RT</span>
        </div>
        <div class="item favorite">
          <span>{{post.favoriteCount}}</span>
          <span class="suffix">likes</span>
        </div>
      </div>
      <div class="externalLinks">
        <a
          class="item"
          v-for="link in externalLinks"
          :key="link.url"
          :href="link.url"
          target="_blank"
        >
          <span>
            <i class="el-icon-link"></i>
            {{link.label}}
          </span>
        </a>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: row;
}
.profile {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  & .names {
    display: flex;
    flex-direction: column;
    & .screen-name {
      opacity: 0.5;
    }
    & .createdAt {
      a {
        color: #8899a6;
      }
      cursor: pointer;
    }
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
    padding-top: 1rem;
  }
  & + .post {
    margin-top: 1rem;
  }
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }

  & .createdAt a {
    color: #bbb;
    &:hover {
      color: #179afc;
    }
  }
  .text-container {
    .user {
      .icon {
        height: 48px;
        width: 48px;
        background: rgba(0, 0, 0, 0.12);
        border-radius: 100%;
        cursor: pointer;
        img {
          border-radius: 100%;
        }
      }
    }
    .text {
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

.images {
  display: flex;
  img {
    width: auto;
    object-fit: cover;
    height: 240px;
    // object-fit: cover;
    max-width: 25%;
    border-radius: 0.5rem;
  }

  & > img + img {
    padding-left: 1rem;
  }
}
.control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & .item {
    display: block;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border-radius: 4rem;
    padding: 0rem 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & .suffix {
    font-size: 0.75rem;
    padding-left: 0.5rem;
  }
  & .attributes {
    display: flex;

    & > div + div {
      margin-left: 1rem;
    }
    & .retweet {
      background: rgba(11, 197, 123, 0.8);
    }
    & .favorite {
      background: rgba(232, 28, 79, 0.8);
    }
  }
  & .externalLinks {
    display: flex;
    & > a + a {
      margin-left: 1rem;
    }
  }
}
</style>

<script>
import mediumZoom from "medium-zoom";

export default {
  name: "Post",
  props: ["post", "useDrawer"],
  methods: {
    openUserDrawer(postedBy) {
      if (!postedBy || !this.useDrawer) return;
      const payload = Object.assign({}, postedBy);
      this.$store.dispatch("drawer/initialize", payload);
    }
  },
  computed: {
    externalLinks: {
      get() {
        return this.post.text
          .split(/\r\n|\n|\s/)
          .filter(
            word => word.indexOf("ux.getuploader.com") !== -1
              || word.indexOf("drive.google.com") !== -1
          )
          .map((url) => {
            const match = url.match(
              /(https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[\w-./?%&=]*))/
            );
            return match[1];
          })
          .map((url) => {
            const u = new URL(url);
            return {
              url: u.href,
              hostname: u.hostname,
              label: u.hostname.split(".")[0]
            };
          });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const images = Array.from(
        document.querySelectorAll("[data-zoomable]:not(.medium-zoom-image)")
      );
      images.map(
        img => (img.onload = () => mediumZoom(img, { background: "#000" }))
      );
    });
  }
};
</script>