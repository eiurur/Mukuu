<template>
  <div class="icon clickable">
    <div v-if="useTwitterPage">
      <a :href="`https://twitter.com/${user.screenName}`" target="_blank">
        <img :src="icon" onerror="this.style.display = 'none'" />
      </a>
    </div>
    <div v-else-if="useUserDrawer" @click="openUserDrawer">
      <img :src="icon" onerror="this.style.display = 'none'" />
    </div>
    <div v-else>
      <img :src="icon" onerror="this.style.display = 'none'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  width: 73px;
  height: 73px;
  background: #ccc;
  border-radius: 100%;

  &.clickable {
    cursor: pointer;
  }
  & > div {
    height: 73px;
    width: 73px;
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