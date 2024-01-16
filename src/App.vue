<template>
  <div class="app">
    <router-view :key="$route.path"/>
    <van-tabbar route v-model="state.activeTab" active-color="#5DB075" inactive-color="grey" :fixed="false">
      <van-tabbar-item to="/matchmetric/" icon="wap-nav" color="#5DB075">Games</van-tabbar-item>
      <van-tabbar-item to="/matchmetric/edit-game" icon="add" data-cy="tab-add-game">New</van-tabbar-item>
      <van-tabbar-item to="/matchmetric/settings" icon="setting">Settings</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  activeTab: 0
})
</script>

<style lang="scss" scoped>
.app {
  --van-tabbar-item-icon-size: 28px;
  --van-tabbar-height: 68px;
  --van-tabbar-item-font-size: 16px;

  user-select: none;

  display: flex;
  flex-direction: column;
  height: 100dvh;

  & div:first-child {
    flex: 1;
    overflow: auto;
  }
}
</style>
