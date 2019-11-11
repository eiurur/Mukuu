<template>
  <div
    class="loader"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    v-loading="shouldShowLoader"
    v-if="shouldShowLoader"
  ></div>
</template>

<style lang="scss" scoped>
.loader {
  height: 4rem;
  width: 100%;
  border-radius: 1rem;
  display: block;
  position: relative;
}
</style>

<script>
export default {
  name: "Loader",
  props: ["shouldShowLoader"]
};
</script>