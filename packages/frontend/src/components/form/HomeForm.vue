<template>
  <el-form ref="form" :model="searchOption">
    <el-form-item>
      <el-input
        placeholder="検索"
        prefix-icon="el-icon-search"
        :clearable="true"
        @blur="registerHistory"
        v-model="searchOption.searchWord"
      >
        <el-button slot="append" icon="el-icon-magic-stick" @click="searchRandom"  :loading="loading" ></el-button>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="searchOption.sort" placeholder="please select sort type">
        <template slot="prefix">
          <i class="el-icon-sort prefix-icon"></i>
        </template>
        <el-option label="投稿日時が新しい順" value="createdAtDesc"></el-option>
        <el-option label="投稿日時が古い順" value="createdAtAsc"></el-option>
        <el-option label="リツイートが多い順" value="retweetCountDesc"></el-option>
        <el-option label="お気に入りが多い順" value="favoriteCountDesc"></el-option>
        <el-option label="人気順" value="totalCountDesc"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-date-picker
        type="date"
        placeholder="日付"
        v-model="searchOption.to"
        style="width: 100%;"
      ></el-date-picker>
      <!-- <Heatmap :searchOption="searchOption" :passSearchOption="setSearchOption"></Heatmap> -->
    </el-form-item>
  </el-form>
</template>

<script>
import history from "@/api/history";

export default {
  name: "HomeForm",
  props: ["searchOption"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async fetchWord() {
      const { data } = await history.random("search", { limit: 1 });
      if (data && data.length) {
        return data[0];
      }
      const ret = await this.fetchWord();
      return ret;
    },
    async searchRandom() {
      if (this.loading) return;
      this.loading = true;
      const { word, postCount } = await this.fetchWord();
      this.searchOption.searchWord = word;
      this.$store.dispatch("searchHistory/addSearchWord", { word, postCount });
      this.$store.dispatch("saveLocalStorage");
      this.loading = false;
    },
    async registerHistory(e) {
      if (!e.target.value) return;
      const { data } = await history.register("search", {
        word: e.target.value
      });
      const { word, postCount } = data;
      this.$store.dispatch("searchHistory/addSearchWord", { word, postCount });
      this.$store.dispatch("saveLocalStorage");
    }
  }
};
</script>

<style></style>
