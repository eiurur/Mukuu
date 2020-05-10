<template>
  <div class="footer">
    <div class="attributes">
      <div class="item retweet">
        <span>{{ post.retweetCount }}</span>
      </div>
      <div class="item favorite">
        <span>{{ post.favoriteCount }}</span>
      </div>
    </div>
    <PostFooterControl :post="post"></PostFooterControl>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  & .item {
    display: block;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border-radius: 4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    & > span {
      padding: 0rem 1rem;
    }
  }
  & .attributes {
    display: flex;

    & > div + div {
      margin-left: 1rem;
    }
    & .retweet {
      background: rgba(11, 197, 123, 0.8);
      & > span:after {
        content: "RT";
        font-size: 60%;
        padding-left: 0.5rem;
      }
    }
    & .favorite {
      background: rgba(232, 28, 79, 0.8);
      & > span:after {
        content: "likes";
        font-size: 60%;
        padding-left: 0.5rem;
      }
    }
  }
}
</style>

<script>
import PostFooterControl from "@/components/PostFooterControl.vue";

export default {
  name: "PostFooter",
  components: { PostFooterControl },
  props: ["post"]
};
</script>
