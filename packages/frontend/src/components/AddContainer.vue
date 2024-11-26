<template>
  <div class="add-container" v-if="post.adds && post.adds.length">
    <section class="add" :title="add.title"  v-for="add in post.adds" :key="add.title">
      <a :data-title="add.title" :href="add.source" rel="nofollow noopener sponsored" target="_blank">
        <img :src="add.images.large" :alt="add.title" itemprop="image" class="target_type" />
        <div class="title oneline-text">
          <span>{{ add.title }}</span>
        </div>
      </a>
    </section>
  </div>
</template>

<style lang="scss" scoped>

.add-container {
  width: 100%;
  margin: 1rem 0 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1rem;
  border-radius: 0.25rem;

  section {
    width: 100%;
    background: white;
  }
  .title {
    font-size: 0.7rem; // 14px(this font-size) / 18px(root font-size)
    padding: 0.5rem 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    span {
      display: block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
  section.add {
    width: 100%;
    border-radius: 0.25rem;
    position: relative;
    & a:hover:after {
      opacity: 1;
    }
  }
  .add {
    img {
      width: 100%;
      height: 280px;
      display: flex;
      align-items: flex-end;
      object-fit: cover;
      overflow: hidden;
    }
    a {
      width: 100%;
    }
  }
}
</style>

<script>
export default {
  name: "AddContainer",
  props: {
    post: {
      type: Object,
    },
  },
};
</script>
