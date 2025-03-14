<template>
  <div v-if="media && media.length > 0" class="media-list-container">
    <div class="media-list">
      <div class="media-item"
        v-for="item in media"
        :key="item.id_str"
        :class="[imageWidthStyle, imageWidth]"
      >
        <Video :videoMedia="item" v-if="item.type==='video'" :isGrid="false"></Video>
        <img
          v-else
          v-lazy="`${item.media_url_https}?format=jpg&name=medium`"
          class="original actionable"
          alt="img"
          data-zoomable
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.media-list {
  display: flex;
  height: 100%;
  width: 100%;
  .media-item {
    display: flex;
    max-width: 25%;
    overflow: hidden;
    &.fixedWidth {
      width: 25%;
    }
    &:first-of-type {
      border-radius: 0.5rem 0 0 0.5rem / 0.5rem 0 0 0.5rem;
    }
    &:last-of-type {
      border-radius: 0 0.5rem 0.5rem 0 / 0 0.5rem 0.5rem 0;
    }
  }
  & > .media-item + .media-item {
    padding-left: 0.25rem;
  }

  img {
    width: auto;
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
    &.v {
      display: flex;
    }
  }
  video {
    object-fit: cover;
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
  &.v {
    display: flex;
  }
}
</style>

<script>
import mediumZoom from "medium-zoom";
import Video from "@/components/Video.vue";

export default {
  name: "FlexMediaList",
  props: ["media", "useImageOnly", "useFixedWidth"],
  components: {
    Video
  },
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
    },
    imageWidth() {
      if (this.useFixedWidth) return { fixedWidth: true };
      return { maxWidth: true };
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
