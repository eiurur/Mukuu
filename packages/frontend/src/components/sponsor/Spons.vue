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
          alt: "COM3D2＋ GP―02 16キャラクター対応版（DL版）",
          title: "COM3D2＋ GP―02 16キャラクター対応版（DL版）"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ013970.html",
          src: "https://pbs.twimg.com/media/EcqVg49UYAARu-P?format=jpg&name=medium",
          alt: "COM3D2+ GP-01Fb",
          title: "COM3D2+ GP-01Fb"
        },
        {
          link: "https://amzn.to/35QsVQM",
          src: "https://pbs.twimg.com/media/EiSFht2VoAInBcO?format=jpg&name=medium",
          alt: "COM3D2+ GP-01&GP-02",
          title: "COM3D2+ GP-01&GP-02"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ013971.html",
          src: "//img.dlsite.jp/modpub/images2/work/professional/VJ014000/VJ013971_img_main.jpg",
          alt: "COM3D2 GP-01＆GP-02＆GP-01 Fb（本体+アペンド）",
          title: "COM3D2 GP-01＆GP-02＆GP-01 Fb（本体+アペンド）"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01000324.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ01001000/VJ01000324_img_main.jpg",
          alt: "COM3D2＆2.5+ X1",
          title: "COM3D2＆2.5+ X1"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01001060.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ01002000/VJ01001060_img_main.webp",
          alt: "COM3D2＆2.5+ X1+",
          title: "COM3D2＆2.5+ X1+"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01000493.html",
          src: "https://pbs.twimg.com/media/GZDKMsga4AAh8EG?format=jpg&name=small",
          alt: "COM3D2＆2.5+ X1改",
          title: "COM3D2＆2.5+ X1改"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01001155.html",
          src: "https://pbs.twimg.com/media/GZDKMsgbUAE5Aqm?format=jpg&name=medium",
          alt: "COM3D2＆2.5+ X1改+",
          title: "COM3D2＆2.5+ X1改+"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000612.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ015000/VJ014813_img_main.webp",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 無口で甘えたがりな文学少女",
          title: "キャラクターパック GP対応版 無口で甘えたがりな文学少女"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000613.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ015000/VJ014875_img_main.webp",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 天然サディスティックな小悪魔",
          title: "キャラクターパック GP対応版 天然サディスティックな小悪魔"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01002878.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ01003000/VJ01002878_img_main.webp",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 病的な程一途な大和撫子",
          title: "キャラクターパック GP対応版 病的な程一途な大和撫子"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01000614.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ015000/VJ014943_img_main.webp",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 色気のあるおしとやかなお姉さん",
          title: "キャラクターパック GP対応版 色気のあるおしとやかなお姉さん"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/t/link/work/aid/maidimaid/id/VJ01002693.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ01003000/VJ01002693_img_main.webp",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 母性的なお姉ちゃん",
          title: "キャラクターパック GP対応版 母性的なお姉ちゃん"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000618.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ01001000/VJ01000618_img_main.webp",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 M心を刺激する、ドS女王様",
          title: "キャラクターパック GP対応版 M心を刺激する、ドS女王様"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000617.html",
          src: "https://pbs.twimg.com/media/E7oz8n9UcAYBChk?format=jpg&name=medium",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 高飛車で生意気なお嬢様",
          title: "キャラクターパック GP対応版 高飛車で生意気なお嬢様"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000615.html",
          src: "https://pbs.twimg.com/media/E7oz8npVgAgsVkh?format=jpg&name=medium",
          alt:
            "COM3D2&2.5 キャラクターパック GP対応版 甘々デレデレでご主人様を信仰している妹系幼馴染",
          title: "キャラクターパック GP対応版 甘々デレデレでご主人様を信仰している妹系幼馴染"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000616.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ01001000/VJ01000616_img_main.jpg",
          alt:
            "COM3D2&2.5 キャラクターパック GP対応版  警戒心の強い無愛想",
          title: "キャラクターパック GP対応版  警戒心の強い無愛想"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01001178.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ01002000/VJ01001178_img_main.webp",
          alt:
            "COM3D2&2.5 キャラクターパック GP対応版 小動物系ふわふわ妹",
          title: "キャラクターパック GP対応版 小動物系ふわふわ妹"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01001177.html",
          src: "https://img.dlsite.jp/modpub/images2/work/professional/VJ01002000/VJ01001177_img_main.webp",
          alt:
            "COM3D2&2.5 キャラクターパック GP対応版 大人の余裕を持つ、頼れるメイド秘書",
          title: "キャラクターパック GP対応版 大人の余裕を持つ、頼れるメイド秘書"
        },
        {
          link: "https://amzn.to/3zY0V9M",
          src: "https://pbs.twimg.com/media/E7oz6tYVoAAhRW7?format=jpg&name=medium",
          alt: "COM3D2 キャラクターパックEX ド変態ドM",
          title: "キャラクターパック ド変態ドM"
        },
        {
          link: "https://amzn.to/2UZYzIB",
          src: "https://pbs.twimg.com/media/E7oz6t0VkAAKdEP?format=jpg&name=medium",
          alt: "COM3D2 キャラクターパックEX 腹黒",
          title: "キャラクターパック 腹黒"
        },
        {
          link: "https://amzn.to/3lhIFnm",
          src: "https://pbs.twimg.com/media/E7ozf7WVUAYyNJ1?format=jpg&name=medium",
          alt: "COM3D2 キャラクターパックEX 気さくでちょっとエッチなお姉さん",
          title: "キャラクターパック 気さくでちょっとエッチなお姉さん"
        },
        {
          link: "https://amzn.to/3igI1Vo",
          src: "https://pbs.twimg.com/media/E7ozV4IVcAgkD2V?format=jpg&name=medium",
          alt: "COM3D2 キャラクターパックEX 生真面目で甘え下手な淑女",
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
          alt: "COM3D2 GP-01＆GP-02＆GP-01 Fb（本体+アペンド）",
          title: "COM3D2 GP-01＆GP-02＆GP-01 Fb（本体+アペンド）",
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
  font-size: 0.6em; // 14px(this font-size) / 18px(root font-size)
  padding: 0.25rem;
  text-align: center;
}
</style>
