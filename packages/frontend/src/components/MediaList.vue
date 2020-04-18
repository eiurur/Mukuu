<template>
  <div v-if="media" class="media-list">
    <img
      :key="item.id_str"
      v-for="item in media"
      v-lazy="`${item.media_url_https}?format=jpg&name=medium`"
      class="original"
      :class="imageWidthStyle"
      data-zoomable
    />
  </div>
</template>

<style lang="scss" scoped>
.media-list {
  display: flex;
  img {
    width: auto;
    object-fit: cover;
    height: 320px;
    // object-fit: cover;
    max-width: 25%;
    border-radius: 0.5rem;
  }

  & > img + img {
    padding-left: 1rem;
  }

  & .w33p {
    max-width: 33%;
  }
  & .w50p {
    max-width: 50%;
  }
  & .w100p {
    max-width: 100%;
  }
}
</style>

<script>
import mediumZoom from "medium-zoom";

export default {
  name: "MediaList",
  props: ["media"],
  methods: {},
  computed: {
    imageWidthStyle: {
      get() {
        console.log(this.media);
        if (!this.media) return {};
        return {
          w33p: this.media.length === 3,
          w50p: this.media.length === 2,
          w100p: this.media.length === 1
        };
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const images = Array.from(
        document.querySelectorAll("[data-zoomable]:not(.medium-zoom-image)")
      );
      images.map(
        img =>
          (img.onload = () =>
            !img.classList.contains("medium-zoom-image") && mediumZoom(img, { background: "#000" }))
      );
    });
  }
};
</script>
