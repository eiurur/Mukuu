<template>
  <div class="user">
    <div class="icon" @click="openUserDrawer()">
      <img v-lazy="post.postedBy.profileImageUrl" onerror="this.style.display = 'none'" />
    </div>
    <div class="profile">
      <div class="names">
        <span class="name">{{ post.postedBy.name }}</span>
        <ScreenName :screenName="post.postedBy.screenName"></ScreenName>
      </div>
    </div>
    <div class="createdAt">
      <a :href="post.sourceUrl" target="_blank">{{ post.createdAt }}</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  contain: content;
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
  & .createdAt {
    white-space: nowrap;
    & a {
      color: #bbb;
      &:hover {
        color: #179afc;
      }
    }
  }
  .profile {
    width: 100%;
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 1rem;
    font-size: 1rem;
    line-height: 1.5;
    contain: content;
    & .names {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      & .name {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    & .createdAt {
      a {
        color: #8899a6;
      }
      cursor: pointer;
    }
  }
}
</style>

<script>
import ScreenName from "@/components/ScreenName.vue";
import user from "@/api/user";

export default {
  name: "UserProfile",
  components: {
    ScreenName
  },
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
