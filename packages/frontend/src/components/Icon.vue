<template>
  <div class="icon clickable" :style="style">
    <div v-if="useTwitterPage">
      <a :href="`https://twitter.com/${user.screenName}`" target="_blank" rel="noreferrer">
        <img
          :src="icon"
          :alt="icon"
          onload="this.style.display = 'inline-block'"
          onerror="this.style.display = 'none'"
        />
      </a>
    </div>
    <div v-else-if="useUserDrawer" @click="openUserDrawer">
      <img
        :src="icon"
        :alt="icon"
        onload="this.style.display = 'inline-block'"
        onerror="this.style.display = 'none'"
      />
    </div>
    <div v-else>
      <img
        :src="icon"
        :alt="icon"
        onload="this.style.display = 'inline-block'"
        onerror="this.style.display = 'none'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  background: #e0e0e0;
  border-radius: 100%;
  width: 73px;
  height: 73px;

  &.clickable {
    cursor: pointer;
  }
  & > div {
    // height: 48px;
    // width: 48px;
  }
  & a {
    height: 100%;
    display: block;
  }
  & img {
    border-radius: 100%;
  }
}
</style>

<script>
export default {
  name: "icon",
  props: {
    user: Object,
    useTwitterPage: Boolean,
    useUserDrawer: Boolean,
    size: Number
  },
  computed: {
    icon: {
      get() {
        if (!this.user) return this.user;
        const { profileImageUrl } = this.user;
        return profileImageUrl ? profileImageUrl.replace("_normal", "_bigger") : "";
      }
    },
    style() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      };
    }
  },
  methods: {
    openUserDrawer() {
      if (!this.user) return;
      const payload = { ...this.user };
      this.$store.dispatch("drawer/initialize", payload);
      this.$store.dispatch("saveLocalStorage");
    }
  }
};
</script>
