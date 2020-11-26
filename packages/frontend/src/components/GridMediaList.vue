<template>
  <div v-if="media" class="media-list-container">
    <div class="media-list" :class="imageNumStyle">
      <img
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
  props: ["media"],
  methods: {},
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
