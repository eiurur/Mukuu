<template>
  <div v-if="media" class="media-list-container">
    <div class="media-list">
      <img
        :key="item.id_str"
        v-for="item in media"
        v-lazy="`${item.media_url_https}?format=jpg&name=medium`"
        class="original"
        :style="style"
        :class="imageWidthStyle"
        data-zoomable
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.media-list-container {
  height: 320px;
}
.media-list {
  display: flex;
  height: 100%;
  img {
    width: auto;
    object-fit: cover;
    object-position: top;
    // height: 320px;
    max-width: 25%;
  }

  & > img + img {
    padding-left: 0.25rem;
  }

  & .w33p {
    max-height: 100%;
    max-width: 33%;
  }
  & .w50p {
    max-height: 100%;
    max-width: 50%;
  }
  & .w100p {
    max-height: 100%;
    max-width: 100%;
    border-radius: 0.5rem !important;
  }
}
</style>

<script>
import mediumZoom from "medium-zoom";

export default {
  name: "FlexMediaList",
  props: ["media"],
  methods: {},
  computed: {
    imageWidthStyle: {
      get() {
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
            !img.classList.contains("medium-zoom-image") &&
            mediumZoom(img, { background: "#000" }))
      );
    });
  }
};
</script>
