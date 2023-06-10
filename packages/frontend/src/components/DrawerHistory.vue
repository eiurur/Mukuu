<template>
  <section class="drawer-history">
    <span class="drawer-history-user" v-for="item in showableHistory" :key="item._id">
      <WatchingUserIcon class="drawer-history-icon" :user="item" :title="`${item.name} / @${item.screenName}`"></WatchingUserIcon>
    </span>
    <el-popover
      v-if="this.selectableHistory.length>0"
      placement="bottom"
      trigger="click">
      <span class="drawer-history-user in-popover" v-for="item in selectableHistory" :key="item._id">
        <WatchingUserIcon class="drawer-history-icon"  :user="item" :title="`${item.name} / @${item.screenName}`"></WatchingUserIcon>
        <!-- <span>{{ `${item.name} / @${item.screenName}` }}</span> -->
      </span>
      <el-button class="drawer-history-inbox" round slot="reference">+{{ selectableHistory.length }}</el-button>
      <!-- <div class="drawer-history-inbox" slot="reference">+{{ selectableHistory.length }}</div> -->
    </el-popover>
  </section>
</template>

<style lang="scss" scoped>
.drawer-history {
  background: white;
  overflow: hidden;
  padding: .5rem;
  border-radius: .5rem;
  font-size: .75rem;
  display: flex;
  margin-bottom: 1rem;
}
.drawer-history-user {
  display: flex;
  align-items: center;
}
.drawer-history-user.in-popover + .drawer-history-user.in-popover {
  margin-top: .5rem;
}
.drawer-history-inbox {
  border-radius: 100%;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;
}
.drawer-history > .drawer-history-user + .drawer-history-user {
  margin-left: 1rem;
}
.drawer {
  position: relative;
}
</style>

<script>
import { throttle } from "@/plugins/util";

import WatchingUserIcon from "./WatchingUserIcon.vue";

export default {
  name: "DrawerHistory",
  components: {
    WatchingUserIcon
  },
  data() {
    return {
      shownNum: 0,
      hiddenNum: 0,
      defaultShownNum: 5,
      defaultHiddenNum: 12,
      componentWidth: 0
    };
  },
  computed: {
    selectableHistory: {
      get() {
        return this.history.slice(this.shownNum, this.shownNum + this.hiddenNum);
      }
    },
    showableHistory: {
      get() {
        return this.history.slice(0, this.shownNum);
      }
    },
    history: {
      get() {
        return this.$store.getters["drawer/getHistory"];
      }
    },
  },
  mounted() {
    window.addEventListener('resize', throttle(this.handleResize, 200));
    this.handleResize(); // 初期値の設定
  },
  beforeDestroy() {
    window.removeEventListener('resize', throttle(this.handleResize, 200));
  },
  methods: {
    handleResize() {
      this.componentWidth = this.$el.offsetWidth;
      this.shownNum = Math.min(this.defaultHiddenNum, Math.floor(this.componentWidth / (48 + 16)) - 1);
      this.hiddenNum = this.defaultHiddenNum - this.shownNum;
    }
  },
};
</script>
