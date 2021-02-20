<template>
  <div v-if="media" class="media-list-container">
    <div class="media-list" :class="imageNumStyle">
      <video
        v-if="useVideo"
        ref="video"
        autoplay
        controls
        loop
        muted
        :src="video"
      ></video>
      <img
        v-show="!useVideo"
        :key="item.id_str"
        v-for="item in media"
        v-lazy="`${item.media_url_https}?format=jpg&name=medium`"
        class="original"
        data-zoomable
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.media-list {
  display: grid;
  height: 100%;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  border-radius: 1rem;
  overflow: hidden;
  grid-row-gap: 1px;
  grid-column-gap: 1px;
  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    // object-position: top;
    max-width: 100%;
    padding: 0;
  }
  & video {
    // height: 100%;
    width: 100%;
    max-width: 100%;
    // padding: 0;
  }
  &.v {
    display: flex;
    border-radius: 0;
  }
  &.n1 {
    img:nth-of-type(1) {
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
  &.n2 {
    img:nth-of-type(1) {
      grid-row-start: 1;
      grid-row-end: 3;
    }
    img:nth-of-type(2) {
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
  &.n3 {
    img:nth-of-type(1) {
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
}
</style>

<script>
import mediumZoom from "medium-zoom";

export default {
  name: "GridMediaList",
  props: ["media", "useImageOnly"],
  methods: {
    onScroll() {
      if (!this.useVideo) return;
      // Prevent error: TypeError: Failed to execute 'observe' on 'IntersectionObserver': parameter 1 is not of type 'Element'." vue refs
      setTimeout(() => {
        this.observer = new IntersectionObserver((entries) => {
          if (entries[0].intersectionRatio <= 0) {
            this.$refs.video.pause();
          } else {
            this.$refs.video.play();
          }
        });
        this.observer.observe(this.$refs.video);
      }, 100);
    },
  },
  computed: {
    imageNumStyle: {
      get() {
        if (!this.media) return {};
        if (this.useVideo) return { v: true };
        return {
          n3: this.media.length === 3,
          n2: this.media.length === 2,
          n1: this.media.length === 1
        };
      }
    },
    video() {
      const videos = this.media[0].video_info.variants;
      const mp4VideoHasHighestSize = videos
        .filter((video) => video.bitrate)
        .sort((a, b) => b.bitrate - a.bitrate)[0];
      const videoUrl = mp4VideoHasHighestSize.url;
      return videoUrl;
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
      this.onScroll();
    });
  }
};
</script>
