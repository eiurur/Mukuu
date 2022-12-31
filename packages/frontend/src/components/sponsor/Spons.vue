<template>
  <section class="shadow">
    <a :href="this.current.link" rel="nofollow noopener sponsored" target="_blank">
      <img :src="this.current.src" :alt="this.current.alt" itemprop="image" class="target_type" />
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
          src: "//img.dlsite.jp/modpub/images2/work/professional/VJ014000/VJ013149_img_main.jpg",
          alt: "カスタムオーダーメイド3D2＋ GP―02 16キャラクター対応版（DL版）",
          title: "カスタムオーダーメイド3D2＋ GP―02 16キャラクター対応版（DL版）"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ013970.html",
          src: "https://pbs.twimg.com/media/EcqVg49UYAARu-P?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2+ GP-01Fb",
          title: "カスタムオーダーメイド3D2+ GP-01Fb"
        },
        {
          link: "https://amzn.to/35QsVQM",
          src: "https://pbs.twimg.com/media/EiSFht2VoAInBcO?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2+ GP-01&GP-02",
          title: "カスタムオーダーメイド3D2+ GP-01&GP-02"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ013971.html",
          src: "//img.dlsite.jp/modpub/images2/work/professional/VJ014000/VJ013971_img_main.jpg",
          alt: "カスタムオーダーメイド3D2 GP-01＆GP-02＆GP-01 Fb（本体+アペンド）",
          title: "カスタムオーダーメイド3D2 GP-01＆GP-02＆GP-01 Fb（本体+アペンド）"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ014813.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ015000/VJ014813_img_main.webp",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 無口で甘えたがりな文学少女",
          title: "キャラクターパック 無口で甘えたがりな文学少女"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ014875.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ015000/VJ014875_img_main.webp",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 天然サディスティックな小悪魔",
          title: "キャラクターパック 天然サディスティックな小悪魔"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ014943.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ015000/VJ014943_img_main.webp",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 色気のあるおしとやかなお姉さん",
          title: "キャラクターパック 色気のあるおしとやかなお姉さん"
        },
        {
          link: "https://amzn.to/3elFpjY",
          src: "https://pbs.twimg.com/media/E7oz8n9UcAYBChk?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 高飛車で生意気なお嬢様",
          title: "キャラクターパック 高飛車で生意気なお嬢様"
        },
        {
          link: "https://amzn.to/3fiGyfj",
          src: "https://pbs.twimg.com/media/E7oz8npVgAgsVkh?format=jpg&name=medium",
          alt:
            "カスタムオーダーメイド3D2 キャラクターパック 甘々デレデレでご主人様を信仰している妹系幼馴染",
          title: "キャラクターパック 甘々デレデレでご主人様を信仰している妹系幼馴染"
        },
        {
          link: "https://amzn.to/3zY0V9M",
          src: "https://pbs.twimg.com/media/E7oz6tYVoAAhRW7?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2 キャラクターパックEX ド変態ドM",
          title: "キャラクターパック ド変態ドM"
        },
        {
          link: "https://amzn.to/2UZYzIB",
          src: "https://pbs.twimg.com/media/E7oz6t0VkAAKdEP?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2 キャラクターパックEX 腹黒",
          title: "キャラクターパック 腹黒"
        },
        {
          link: "https://amzn.to/3lhIFnm",
          src: "https://pbs.twimg.com/media/E7ozf7WVUAYyNJ1?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2 キャラクターパックEX 気さくでちょっとエッチなお姉さん",
          title: "キャラクターパック 気さくでちょっとエッチなお姉さん"
        },
        {
          link: "https://amzn.to/3igI1Vo",
          src: "https://pbs.twimg.com/media/E7ozV4IVcAgkD2V?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2 キャラクターパックEX 生真面目で甘え下手な淑女",
          title: "キャラクターパック 生真面目で甘え下手な淑女"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ009357.html",
          src:
            "//img.dlsite.jp/modpub/images2/work/professional/VJ010000/VJ009357_img_main.jpg",
          alt: "カスタムメイド3D2",
          title: "カスタムメイド3D2",
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ010035.html",
          src:
            "//img.dlsite.jp/modpub/images2/work/professional/VJ011000/VJ010035_img_main.jpg",
          alt: "カスタムメイド3D2+",
          title: "カスタムメイド3D2+",
        },
        {
          link: "https://amzn.to/2ZzlHfx",
          src:
            "https://pbs.twimg.com/media/Eusd1WIVEAEjYxd?format=jpg&name=medium",
          alt: "CM3D2 ACTパック",
          title: "CM3D2 ACTパック",
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ010552.html",
          src:
            "//img.dlsite.jp/modpub/images2/work/professional/VJ011000/VJ010552_img_main.jpg",
          alt: "カスタムメイド3D2+ ACT.2",
          title: "カスタムメイド3D2+ ACT.2",
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ011675.html",
          src:
            "//img.dlsite.jp/modpub/images2/work/professional/VJ012000/VJ011675_img_main.jpg",
          alt: "カスタムメイド3D2+ ACT.3",
          title: "カスタムメイド3D2+ ACT.3",
        },
        {
          link: "https://amzn.to/3pImS6R",
          src:
            "https://pbs.twimg.com/media/EusgdKeUUAEuNj3?format=jpg&name=medium",
          alt: "CM3D2 カラオケパックVR",
          title: "CM3D2 カラオケパックVR",
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ009680.html",
          src:
            "//img.dlsite.jp/modpub/images2/work/professional/VJ010000/VJ009680_img_main.jpg",
          alt: "カスタムメイド3D2 ビジュアルパック",
          title: "カスタムメイド3D2 ビジュアルパック",
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ013971.html",
          src:
            "//img.dlsite.jp/modpub/images2/work/professional/VJ014000/VJ013971_img_main.jpg",
          alt: "カスタムオーダーメイド3D2 GP-01＆GP-02＆GP-01 Fb（本体+アペンド）",
          title: "カスタムオーダーメイド3D2 GP-01＆GP-02＆GP-01 Fb（本体+アペンド）",
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
a {
  width: 100%;
}
section {
  width: 100%;
  background: white;
  border-radius: 0.25rem;
}
.title {
  font-size: 0.77rem; // 14px(this font-size) / 18px(root font-size)
  padding: 0.25rem;
  text-align: center;
}
</style>
