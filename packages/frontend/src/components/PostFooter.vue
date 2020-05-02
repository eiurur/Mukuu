<template>
  <div class="footer">
    <div class="attributes">
      <div class="item retweet">
        <span>{{ post.retweetCount }}</span>
      </div>
      <div class="item favorite">
        <span>{{ post.favoriteCount }}</span>
      </div>
    </div>
    <div class="controls">
      <div class="externalLinks">
        <a
          class="item"
          v-for="link in externalLinks"
          :key="link.url"
          :href="link.url"
          target="_blank"
        >
          <el-tooltip placement="top" effect="light">
            <div slot="content">{{ link.url }}</div>
            <span>
              <i class="el-icon-link"></i>
              {{ link.label }}
            </span>
          </el-tooltip>
        </a>
      </div>
      <BookmarkBtn :post="post"></BookmarkBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  .controls {
    display: flex;
    div + div {
      padding-left: 1rem;
    }
  }

  & .item {
    display: block;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border-radius: 4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    & > span {
      padding: 0rem 1rem;
    }
  }
  & .attributes {
    display: flex;

    & > div + div {
      margin-left: 1rem;
    }
    & .retweet {
      background: rgba(11, 197, 123, 0.8);
      & > span:after {
        content: "RT";
        font-size: 60%;
        padding-left: 0.5rem;
      }
    }
    & .favorite {
      background: rgba(232, 28, 79, 0.8);
      & > span:after {
        content: "likes";
        font-size: 60%;
        padding-left: 0.5rem;
      }
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
import BookmarkBtn from "@/components/btn/BookmarkBtn.vue";
import { acceptedDomains } from "@mukuu/common/lib/constants";

export default {
  name: "PostFooter",
  components: { BookmarkBtn },
  props: ["post"],
  methods: {},
  computed: {
    externalLinks: {
      get() {
        return this.post.text
          .split(/\r\n|\n|\s/)
          .filter(word => acceptedDomains.some(domain => word.indexOf(domain) !== -1))
          .map(url => {
            const match = url.match(/(https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[\w-./?%&=]*))/);
            if (!match) return null;
            return match[1];
          })
          .filter(url => !!url)
          .map(url => {
            const u = new URL(url);
            return {
              url: u.href,
              hostname: u.hostname,
              label: u.hostname.split(".")[0]
            };
          });
      }
    }
  }
};
</script>
