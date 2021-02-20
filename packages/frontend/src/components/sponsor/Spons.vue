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
          link: "https://amzn.to/3gO7fqz",
          src: "https://pbs.twimg.com/media/EcqVg49UYAARu-P?format=jpg&name=large",
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
          link: "https://amzn.to/2ZzlHfx",
          src:
            "https://pbs.twimg.com/media/Eusd1WIVEAEjYxd?format=jpg&name=large",
          alt: "CM3D2 ACTパック",
          title: "CM3D2 ACTパック",
        },
        {
          link: "https://amzn.to/3pImS6R",
          src:
            "https://pbs.twimg.com/media/EusgdKeUUAEuNj3?format=jpg&name=medium",
          alt: "CM3D2 カラオケパックVR",
          title: "CM3D2 カラオケパックVR",
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
