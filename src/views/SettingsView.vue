<template>
  <div class="settings-view">
    <van-nav-bar
        title="Settings"
        left-arrow
        @click-left="onClickLeft"/>
    <van-cell-group>
      <van-collapse v-model="state.selectedCollapseItem">
        <van-collapse-item title="Display attributes" :name="1">
          <van-cell title="Goals">
            <template #icon>
              <BallIcon color="#333" height="24px" width="24px"/>
            </template>
            <template #right-icon>
              <van-switch :model-value="true" active-color="#5DB075" size="30px" disabled/>
            </template>
          </van-cell>

          <van-cell title="Assists">
            <template #icon>
              <AssistIcon color="#333" height="24px" width="24px"/>
            </template>
            <template #right-icon>
              <van-switch :model-value="true" active-color="#5DB075" size="30px" disabled/>
            </template>
          </van-cell>

          <van-cell title="Distance">
            <template #icon>
              <MeasureIcon color="green" height="24px" width="24px"/>
            </template>
            <template #right-icon>
              <van-switch v-model="settingsStore.settings.showDistance" active-color="#5DB075" size="30px"/>
            </template>
          </van-cell>

          <van-cell title="Duration">
            <template #icon>
              <TimerIcon color="green" height="24px" width="24px"/>
            </template>
            <template #right-icon>
              <van-switch v-model="settingsStore.settings.showDuration" active-color="#5DB075" size="30px"/>
            </template>
          </van-cell>

          <van-cell title="Calories">
            <template #icon>
              <FireIcon color="#F29D38" height="24px" width="24px"/>
            </template>
            <template #right-icon>
              <van-switch v-model="settingsStore.settings.showCalories" active-color="#5DB075" size="30px"/>
            </template>
          </van-cell>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="Cell title" value="Content"/>
      <van-cell title="Cell title" value="Content" label="Description"/>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, watch } from 'vue'
import useSettingsStore from '../stores/settingsStore.ts'
import BallIcon from '../common/icons/BallIcon.vue'
import AssistIcon from '../common/icons/AssistIcon.vue'
import MeasureIcon from '../common/icons/MeasureIcon.vue'
import TimerIcon from '../common/icons/TimerIcon.vue'
import FireIcon from '../common/icons/FireIcon.vue'

const router = useRouter()

const settingsStore = useSettingsStore()

const state = reactive({
  selectedCollapseItem: []
})

watch(settingsStore.settings, () => {
  settingsStore.setSettingsIsLocalStorage()
})

const onClickLeft = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped lang="scss">
.settings-view {
  --van-nav-bar-height: 60px;
  --van-nav-bar-background: #5DB075;
  --van-nav-bar-title-text-color: white;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-icon-color: white;
  --van-collapse-item-content-padding: 0 0 0 16px;

  --van-cell-font-size: 18px;
  --van-cell-vertical-padding: 16px;

  .van-cell{
    align-items: center;
    gap: $m;
  }

  //.van-collapse-item__content {
  //  padding: 12px 0 16px 12px;
  //}
}
</style>