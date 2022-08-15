<template>
  <div id="app">
    <aside class="el-aside">
      <Menu></Menu>
    </aside>
    <main v-cloak>
      <router-view />
    </main>
    <About></About>
    <Config></Config>
  </div>
</template>

<script>
import Menu from "@/container/Menu.vue";
import About from "@/components/modal/About.vue";
import Config from "@/components/modal/Config.vue";

export default {
  name: "App",
  components: {
    Menu,
    About,
    Config,
  },
};
</script>
<style lang="scss">
@import "@/styles/index.scss";

main {
  width: 100%;
  padding: 0.5rem;
}
main img {
  content-visibility: auto;
}
</style>
