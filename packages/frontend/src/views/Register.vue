<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <div>
        <el-form ref="form" :model="form" @submit.native.prevent="onSubmit">
          <el-form-item>
            <el-input
              placeholder="ツイートID"
              prefix-icon="el-icon-edit"
              :clearable="true"
              v-model="form.tweetID"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="12">
      <div v-for="result in results" :key="result.data.id_str">
        <p>{{result.data.id_str}}</p>
        <p>{{result.data.full_text}}</p>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
section + section {
  margin-top: 1rem;
}
</style>

<script>
import post from "../api/post";

export default {
  name: "register",
  data() {
    return {
      form: {
        tweetID: ""
      },
      results: []
    };
  },
  components: {},
  methods: {
    async onSubmit() {
      if (this.form.tweetID === "") {
        return;
      }
      const params = { tweetID: this.form.tweetID };
      try {
        const result = await post.register({
          data: params
        });
        this.results.push(result);
      } catch (e) {
        this.$message.error(JSON.stringify(e, undefined, 4));
      }
    }
  }
};
</script>
