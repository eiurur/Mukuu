<template>
  <a class="item" :href="link.url" target="_blank">
    <el-tooltip placement="top" effect="light" v-if="useTooltip">
      <div slot="content">{{ link.url }}</div>
      <span>
        <i class="el-icon-link"></i>
        {{ link.label }}
      </span>
    </el-tooltip>
    <span :title="link.url" v-if="!useTooltip">
      <i class="el-icon-link"></i>
      {{ link.label }}
    </span>
  </a>
</template>

<script>
export default {
  name: "ExternalLinkBtn",
  props: ["link", "useTooltip"]
};
</script>

<style lang="scss" scoped>
.item {
  display: block;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  & > span {
    padding: 0rem 1rem;
  }
}
</style>