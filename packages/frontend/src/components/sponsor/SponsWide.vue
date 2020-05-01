<template>
  <section class="shadow">
    <a :href="this.current.link" rel="nofollow noopener sponsored" target="_blank">
      <img :src="this.current.src" :alt="this.current.alt" />
      <div class="title oneline-text">{{ this.current.title }}</div>
    </a>
  </section>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ013149.html",
          src: "https://pics.dmm.co.jp/digital/pcgame/shall_0106/shall_0106pl.jpg",
          alt: "カスタムオーダーメイド3D2＋ GP―02 16キャラクター対応版（DL版）",
          title: "カスタムオーダーメイド3D2＋ GP―02 16キャラクター対応版（DL版）"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ013150.html",
          src: "https://pics.dmm.co.jp/digital/pcgame/shall_0105/shall_0105pl.jpg",
          alt: "カスタムオーダーメイド3D2＋ GP―02",
          title: "カスタムオーダーメイド3D2＋ GP―02"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708apc13139%2F&af_id=ujv4gaydzt1z-002&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708apc13139/708apc13139pl.jpg",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 小動物系ふわふわ妹",
          title: "キャラクターパック 小動物系ふわふわ妹"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss098%2F&af_id=ujv4gaydzt1z-002&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708kiss098/708kiss098pl.jpg",
          alt:
            "カスタムオーダーメイド3D2＆カスタムメイド3D2 キャラクターパック 健康的でスポーティなボクっ娘",
          title: "キャラクターパック 健康的でスポーティなボクっ娘"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss105%2F&af_id=ujv4gaydzt1z-002&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708kiss105/708kiss105pl.jpg",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 無口で甘えたがりな文学少女",
          title: "キャラクターパック 無口で甘えたがりな文学少女"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss108%2F&af_id=ujv4gaydzt1z-002&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708kiss108/708kiss108pl.jpg",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 天然サディスティックな小悪魔",
          title: "キャラクターパック 天然サディスティックな小悪魔"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss109%2F&af_id=ujv4gaydzt1z-002&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708kiss109/708kiss109pl.jpg",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 色気のあるおしとやかなお姉さん",
          title: "キャラクターパック 色気のあるおしとやかなお姉さん"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss110%2F&af_id=ujv4gaydzt1z-002&ch=toolbar&ch_id=link",
          src: "https://pics.dmm.co.jp/mono/game/708kiss110/708kiss110pl.jpg",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 大人の余裕を持つ、頼れるメイド秘書",
          title: "キャラクターパック 大人の余裕を持つ、頼れるメイド秘書"
        },

        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss095%2F&af_id=ujv4gaydzt1z-002&ch=toolbar&ch_id=link",
          src: "https://pbs.twimg.com/media/EViiA8UU4AA77RU?format=jpg&name=large",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 病的な程一途な大和撫子",
          title: "キャラクターパック 病的な程一途な大和撫子"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss96%2F&af_id=ujv4gaydzt1z-002&ch=toolbar&ch_id=link",
          src: "https://pbs.twimg.com/media/EViiA84U8AYLnrH?format=jpg&name=large",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 母性的なお姉ちゃん",
          title: "キャラクターパック 母性的なお姉ちゃん"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss101%2F&af_id=ujv4gaydzt1z-002&ch=toolbar&ch_id=link",
          src: "https://pbs.twimg.com/media/EViiA9aUMAEbSrV?format=jpg&name=large",
          alt: "カスタムオーダーメイド3D2 キャラクターパック M心を刺激する、ドS女王様",
          title: "キャラクターパック M心を刺激する、ドS女王様"
        },

        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss112%2F&af_id=ujv4gaydzt1z-002&ch=toolbar&ch_id=link",
          src: "https://pbs.twimg.com/media/EVihLFcUYAULk9m?format=jpg&name=large",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 警戒心の強い無愛想",
          title: "キャラクターパック 警戒心の強い無愛想"
        },
        {
          link:
            "https://al.dmm.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fpcgame%2F-%2Fdetail%2F%3D%2Fcid%3D708kiss113%2F&af_id=ujv4gaydzt1z-002&ch=toolbar&ch_id=link",
          src: "https://pbs.twimg.com/media/EVihLFcUEAAqp_d?format=jpg&name=large",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 高飛車で生意気なお嬢様",
          title: "キャラクターパック 高飛車で生意気なお嬢様"
        },
        {
          link: "https://dl.s-court.me/item.php?iid=212",
          src: "https://pbs.twimg.com/media/EVihLFYUYAEthym?format=jpg&name=large",
          alt:
            "カスタムオーダーメイド3D2 キャラクターパック 甘々デレデレでご主人様を信仰している妹系幼馴染",
          title: "キャラクターパック 甘々デレデレでご主人様を信仰している妹系幼馴染"
        },
        {
          link: "https://dl.s-court.me/item.php?iid=225",
          src: "https://pbs.twimg.com/media/EV0oltdUEAAPiGa?format=jpg&name=large",
          alt: "COM3D2 カラオケパックVR VOL.3",
          title: "COM3D2 カラオケパックVR VOL.3"
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
  min-height: 180px;
  object-fit: cover;
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
