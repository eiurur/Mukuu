<template>
  <div class="bookmark">
    <span class="item add" v-if="this.canAddBookmark" @click="addBookmark">
      <el-tooltip placement="top" effect="light" v-if="useTooltip">
        <div slot="content">ブックマーク</div>
        <span>
          <i class="el-icon-collection-tag"></i>
        </span>
      </el-tooltip>
      <span title="ブックマーク" v-if="!useTooltip">
        <i class="el-icon-collection-tag"></i>
      </span>
    </span>
    <span class="item remove" v-if="this.isRemovingBookmark" @click="removeBookmark">
      <el-tooltip placement="top" effect="light" v-if="useTooltip">
        <div slot="content">ブックマーク解除</div>
        <span>
          <i class="el-icon-collection-tag"></i>
        </span>
      </el-tooltip>
      <span title="ブックマーク解除" v-if="!useTooltip">
        <i class="el-icon-collection-tag"></i>
      </span>
    </span>
    <span class="item history" v-if="this.isRemovingHistory" @click="removeHistory">
      <el-tooltip placement="top" effect="light" v-if="useTooltip">
        <div slot="content">ブックマーク解除</div>
        <span>
          <i class="el-icon-collection-tag"></i>
        </span>
      </el-tooltip>
      <span title="ブックマーク解除" v-if="!useTooltip">
        <i class="el-icon-collection-tag"></i>
      </span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.bookmark {
  .item {
    cursor: pointer;
    display: block;
    border-radius: 4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: 1px solid #bbb;
    color: #bbb;
    border-radius: 4rem;
    line-height: 1.7;
    &.remove {
      background: #1c84e8;
      border: 1px solid #1c84e8;
      color: white;
    }
    &.history {
      background: #e8801c;
      border: 1px solid #e8801c;
      color: white;
    }
    & > span {
      padding: 0rem 1rem;
    }
  }
}
</style>

<script>
import { config } from "@/config";

export default {
  name: "BookmarkBtn",
  props: ["post"],
  data() {
    return {
      useTooltip: config.useTooltip
    };
  },
  computed: {
    bookmark: {
      get() {
        const id = this.post.idStr;
        const bookmark = this.$store.getters["bookmark/find"](id);
        return !!bookmark;
      }
    },
    history: {
      get() {
        const id = this.post.idStr;
        const history = this.$store.getters["bookmark/unearth"](id);
        return !!history;
      }
    },
    canAddBookmark() {
      return !this.bookmark && !this.history;
    },
    isRemovingBookmark() {
      return this.bookmark && !this.history;
    },
    isRemovingHistory() {
      return !this.bookmark && this.history;
    }
  },
  methods: {
    addBookmark() {
      this.$store.dispatch("bookmark/addBookmark", this.post);
      this.$store.dispatch("saveLocalStorage");
    },
    removeBookmark() {
      this.$store.dispatch("bookmark/removeBookmark", this.post);
      this.$store.dispatch("saveLocalStorage");
    },
    removeHistory() {
      this.$store.dispatch("bookmark/removeBookmarkFromHistory", this.post);
      this.$store.dispatch("saveLocalStorage");
    }
  }
};
</script>
