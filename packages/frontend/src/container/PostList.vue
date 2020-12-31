<template>
  <section class="postlist-container infinite-list">
    <InfinitePostList ref="postList" v-if="!shouldUsePagination" :limit="5" :searchOption="searchOption" :passPagination="passPagination"></InfinitePostList>
    <PaginatePostList ref="postList" v-if="shouldUsePagination" :limit="20" :searchOption="searchOption" :passPagination="passPagination"></PaginatePostList>
  </section>
</template>

<style lang="scss" scoped>
.postlist-container {
  height: 100%;
}
</style>

<script>
import InfinitePostList from "@/container/InfinitePostList.vue";
import PaginatePostList from "@/container/PaginatePostList.vue";

export default {
  name: "PostList",
  props: ["searchOption", "passPagination"],
  components: {
    InfinitePostList,
    PaginatePostList,
  },
  computed: {
    shouldUsePagination() {
      return this.$store.getters["config/shouldUsePagination"];
    }
  },
  methods: {
    changeCurrentNumber(skip) {
      this.$refs.postList.search({ skip });
    }
  }
};
</script>
