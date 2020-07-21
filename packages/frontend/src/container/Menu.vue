<template>
  <el-menu
    :router="true"
    :default-active="activeIndex"
    :mode="$mq == 'sm' ? 'horizontal' : 'vertical'"
  >
    <el-menu-item index="home" :route="{ name: 'home' }">
      <i class="el-icon-s-home"></i>
      <span slot="title">Home</span>
    </el-menu-item>
    <el-menu-item index="users" :route="{ name: 'users' }">
      <i class="el-icon-user-solid"></i>
      <span slot="title">Users</span>
    </el-menu-item>
    <el-menu-item index="watch" :route="{ name: 'watch' }">
      <i class="el-icon-view"></i>
      <span slot="title">Watch</span>
    </el-menu-item>
    <el-menu-item index="bookmark" :route="{ name: 'bookmark' }">
      <i class="el-icon-collection-tag"></i>
      <span slot="title">Bukuma</span>
    </el-menu-item>
    <el-menu-item @click="updateAboutModal">
      <i class="el-icon-info"></i>
      <span slot="title">About</span>
    </el-menu-item>
    <el-menu-item>
      <TweetBtn></TweetBtn>
    </el-menu-item>
  </el-menu>
</template>

<script>
import TweetBtn from "@/components/btn/TweetBtn.vue";

export default {
  name: "Menu",
  components: {
    TweetBtn
  },
  data() {
    return {
      activeIndex: ""
    };
  },
  mounted() {
    this.activeIndex = this.$route.name;
  },
  methods: {
    updateAboutModal() {
      this.$store.dispatch("modal/updateAbout");
    }
  }
};
</script>

<style lang="scss" scoped></style>
