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
    <el-menu-item index="about">
      <i class="el-icon-info"></i>
      <span slot="title">About</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Menu",

  data() {
    return {
      activeIndex: ""
    };
  },
  mounted() {
    this.activeIndex = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
.sb {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  border-radius: 4px;
  bottom: 0;
  a {
    width: 100%;
  }
  img {
    width: 100%;
    display: flex;
    align-items: flex-end;
  }
}
</style>
