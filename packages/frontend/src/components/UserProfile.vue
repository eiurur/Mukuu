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
      <div class="createdAt">
        <a :href="post.sourceUrl" target="_blank">{{ post.createdAt }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: row;
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
  & .createdAt a {
    color: #bbb;
    &:hover {
      color: #179afc;
    }
  }
}
.profile {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  & .names {
    display: flex;
    flex-direction: column;
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

export default {
  name: "UserProfile",
  components: {
    ScreenName
  },
  props: ["post", "useDrawer"],
  methods: {
    openUserDrawer() {
      const { postedBy } = this.post;
      if (!postedBy || !this.useDrawer) return;
      const payload = { ...postedBy };
      this.$store.dispatch("drawer/initialize", payload);
      this.$store.dispatch("saveLocalStorage");
    }
  }
};
</script>
