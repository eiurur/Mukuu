<template>
  <span class="screen-name">@{{screenName}}</span>
</template>

<style lang="scss" scoped>
.screen-name {
  opacity: 0.5;
  // padding-left: 0.5rem;
}
</style>

<script>
export default {
  name: "ScreenName",
  props: ["screenName"]
};
</script>
