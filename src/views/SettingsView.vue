<template>
  <div class="settings-view">
    <van-nav-bar
        title="Settings"
        left-arrow
        @click-left="onClickLeft"/>
    <van-cell-group>
      <van-cell title="Cell title" value="Content" />
      <van-cell title="Cell title" value="Content" label="Description" />
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

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
}
</style>