<template>
  <div class="counter">
    <div v-if="total > 0">
      <span class="current">{{current}}</span>
      <span class="separator">/</span>
      <span class="total">{{total}} 件中</span>
    </div>
    <div v-else>
      <span class="total">0件</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.counter {
  padding: 0 0.5rem;
  text-align: right;
}
.separator {
  padding: 0 0.5rem;
}
</style>

<script>
export default {
  name: "counter",
  props: {
    current: Number,
    total: Number
  },
  methods: {}
};
</script>