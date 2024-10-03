<template>
  <div v-if="media" class="media-list-container">
    <div class="media-list">
      <Video :media="media" v-if="useVideo" :isGrid="false"></Video>
      <img
        :key="item.id_str"
        v-for="item in media"
        v-show="!useVideo"
        v-lazy="`${item.media_url_https}?format=jpg&name=medium`"
        :class="[imageWidthStyle, imageWidth]"
        class="original"
        alt="img"
        data-zoomable
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.media-list {
  display: flex;
  height: 100%;
  width: 100%;
  img {
    width: auto;
    object-fit: cover;
    object-position: top;
    max-width: 25%;
    &:first-of-type {
      border-radius: 0.5rem 0 0 0.5rem / 0.5rem 0 0 0.5rem;
    }
    &:last-of-type {
      border-radius: 0 0.5rem 0.5rem 0 / 0 0.5rem 0.5rem 0;
    }
    &.fixedWidth {
      width: 25%;
    }
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
        if (this.useVideo) return { v: true };
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
    },
    useVideo() {
      if (!this.media) return false;
      if (this.useImageOnly) return false;
      return this.media.some(detail => detail.type === "video");
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
