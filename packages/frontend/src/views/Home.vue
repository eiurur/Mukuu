<template>
  <el-row :gutter="20">
    <el-col :span="4" class="hidden-smartphone hidden-tablet">
      <div>
        <HomeForm :searchOption="searchOption"></HomeForm>
        <el-form :inline="true" @submit.native.prevent size="mini" class="between">
          <el-form-item>
            <el-button type="danger" icon="el-icon-refresh" @click="clear">クリア</el-button>
          </el-form-item>
          <el-form-item>
            <Counter
              :current="current"
              :total="total"
              @changeCurrentNumber="changeCurrentNumber"
            ></Counter>
          </el-form-item>
        </el-form>
      </div>
      <SearchHistory :passSearchWord="passSearchWord"></SearchHistory>
      <SponsWide></SponsWide>
    </el-col>
    <el-col :span="12">
      <PostList ref="postList" :searchOption="searchOption" :preSkip="preSkip" :passPagination="passPagination"></PostList>
    </el-col>
    <el-col :span="8" class="hidden-smartphone hidden-tablet">
      <UserDrawer></UserDrawer>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
</style>

<script>
import SearchHistory from "@/container/SearchHistory.vue";
import UserDrawer from "@/container/UserDrawer.vue";
import PostList from "@/container/PostList.vue";

import HomeForm from "@/components/form/HomeForm.vue";
import Counter from "@/components/Counter.vue";
import SponsWide from "@/components/sponsor/SponsWide.vue";

export default {
  name: "home",
  data() {
    return {
      current: 0,
      total: 0,
      preSkip: 0,
      searchOption: {
        searchWord: "",
        sort: "createdAtDesc",
        to: "",
        higherRetweet: 5
      },
    };
  },
  components: {
    Counter,
    HomeForm,
    SearchHistory,
    SponsWide,
    PostList,
    UserDrawer
  },
  created() {
    this.restoreSearchOptionFromQueryString();
  },
  methods: {
    clear() {
      this.searchOption = {
        searchWord: "",
        to: "",
        sort: "createdAtDesc",
        higherRetweet: 5,
      };
      this.preSkip = 0;
    },
    restoreSearchOptionFromQueryString() {
      const { searchWord, to, sort, higherRetweet, skip } = this.$route.query;
      this.preSkip = skip ? Number(skip) : 0;
      this.searchOption = {
        searchWord: searchWord || "",
        to: !to ? "" : this.$dayjs(to).format("YYYY-MM-DD"),
        sort: sort || "createdAtDesc",
        higherRetweet: higherRetweet === "" || higherRetweet === undefined ? 5 : Number(higherRetweet),
      };
    },
    passSearchWord(searchWord) {
      this.searchOption.searchWord = searchWord;
    },
    setSearchOption(searchOption) {
      this.searchOption = searchOption;
    },
    changeCurrentNumber(skip) {
      this.$refs.postList.changeCurrentNumber(skip);
    },
    passPagination({ current, total }) {
      this.current = current;
      this.total = total;
    }
  }
};
</script>
