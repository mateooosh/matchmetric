<template>
  <div class="app" data-cy="app" :class="{ 'dark': settingsStore.settings.darkTheme }">
    <router-view :key="$route.path"/>
    <van-tabbar route v-model="state.activeTab" active-color="#5DB075" inactive-color="grey" :fixed="false">
      <van-tabbar-item to="/matchmetric/" icon="wap-nav" color="#5DB075" data-cy="tab-home">Games</van-tabbar-item>
      <van-tabbar-item to="/matchmetric/edit-game" icon="add" data-cy="tab-add-game">New</van-tabbar-item>
      <van-tabbar-item to="/matchmetric/settings" icon="setting" data-cy="tab-settings">Settings</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useSettingsStore from './stores/settingsStore.ts'

const state = reactive({
  activeTab: 0
})

const settingsStore = useSettingsStore()

</script>

<style lang="scss" scoped>
.app {
  --van-tabbar-item-icon-size: 28px;
  --van-tabbar-height: 68px;
  --van-tabbar-item-font-size: 16px;

  --van-cell-border-color: var(--theme-1);

  // main
  --van-text-color: var(--primary);
  --van-border-color: var(--theme-1);
  //--van-border-width: 0;

  // cell
  --van-cell-background: var(--theme-0);
  --van-cell-text-color: var(--primary);
  --van-cell-label-color: var(--secondary);
  --van-field-label-color: var(--primary);

  // cell group
  --van-cell-group-background: var(--theme-0);

  // collapse
  --van-collapse-item-content-background: var(--theme-0);

  // dialog
  --van-dialog-background: var(--theme-0);
  --van-dialog-has-title-message-text-color: var(--secondary);

  // button
  --van-button-default-background: var(--theme-0);
  --van-button-default-color: var(--primary);

  // field
  --van-field-input-text-color: var(--primary);
  --van-field-placeholder-text-color: var(--secondary);
  --van-field-right-icon-color: var(--primary);

  // stepper
  --van-stepper-input-text-color: var(--primary);

  // calendar
  --van-calendar-background: var(--theme-0);
  --van-calendar-month-mark-color: var(--secondary);

  // popup
  --van-popup-background: var(--theme-0);

  // picker
  --van-picker-background: var(--theme-0);
  --van-picker-mask-color: var(--theme-0);
  --van-picker-option-text-color: var(--primary);

  // action sheet
  --van-action-sheet-item-background: var(--theme-0);
  --van-action-sheet-item-text-color: var(--primary);
  --van-action-sheet-item-font-size: 18px;

  user-select: none;

  display: flex;
  flex-direction: column;
  height: 100dvh;

  & div:first-child {
    flex: 1;
    overflow: auto;
  }

  .van-tabbar {
    --van-tabbar-background: var(--theme-0);
    --van-tabbar-item-active-background: var(--theme-0);
  }
}
</style>
