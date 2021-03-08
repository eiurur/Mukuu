<template>
  <a :href="href" target="_blank" rel="noreferrer">{{text}}</a>
</template>

<style lang="scss" scoped>
</style>
<script>
export default {
  name: "BlankLink",
  props: ["href", "text"],
};
</script>
