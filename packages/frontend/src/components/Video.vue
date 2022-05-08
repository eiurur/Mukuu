<template>
  <video
    ref="video"
    autoplay
    controls
    loop
    muted
    :class="videoWidthStyle"
    :src="video"
  ></video>
</template>

<style lang="scss" scoped>
video {
  max-width: 100%;
  &.stretch {
    width: 100%;
  }
}
</style>

<script>
import mobile from "is-mobile";

export default {
  name: "Video",
  props: ["media", "isGrid"],
  methods: {
    onScroll() {
      if (mobile()) return;
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
    videoWidthStyle() {
      if (this.isGrid) return { stretch: true };
      return {};
    },
    video() {
      const videos = this.media[0].video_info.variants;
      const mp4VideoHasHighestSize = videos
        .filter((video) => video.bitrate)
        .sort((a, b) => b.bitrate - a.bitrate)[0];
      const videoUrl = mp4VideoHasHighestSize.url;
      return videoUrl;
    },
  },
  mounted() {
    this.onScroll();
  }
};
</script>
