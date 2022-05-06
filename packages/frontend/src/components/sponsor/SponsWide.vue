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
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ015030.html",
          src: "https://pbs.twimg.com/media/FSG5VHdakAAKEqd?format=jpg&name=small",
          alt: "CR EditSystem 1.1",
          title: "CR EditSystem 1.1"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ013149.html",
          src: "https://pbs.twimg.com/media/FSG4cenaMAAFIj8?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2＋ GP―02 16キャラクター対応版（DL版）",
          title: "カスタムオーダーメイド3D2＋ GP―02 16キャラクター対応版（DL版）"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ013150.html",
          src: "https://pbs.twimg.com/media/FSG4cenaMAAFIj8?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2＋ GP―02",
          title: "カスタムオーダーメイド3D2＋ GP―02"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ013970.html",
          src: "https://pbs.twimg.com/media/EcqVg49UwAAQLDY?format=jpg&name=small",
          alt: "カスタムオーダーメイド3D2+ GP-01Fb",
          title: "カスタムオーダーメイド3D2+ GP-01Fb"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ015167.html",
          src: "https://pbs.twimg.com/media/FSG3P69akAwhoUj?format=jpg",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 小動物系ふわふわ妹",
          title: "キャラクターパック 小動物系ふわふわ妹"
        },
        {
          link: "https://amzn.to/327u5oV",
          src: "https://pbs.twimg.com/media/FSG4dNAaUAAA9wW?format=jpg&name=medium",
          alt:
            "カスタムオーダーメイド3D2＆カスタムメイド3D2 キャラクターパック 健康的でスポーティなボクっ娘",
          title: "キャラクターパック 健康的でスポーティなボクっ娘"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ014813.html",
          src: "https://pbs.twimg.com/media/FSG5KW7akAAnjcp?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 無口で甘えたがりな文学少女",
          title: "キャラクターパック 無口で甘えたがりな文学少女"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ014875.html",
          src: "https://pbs.twimg.com/media/FSG4cfVaMAAbt61?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 天然サディスティックな小悪魔",
          title: "キャラクターパック 天然サディスティックな小悪魔"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/n/link/work/aid/maidimaid/id/VJ014943.html",
          src: "https://pbs.twimg.com/media/FSG4PdhacAAqtag?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 色気のあるおしとやかなお姉さん",
          title: "キャラクターパック 色気のあるおしとやかなお姉さん"
        },
        {
          link: "https://www.dlsite.com/pro/dlaf/=/t/i/link/work/aid/maidimaid/id/VJ015096.html",
          src: "https://pbs.twimg.com/media/FSG4Pd3akAEPump?format=jpg&name=medium",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 大人の余裕を持つ、頼れるメイド秘書",
          title: "キャラクターパック 大人の余裕を持つ、頼れるメイド秘書"
        },
        {
          link: "https://amzn.to/3fnXfnQ",
          src: "https://pbs.twimg.com/media/EViiA8UU4AA77RU?format=jpg&name=small",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 病的な程一途な大和撫子",
          title: "キャラクターパック 病的な程一途な大和撫子"
        },
        {
          link: "https://amzn.to/3edXJLO",
          src: "https://pbs.twimg.com/media/EViiA84U8AYLnrH?format=jpg&name=small",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 母性的なお姉ちゃん",
          title: "キャラクターパック 母性的なお姉ちゃん"
        },
        {
          link: "https://amzn.to/3iRmAIT",
          src: "https://pbs.twimg.com/media/EViiA9aUMAEbSrV?format=jpg&name=small",
          alt: "カスタムオーダーメイド3D2 キャラクターパック M心を刺激する、ドS女王様",
          title: "キャラクターパック M心を刺激する、ドS女王様"
        },

        {
          link: "https://amzn.to/38JQBWq",
          src: "https://pbs.twimg.com/media/EVihLFcUYAULk9m?format=jpg&name=small",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 警戒心の強い無愛想",
          title: "キャラクターパック 警戒心の強い無愛想"
        },
        {
          link: "https://amzn.to/3elFpjY",
          src: "https://pbs.twimg.com/media/EVihLFcUEAAqp_d?format=jpg&name=small",
          alt: "カスタムオーダーメイド3D2 キャラクターパック 高飛車で生意気なお嬢様",
          title: "キャラクターパック 高飛車で生意気なお嬢様"
        },
        {
          link: "https://amzn.to/3fiGyfj",
          src: "https://pbs.twimg.com/media/EVihLFYUYAEthym?format=jpg&name=small",
          alt:
            "カスタムオーダーメイド3D2 キャラクターパック 甘々デレデレでご主人様を信仰している妹系幼馴染",
          title: "キャラクターパック 甘々デレデレでご主人様を信仰している妹系幼馴染"
        },
        {
          link: "https://amzn.to/3zY0V9M",
          src: "https://pbs.twimg.com/media/Euser58VkAENyTg?format=jpg&name=small",
          alt: "カスタムオーダーメイド3D2 キャラクターパックEX ド変態ドM",
          title: "キャラクターパック ド変態ドM"
        },
        {
          link: "https://amzn.to/2UZYzIB",
          src: "https://pbs.twimg.com/media/EusesYbUYAMf8gY?format=jpg&name=small",
          alt: "カスタムオーダーメイド3D2 キャラクターパックEX 腹黒",
          title: "キャラクターパック 腹黒"
        },
        {
          link: "https://amzn.to/3lhIFnm",
          src: "https://pbs.twimg.com/media/E7o1HF6VEAcaYUU?format=jpg&name=small",
          alt: "カスタムオーダーメイド3D2 キャラクターパックEX 気さくでちょっとエッチなお姉さん",
          title: "キャラクターパック 気さくでちょっとエッチなお姉さん"
        },
        {
          link: "https://amzn.to/3igI1Vo",
          src: "https://pbs.twimg.com/media/E7o1HFqUUAQoyAj?format=jpg&name=small",
          alt: "カスタムオーダーメイド3D2 キャラクターパックEX 生真面目で甘え下手な淑女",
          title: "キャラクターパック 生真面目で甘え下手な淑女"
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
          link: "https://amzn.to/35QsVQM",
          src: "https://pbs.twimg.com/media/EivwctDUYAEU5nq?format=jpg&name=small",
          alt: "カスタムオーダーメイド3D2+ GP-01&GP-02",
          title: "カスタムオーダーメイド3D2+ GP-01&GP-02"
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
  font-size: 0.77rem; // 14px(this font-size) / 18px(root font-size)
  padding: 0.25rem;
  text-align: center;
}
</style>
