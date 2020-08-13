<template>
  <div class="controls">
    <div class="externalLinks">
      <ExternalLinkBtn
        v-for="link in externalLinks"
        :key="link.url"
        :link="link"
        :useTooltip="true"
      ></ExternalLinkBtn>
    </div>
    <BookmarkBtn :post="post" :useTooltip="true"></BookmarkBtn>
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
          .filter((word) =>
            acceptedDomains.some((domain) => word.indexOf(domain) !== -1)
          )
          .map((url) => {
            const match = url.match(
              /(https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[\w-./?%&=#!]*))/
            );
            if (!match) return null;
            return match[1];
          })
          .filter((url) => !!url)
          .map((url) => {
            const u = new URL(url);
            return {
              url: u.href,
              hostname: u.hostname,
              label: u.hostname.split(".")[0],
            };
          });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  margin-top: 0.5rem;
  div + div {
    padding-left: 1rem;
  }
}
.externalLinks {
  display: flex;
  & > a + a {
    margin-left: 1rem;
  }
}
</style>
