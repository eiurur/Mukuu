<template>
  <div id="app">
    <aside class="el-aside">
      <Menu></Menu>
    </aside>
    <main v-cloak>
      <router-view />
    </main>
  </div>
</template>

<script>
import Menu from "@/container/Menu.vue";

export default {
  name: "App",
  components: {
    Menu
  }
};
</script>
<style lang="scss">
@import "@/styles/index.scss";

main {
  width: 100%;
  padding: 0.5rem;
}
</style>
