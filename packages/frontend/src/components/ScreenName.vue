<template>
  <span class="screen-name">@{{screenName}}</span>
</template>

<style lang="scss" scoped>
.screen-name {
  opacity: 0.5;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>

<script>
export default {
  name: "ScreenName",
  props: ["screenName"]
};
</script>
