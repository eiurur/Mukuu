<template>
  <div id="app">
    <aside class="el-aside">
      <el-menu :router="true" :default-active="$route.path" class="el-menu-vertical">
        <el-menu-item index="/" :route="{name: 'home'}">
          <i class="el-icon-s-home"></i>
          <span slot="title">Home</span>
        </el-menu-item>
        <el-menu-item index="/users" :route="{name: 'users'}">
          <i class="el-icon-user-solid"></i>
          <span slot="title">Users</span>
        </el-menu-item>
        <el-menu-item index="/watch" :route="{name: 'watch'}" disabled>
          <i class="el-icon-view"></i>
          <span slot="title">Watch</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <i class="el-icon-info"></i>
          <span slot="title">About</span>
        </el-menu-item>
      </el-menu>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import "./styles.scss";

:root {
  --main-color: black;
}
main {
  width: 100%;
  padding: 1rem;
}
.el-aside {
  background: white;
  width: 128px;
}
.el-menu-vertical {
  width: 128px;
  height: 100%;
  min-height: 400px;
}
.el-divider__text {
  background: transparent;
}
/* TODO: scope用のラッパクラスの配下に対象を限定する */
.el-select {
  width: 100%;
}
.el-input {
  width: 100%;
}

body,
html,
#app {
  height: 100%;
  margin: 0;
  background: #eee;
  color: #000;
  overflow: hidden;
}
#app {
  font-family: YuGothic, "Yu Gothic", "游ゴシック体", "游ゴシック",
    "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo",
    "MSPゴシック", "Osaka", "MS PGothic", "Arial", "Helvetica", "Verdana",
    "sans-serif";
  font-size: 18px;
  font-weight: 600;
  margin-top: 0;
  line-height: 1.8;
  display: flex;
  /* color: #2c3e50; */
}
#nav {
  padding: 0 0 30px;
}
* {
  box-sizing: border-box;
}
ul {
  list-style: none;
  margin: 0;
  padding-left: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0;
}

a,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s ease all;
}
a.disabled {
  text-decoration: none;
  pointer-events: none;
  cursor: default;
}
a {
  color: #179afc;
  transition: color 0.3s;
  &:hover {
    color: #409eff;
    // color: #37d3db;
  }
}

img:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  background: #ebebeb
    url("https://via.placeholder.com/300/ebebeb/FFFFFF?text=Mukuu") no-repeat
    center;
  color: transparent;
}

/* extend property */
::-webkit-scrollbar {
  background-color: #f4f4f4;
  width: 16px;
}

::-webkit-scrollbar-track {
  background-color: #f4f4f4;
}
::-webkit-scrollbar-track:hover {
  background-color: #f4f4f4;
}

::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 8px;
  border: 5px solid #f4f4f4;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #a0a0a5;
  border: 4px solid #f4f4f4;
}

::-webkit-scrollbar-button {
  display: none;
}

/* */
.medium-zoom-image--opened {
  width: auto !important;
}

/** */

.infinite-list {
  position: relative;
  height: 100vh;
  margin: -1rem 0;
  padding: 0.5rem 0;
  list-style: none;
  overflow: auto;
  margin-bottom: -4rem;
}
.el-loading-spinner {
  margin-top: -1rem;
}
.el-loading-mask {
  border-radius: 2rem;
  margin: 1rem 0;
}
</style>
