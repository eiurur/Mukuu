<template>
  <el-dialog title :visible.sync="isOpen">
    <div class="about scrollable">
      <section class>
        <h1>このサイトについて</h1>
        <section>
          <p>
            Mukuu は
            <BlankLink href="http://com3d2.jp/" text="カスタムオーダーメイド3D2(COM3D2)"></BlankLink>および
            <BlankLink href="https://www.kisskiss.tv/cm3d2/cm3d2.php" text="カスタムメイド3D2(CM3D2)"></BlankLink>のMODの検索を効率化するためのサイトです。
          </p>
          <p>気になったMODの製作者様の過去作品を辿る手段が煩雑だった問題を解消するために作りました。</p>
          <p>
            収集および表示対象は getuploader.com / drive.google.com / mega.nz / github.com
            のいずれかを含むツイートとなっています。
          </p>
          <p>
            ※ 当サイトはアフィリエイト広告を利用しています。
          </p>
        </section>
        <h1>外部リンク</h1>
        <section>
          <p>
            更新通知/要望対応/不具合報告など:
            <BlankLink href="https://twitter.com/fsns_" text="Twitter"></BlankLink>
          </p>
          <p>
            ソースコード:
            <BlankLink href="https://github.com/eiurur/Mukuu" text="GitHub"></BlankLink>
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
import BlankLink from "@/components/BlankLink.vue";

export default {
  name: "About",
  components: { BlankLink, },
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
