<template>
  <div class="icon" @click="openUserDrawer()">
    <img v-lazy="post.postedBy.profileImageUrl" :alt="post.postedBy.profileImageUrl" onerror="this.style.display = 'none'" />
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
  img {
    border-radius: 100%;
  }
}
</style>

<script>
import user from "@/api/user";

export default {
  name: "PostIcon",
  props: ["post", "useDrawer"],
  methods: {
    async openUserDrawer() {
      const { postedBy } = this.post;

      if (!postedBy || !this.useDrawer) return;
      if (!postedBy._id) {
        const { data } = await user.fetchByTwitterId(postedBy.idStr);
        if (!data || !data._id) {
          this.$message.error("ユーザ情報がありません");
          return;
        }
        postedBy._id = data._id;
        postedBy.postCount = data.postCount;
      }
      const payload = { ...postedBy };
      this.$store.dispatch("drawer/initialize", payload);
      this.$store.dispatch("saveLocalStorage");
    }
  }
};
</script>
