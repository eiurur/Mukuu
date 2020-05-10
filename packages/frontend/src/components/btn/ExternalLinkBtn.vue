<template>
  <span :title="link.url">
    <i class="el-icon-link"></i>
    {{ link.label }}
  </span>
</template>

<script>
export default {
  name: "ExternalLinkBtn",
  props: ["link"]
};
</script>

<style></style>
