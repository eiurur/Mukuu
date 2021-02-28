<template>
  <div class="user">
    <PostIcon :post="post" :useDrawer="useDrawer"></PostIcon>
    <div class="profile">
      <div class="names">
        <span class="name">{{ post.postedBy.name }}</span>
        <ScreenName :screenName="post.postedBy.screenName"></ScreenName>
      </div>
    </div>
    <div class="createdAt">
      <a :href="post.sourceUrl" target="_blank" rel="noreferrer">{{ post.createdAt }}</a>
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
      font-weight: 500;
      & .name {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>

<script>
import ScreenName from "@/components/ScreenName.vue";
import PostIcon from "@/components/PostIcon.vue";

export default {
  name: "UserProfile",
  components: {
    PostIcon,
    ScreenName
  },
  props: ["post", "useDrawer"]
};
</script>
