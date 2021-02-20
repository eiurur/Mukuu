<template>
  <Quote
    mediaType="grid"
    :useDrawer="true"
    :isQuoted="true"
    :post="quotedStatus"></Quote>
</template>

<style lang="scss" scoped>

</style>
<script>
import Quote from "@/components/Quote.vue";

export default {
  name: "QuotedStatus",
  components: {
    Quote,
  },
  props: ["post"],
  computed: {
    quotedStatus() {
      return this.post.quotedStatuses[0];
    }
  }
};
</script>
