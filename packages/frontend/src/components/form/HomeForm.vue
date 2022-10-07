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
    <el-form-item >
      <el-date-picker
        type="date"
        placeholder="日付"
        v-model="searchOption.to"
        style="width: 100%;"
      ></el-date-picker>
      <!-- <Heatmap :searchOption="searchOption" :passSearchOption="setSearchOption"></Heatmap> -->

      <!-- <el-input
      class="flex-1"
        v-model="searchOption.higherRetweet"
      >
    <span slot="prefix">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9.6 3.7 1.8 5.2a8.3 8.3 0 0 0 11.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8a8.22 8.22 0 0 0-5.2-1.8c-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8zm752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-.6-3.7-1.8-5.2a8.3 8.3 0 0 0-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8 4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-.2-4.4-3.8-8-8.2-8z"></path></svg>
    </span>
      </el-input> -->
    </el-form-item>
    <el-form-item title="リツイート数の下限">
      <!-- https://github.com/atisawd/boxicons/blob/master/LICENSE -->
      <svg class="icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M136 552h63.6c4.4 0 8-3.6 8-8V288.7h528.6v72.6c0 1.9.6 3.7 1.8 5.2a8.3 8.3 0 0 0 11.7 1.4L893 255.4c4.3-5 3.6-10.3 0-13.2L749.7 129.8a8.22 8.22 0 0 0-5.2-1.8c-4.6 0-8.4 3.8-8.4 8.4V209H199.7c-39.5 0-71.7 32.2-71.7 71.8V544c0 4.4 3.6 8 8 8zm752-80h-63.6c-4.4 0-8 3.6-8 8v255.3H287.8v-72.6c0-1.9-.6-3.7-1.8-5.2a8.3 8.3 0 0 0-11.7-1.4L131 768.6c-4.3 5-3.6 10.3 0 13.2l143.3 112.4c1.5 1.2 3.3 1.8 5.2 1.8 4.6 0 8.4-3.8 8.4-8.4V815h536.6c39.5 0 71.7-32.2 71.7-71.8V480c-.2-4.4-3.8-8-8.2-8z"></path></svg>
      <el-input-number
        v-model="searchOption.higherRetweet"
        controls-position="right"
        step="5"
        style="width: 100%;"
        :min="0" :max="500">
        </el-input-number>
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

<style lang="scss">
.el-form-item__content .icon {
  left: 25px;
    position: absolute;
    top: 20px;
    z-index: 10;
    transform: translateX(-100%) translateY(-50%);
    color: #C0C4CC;
}
</style>
