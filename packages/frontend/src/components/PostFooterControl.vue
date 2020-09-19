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
import { parseToExternalLinks } from "@/plugins/tweet";

export default {
  name: "PostFooterControl",
  components: { BookmarkBtn, ExternalLinkBtn },
  props: ["post"],
  methods: {},
  computed: {
    externalLinks: {
      get() {
        return parseToExternalLinks(this.post.text);
      }
    }
  }
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
