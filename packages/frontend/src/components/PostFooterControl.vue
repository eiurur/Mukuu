<template>
  <div class="controls">
    <div class="externalLinks">
      <a
        class="item"
        v-for="link in externalLinks"
        :key="link.url"
        :href="link.url"
        target="_blank"
      >
        <ExternalLinkBtn :link="link"></ExternalLinkBtn>
      </a>
    </div>
    <BookmarkBtn :post="post"></BookmarkBtn>
  </div>
</template>

<script>
import BookmarkBtn from "@/components/btn/BookmarkBtn.vue";
import ExternalLinkBtn from "@/components/btn/ExternalLinkBtn.vue";
import { acceptedDomains } from "@mukuu/common/lib/constants";

export default {
  name: "PostFooterControl",
  components: { BookmarkBtn, ExternalLinkBtn },
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

<style lang="scss" scoped>
.controls {
  display: flex;
  div + div {
    padding-left: 1rem;
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
}
.externalLinks {
  display: flex;
  & > a + a {
    margin-left: 1rem;
  }
}
</style>
