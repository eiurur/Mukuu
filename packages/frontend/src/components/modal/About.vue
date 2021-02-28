<template>
  <el-dialog title :visible.sync="isOpen">
    <div class="about scrollable">
      <section class>
        <h1>このサイトについて</h1>
        <section>
          <p>
            Mukuu は
            <a href="http://com3d2.jp/" target="_blank" rel="noreferrer">カスタムオーダーメイド3D2(COM3D2)</a>のMODの検索を効率化するためのサイトです。
          </p>
          <p>気になったMODの製作者様の過去作品を辿る手段が煩雑だった問題を解消するために作りました。</p>
          <p>
            収集および表示対象は ux.getuploader.com / drive.google.com / mega.nz
            のいずれかを含むツイートとなっています。
          </p>
        </section>
        <h1>外部リンク</h1>
        <section>
          <p>
            更新通知/要望対応/不具合報告など:
            <a href="https://twitter.com/fsns_" target="_blank" rel="noreferrer">Twitter</a>
          </p>
          <p>
            ソースコード:
            <a href="https://github.com/eiurur/Mukuu" target="_blank" rel="noreferrer">GitHub</a>
          </p>
        </section>
      </section>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.about {
  & section {
    padding-bottom: 1rem;
  }
}
</style>

<script>
export default {
  name: "About",
  computed: {
    isOpen: {
      get() {
        return this.$store.getters["modal/getAbout"];
      },
      set() {
        this.$store.dispatch("modal/updateAbout");
      },
    },
  },
};
</script>
