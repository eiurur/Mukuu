<template>
  <div class="icon">
    <div v-if="useTwitterPage">
      <a :href="`https://twitter.com/${user.screenName}`" target="_blank" class="clickable">
        <img :src="icon" />
      </a>
    </div>
    <div v-else-if="useUserDrawer" @click="openUserDrawer" class="clickable">
      <img :src="icon" />
    </div>
    <div v-else>
      <img :src="icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  min-width: 73px;
  min-height: 73px;
  background: #ccc;

  & .clickable {
    cursor: pointer;
  }
  border-radius: 100%;
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
    useUserDrawer: Boolean
  },
  computed: {
    icon: {
      get() {
        if (!this.user) return this.user;
        const { profileImageUrl } = this.user;
        return profileImageUrl
          ? profileImageUrl.replace("_normal", "_bigger")
          : "";
      }
    }
  },
  methods: {
    openUserDrawer() {
      if (!this.user) return;
      const payload = Object.assign({}, this.user);
      this.$store.dispatch("drawer/initialize", payload);
    }
  }
};
</script>