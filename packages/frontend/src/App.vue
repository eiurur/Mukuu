<template>
  <div id="app">
    <aside class="el-aside">
      <el-menu :router="true" :default-active="$route.path" class="el-menu-vertical">
        <el-menu-item index="/" :route="{ name: 'home' }">
          <i class="el-icon-s-home"></i>
          <span slot="title">Home</span>
        </el-menu-item>
        <el-menu-item index="/users" :route="{ name: 'users' }">
          <i class="el-icon-user-solid"></i>
          <span slot="title">Users</span>
        </el-menu-item>
        <el-menu-item index="/watch" :route="{ name: 'watch' }">
          <i class="el-icon-view"></i>
          <span slot="title">Watch</span>
        </el-menu-item>
        <el-menu-item index="/bookmark" :route="{ name: 'bookmark' }">
          <i class="el-icon-collection-tag"></i>
          <span slot="title">Bukuma</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <i class="el-icon-info"></i>
          <span slot="title">About</span>
        </el-menu-item>
        <el-menu-item>
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            class="twitter-share-button"
            data-text="Mukuu - COM3D2 MOD検索サービス"
            data-url="https://mukuu.herokuapp.com/"
            data-hashtags="COM3D2"
            data-show-count="false"
          >Tweet</a>
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
  padding: 0.5rem;
}

*:focus {
  outline: none;
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
.center {
  height: 100%;
  display: flex;
  flex-direction: column; /* 子要素をflexboxにより縦方向に揃える */
  justify-content: center; /* 子要素をflexboxにより中央に配置する */
  align-items: center; /* 子要素をflexboxにより中央に配置する */
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

.between {
  display: flex;
  justify-content: space-between;
}
.prefix-icon {
  width: 25px;
}
.infinite-list {
  position: relative;
  flex-grow: 1;
  list-style: none;
  overflow: auto;
  min-height: 0;
}
.infinite-list > .padding {
  padding-right: 0.5rem;
}
.el-loading-spinner {
  margin-top: -1rem;
}
.el-loading-mask {
  border-radius: 2rem;
  margin: 1rem 0;
}
.el-row {
  display: flex;
  height: calc(100vh - 1rem);
  // height: 100vh;
  // padding: 0.5rem 0;
  // margin: -1rem 0;
}
.el-col {
  flex-direction: column;
}
.el-col:not(:first-of-type):not(:last-of-type) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
[class*="el-col-"] {
  flex-grow: 1;
  display: flex;
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
.el-menu-item:last-of-type {
  position: absolute;
  cursor: initial;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  &:hover,
  &:focus {
    background: none;
  }
}
.el-divider__text {
  background: #eee;
}
/* TODO: scope用のラッパクラスの配下に対象を限定する */
.el-select {
  width: 100%;
}
.el-input {
  width: 100%;
}
.el-form-item {
  margin-bottom: 1rem;
}
</style>
