<template>
  <section class="counter">
    <div v-if="total > 0">
      <div v-if="isInputMode == false" @click="onInputMode" class="displayPanel">
        <span class="current">{{ current }}</span>
        <span class="separator">/</span>
        <span class="total">{{ total }} 件中</span>
      </div>
      <div v-else>
        <el-input
          size="small"
          ref="inputSkip"
          :placeholder="range"
          @keyup.enter.native="$event.target.blur"
          @blur="changeCurrentNumber"
          v-model="skip"
        ></el-input>
      </div>
    </div>
    <div v-else>
      <span class="total">0件</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.counter {
  .displayPanel {
    padding-left: 0.5rem;
    text-align: right;
  }
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
  data() {
    return {
      skip: "",
      isInputMode: false
    };
  },
  computed: {
    range() {
      return `0 ~ ${this.total - 1}`;
    }
  },
  methods: {
    onInputMode() {
      this.isInputMode = true;
      this.skip = this.current;
      this.$nextTick(() => this.$refs.inputSkip.focus());
    },
    changeCurrentNumber({ target }) {
      this.isInputMode = false;
      const { value } = target;
      if (value === "" || value === undefined) return;
      const number = Number(value);
      if (number === this.current || Number.isNaN(number) || value < 0 || this.total - 1 < value) return;
      this.$emit("changeCurrentNumber", number);
    }
  }
};
</script>
