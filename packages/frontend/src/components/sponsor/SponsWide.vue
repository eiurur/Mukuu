<template>
  <section class="shadow actionable">
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
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01000215.html",
          src: "https://pbs.twimg.com/media/GZDFd2EaIAEsTbW?format=jpg&name=small",
          alt: "COM3D2＆2.5 with KissCharacter EditSystem（X0set）",
          title: "COM3D2＆2.5 with KissCharacter EditSystem（X0set）"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01000216.html",
          src: "https://pbs.twimg.com/media/GZDFd2Ca4AAjroC?format=jpg&name=small",
          alt: "COM3D2.5＋X0 with KissCharacter EditSystem",
          title: "COM3D2.5＋X0 with KissCharacter EditSystem"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01000324.html",
          src: "https://pbs.twimg.com/media/GZDKMsdbcAACQib?format=jpg&name=small",
          alt: "COM3D2＆2.5+ X1",
          title: "COM3D2＆2.5+ X1"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01001060.html",
          src: "https://pbs.twimg.com/media/GZDLKGHagAAjELx?format=jpg&name=small",
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
          src: "https://pbs.twimg.com/media/GZDKMsgbUAE5Aqm?format=jpg&name=small",
          alt: "COM3D2＆2.5+ X1改+",
          title: "COM3D2＆2.5+ X1改+"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ013149.html",
          src: "https://pbs.twimg.com/media/FSG4cenaMAAFIj8?format=jpg&name=small",
          alt: "COM3D2＋ GP―02 16キャラクター対応版（DL版）",
          title: "COM3D2＋ GP―02 16キャラクター対応版（DL版）"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ013150.html",
          src: "https://pbs.twimg.com/media/FSG4cenaMAAFIj8?format=jpg&name=small",
          alt: "COM3D2＋ GP―02",
          title: "COM3D2＋ GP―02"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ013970.html",
          src: "https://pbs.twimg.com/media/EcqVg49UwAAQLDY?format=jpg&name=small",
          alt: "COM3D2+ GP-01Fb",
          title: "COM3D2+ GP-01Fb"
        },
        {
          link: "https://com3d2.jp/gp03/",
          src: "https://pbs.twimg.com/media/GZDMclGbEAAaEu5?format=jpg&name=small",
          alt: "COM3D2&2.5＋ GP-03",
          title: "COM3D2&2.5＋ GP-03"
        },
        {
          link: "https://com3d2.jp/com3d225gp/",
          src: "https://pbs.twimg.com/media/GZDM3aba0AAXDkL?format=jpg&name=small",
          alt: "COM3D2&2.5＋ GPパック",
          title: "COM3D2&2.5＋ GPパック"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01001178.html",
          src: "https://pbs.twimg.com/media/FSfTQn7VIAELLSr?format=jpg&name=small",
          alt:
            "COM3D2&2.5 キャラクターパック GP対応版 小動物系ふわふわ妹",
          title: "キャラクターパック GP対応版 小動物系ふわふわ妹"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000612.html",
          src: "https://pbs.twimg.com/media/FSG5KW7akAAnjcp?format=jpg&name=small",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 無口で甘えたがりな文学少女",
          title: "キャラクターパック GP対応版 無口で甘えたがりな文学少女"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000613.html",
          src: "https://pbs.twimg.com/media/FSG4cfVaMAAbt61?format=jpg&name=small",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 天然サディスティックな小悪魔",
          title: "キャラクターパック GP対応版 天然サディスティックな小悪魔"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01000614.html",
          src: "https://pbs.twimg.com/media/FSG4PdhacAAqtag?format=jpg&name=small",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 色気のあるおしとやかなお姉さん",
          title: "キャラクターパック GP対応版 色気のあるおしとやかなお姉さん"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01001177.html",
          src: "https://pbs.twimg.com/media/FSG4Pd3akAEPump?format=jpg&name=small",
          alt:
            "COM3D2&2.5 キャラクターパック GP対応版 大人の余裕を持つ、頼れるメイド秘書",
          title: "キャラクターパック GP対応版 大人の余裕を持つ、頼れるメイド秘書"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ01002878.html",
          src: "https://pbs.twimg.com/media/EViiA8UU4AA77RU?format=jpg&name=small",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 病的な程一途な大和撫子",
          title: "キャラクターパック GP対応版 病的な程一途な大和撫子"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/t/link/work/aid/maidimaid/id/VJ01002693.html",
          src: "https://pbs.twimg.com/media/EViiA84U8AYLnrH?format=jpg&name=small",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 母性的なお姉ちゃん",
          title: "キャラクターパック GP対応版 母性的なお姉ちゃん"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000618.html",
          src: "https://pbs.twimg.com/media/EViiA9aUMAEbSrV?format=jpg&name=small",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 M心を刺激する、ドS女王様",
          title: "キャラクターパック GP対応版 M心を刺激する、ドS女王様"
        },

        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000616.html",
          src: "https://pbs.twimg.com/media/EVihLFcUYAULk9m?format=jpg&name=small",
          alt:
            "COM3D2&2.5 キャラクターパック GP対応版  警戒心の強い無愛想",
          title: "キャラクターパック GP対応版  警戒心の強い無愛想"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000617.html",
          src: "https://pbs.twimg.com/media/EVihLFcUEAAqp_d?format=jpg&name=small",
          alt: "COM3D2&2.5 キャラクターパック GP対応版 高飛車で生意気なお嬢様",
          title: "キャラクターパック GP対応版 高飛車で生意気なお嬢様"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ01000615.html",
          src: "https://pbs.twimg.com/media/EVihLFYUYAEthym?format=jpg&name=small",
          alt:
            "COM3D2&2.5 キャラクターパック GP対応版 甘々デレデレでご主人様を信仰している妹系幼馴染",
          title: "キャラクターパック GP対応版 甘々デレデレでご主人様を信仰している妹系幼馴染"
        },
        {
          link: "https://dl.s-court.me/item.php?iid=174",
          src: "https://pbs.twimg.com/media/EusfK3NUcAID0ER?format=jpg&name=small",
          alt: "COM3D2 カラオケパックVR",
          title: "COM3D2 カラオケパックVR"
        },
        {
          link: "https://dl.s-court.me/item.php?iid=192",
          src: "https://pbs.twimg.com/media/EusfM_LVgAI1nwo?format=jpg&name=small",
          alt: "COM3D2 カラオケパックVR VOL.2",
          title: "COM3D2 カラオケパックVR VOL.2"
        },
        {
          link: "https://dl.s-court.me/item.php?iid=225",
          src: "https://pbs.twimg.com/media/EV0oltdUEAAPiGa?format=jpg&name=small",
          alt: "COM3D2 カラオケパックVR VOL.3",
          title: "COM3D2 カラオケパックVR VOL.3"
        },
        {
          link: "https://dl.s-court.me/item.php?iid=230",
          src: "https://pbs.twimg.com/media/Euse4bFUcAIgrr8?format=jpg&name=small",
          alt: "COM3D2 カラオケパックVR VOL.4",
          title: "COM3D2 カラオケパックVR VOL.4"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ013148.html",
          src: "//img.dlsite.jp/modpub/images2/work/professional/VJ014000/VJ013148_img_main.jpg",
          alt: "COM3D2 GP-01＆GP-02（本体+アペンド）",
          title: "COM3D2 GP-01＆GP-02（本体+アペンド）"
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
  height: 132px;
  object-fit: cover;
  object-position: top;
}
section {
  width: 100%;
  background: white;
  border-radius: 0.25rem;
}
.title {
  font-size: 0.6rem; // 14px(this font-size) / 18px(root font-size)
  padding: 0.25rem;
  text-align: center;
}
</style>
