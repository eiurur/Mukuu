<template>
  <div v-if="media && media.length > 0" class="media-list-container">
    <div class="media-list" :class="imageNumStyle">
      <div class="media-item"
        v-for="item in media"
        :key="item.id_str"
      >
        <Video :videoMedia="item" v-if="item.type==='video'" :isGrid="true"></Video>
        <img
          v-else
          v-lazy="`${item.media_url_https}?format=jpg&name=medium`"
          class="original"
          alt="img"
          data-zoomable
        />
      </div>
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
  .media-item {
  }
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
    object-fit: cover;
  }
  &.v {
    display: flex;
    border-radius: 0;
  }
  &.n1 {
    .media-item:nth-of-type(1) {
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
  &.n2 {
    .media-item:nth-of-type(1) {
      grid-row-start: 1;
      grid-row-end: 3;
    }
    .media-item:nth-of-type(2) {
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
  &.n3 {
    .media-item:nth-of-type(1) {
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
}
</style>

<script>
import mediumZoom from "medium-zoom";
import Video from "@/components/Video.vue";

export default {
  name: "GridMediaList",
  props: ["media", "useImageOnly"],
  components: {
    Video
  },
  computed: {
    imageNumStyle: {
      get() {
        if (!this.media) return {};
        return {
          n3: this.media.length === 3,
          n2: this.media.length === 2,
          n1: this.media.length === 1
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
