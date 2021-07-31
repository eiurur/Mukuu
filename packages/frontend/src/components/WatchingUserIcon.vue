<template>
  <div class="icon" @click="openUserDrawer(user)">
    <img v-lazy="user.profileImageUrl" :alt="user.profileImageUrl"  @error="onIconLoadError" />
  </div>
</template>

<style lang="scss" scoped>
.icon {
  height: 48px;
  width: 48px;
  min-width: 48px;
  max-height: 48px;
  background: rgba(0, 0, 0, 0.12);
  border-radius: 100%;
  cursor: pointer;
  overflow: hidden;
  img {
    border-radius: 100%;
  }
}
</style>

<script>
import user from "../api/user";

export default {
  name: "WatchingUserIcon",
  props: {
    user: Object,
  },
  methods: {
    async onIconLoadError(e) {
      e.target.style.display = 'none';
      const { data } = await user.fetchByTwitterId(this.user.idStr);
      if (!data || !Object.keys(data).length) return;
      this.$store.dispatch("watch/updateWatch", data);
    },
    async openUserDrawer() {
      const postedBy = this.user;
      if (!postedBy) return;
      if (!postedBy._id) {
        const { data } = await user.fetchByTwitterId(postedBy.idStr);
        if (!data) {
          this.$message.error("ユーザ情報がありません");
          return;
        }
        postedBy._id = data._id;
      }
      const payload = { ...postedBy };
      this.$store.dispatch("drawer/initialize", payload);
      this.$store.dispatch("saveLocalStorage");
    }
  }
};
</script>
