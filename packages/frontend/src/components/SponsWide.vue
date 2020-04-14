<template>
  <section class="shadow">
    <a :href="this.current.link" rel="nofollow noopener sponsored" target="_blank">
      <img :src="this.current.src" :alt="this.current.alt" />
      <div class="title oneline-text">{{this.current.title}}</div>
    </a>
  </section>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fdlsoft.dmm.co.jp%2Fdetail%2Fshall_0106%2F&af_id=ujv4gaydzt1z-001&ch=toolbar&ch_id=package_large",
          src:
            "https://pics.dmm.co.jp/digital/pcgame/shall_0106/shall_0106pl.jpg",
          alt: "カスタムオーダーメイド3D2＋ GP―02 16キャラクター対応版（DL版）",
          title:
            "カスタムオーダーメイド3D2＋ GP―02 16キャラクター対応版（DL版）"
        },
        {
          link:
            "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ013149.html",
          src:
            "https://pics.dmm.co.jp/digital/pcgame/shall_0106/shall_0106pl.jpg",
          alt: "カスタムオーダーメイド3D2＋ GP―02 16キャラクター対応版（DL版）",
          title:
            "カスタムオーダーメイド3D2＋ GP―02 16キャラクター対応版（DL版）"
        },
        {
          link:
            "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ013150.html",
          src:
            "https://pics.dmm.co.jp/digital/pcgame/shall_0105/shall_0105pl.jpg",
          alt: "カスタムオーダーメイド3D2＋ GP―02",
          title: "カスタムオーダーメイド3D2＋ GP―02"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708apc13139%2F&af_id=ujv4gaydzt1z-001&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708apc13139/708apc13139pl.jpg",
          alt:
            "カスタムオーダーメイド3D2 キャラクターパック 小動物系ふわふわ妹",
          title: "キャラクターパック 小動物系ふわふわ妹"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss098%2F&af_id=ujv4gaydzt1z-001&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708kiss098/708kiss098pl.jpg",
          alt:
            "カスタムオーダーメイド3D2＆カスタムメイド3D2 キャラクターパック 健康的でスポーティなボクっ娘",
          title: "キャラクターパック 健康的でスポーティなボクっ娘"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss105%2F&af_id=ujv4gaydzt1z-001&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708kiss105/708kiss105pl.jpg",
          alt:
            "カスタムオーダーメイド3D2 キャラクターパック 無口で甘えたがりな文学少女",
          title: "キャラクターパック 無口で甘えたがりな文学少女"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss108%2F&af_id=ujv4gaydzt1z-001&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708kiss108/708kiss108pl.jpg",
          alt:
            "カスタムオーダーメイド3D2 キャラクターパック 天然サディスティックな小悪魔",
          title: "キャラクターパック 天然サディスティックな小悪魔"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss109%2F&af_id=ujv4gaydzt1z-001&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708kiss109/708kiss109pl.jpg",
          alt:
            "カスタムオーダーメイド3D2 キャラクターパック 色気のあるおしとやかなお姉さん",
          title: "キャラクターパック 色気のあるおしとやかなお姉さん"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss110%2F&af_id=ujv4gaydzt1z-001&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708kiss110/708kiss110pl.jpg",
          alt:
            "カスタムオーダーメイド3D2 キャラクターパック 大人の余裕を持つ、頼れるメイド秘書",
          title: "キャラクターパック 大人の余裕を持つ、頼れるメイド秘書"
        }
      ]
    };
  },
  computed: {
    current: {
      get() {
        return this.links[Math.floor(Math.random() * this.links.length)];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  display: flex;
  align-items: flex-end;
  border-radius: 0.25rem 0.25rem 0 0;
}
section {
  width: 100%;
  background: white;
  border-radius: 0.25rem;
}
.title {
  font-size: 14px;
  padding: 0.25rem;
}
</style>