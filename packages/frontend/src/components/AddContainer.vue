<template>
  <div class="add-container" v-if="post.adds && post.adds.length">
    <section  class="add shadow"  v-for="add in post.adds" :key="add.title">
    <a :data-title="add.title" :href="add.source" rel="nofollow noopener sponsored" target="_blank">
      <img :src="add.images.large" :alt="add.title" itemprop="image" class="target_type" />
    </a>
    </section>
  </div>

</template>

<style lang="scss" scoped>

.add-container {
  margin: 2rem 0 1rem;
  // padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  grid-column-gap: 1rem;

  section.add {
    width: 100%;
    border-radius: 0.25rem;
    position: relative;
    & a:after {
      content: attr(data-title);
      position: absolute;
      transition: .1s opacity ease-in-out;
      opacity: 0;
      background: rgba(250,100,150,.8);
      color: #fff;
      font-size: .75rem;
      left: 0;
      right: 0;
      padding: 0.5rem;
      bottom: -1px; // FIXME:
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-radius: 0 0 .25rem .25rem;
    }
    & a:hover:after {
      opacity: 1;
    }
  }
  .add {
    img {
      width: 100%;
      display: flex;
      align-items: flex-end;
      border-radius: 0.25rem;
    }
    a {
      width: 100%;
    }
    // .title {
    //   opacity: 0;
    //   &:hover {
    //     opacity: 1;
    //     background: white;
    //   }
    //   font-size: 0.77rem; // 14px(this font-size) / 18px(root font-size)
    //   padding: 0.25rem;
    //   text-align: center;
    // }
  }
  .add {
    img {
      width: 100%;
      object-fit: cover;
      overflow: hidden;
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
