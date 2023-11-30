<template>
  <div class="add-game-view">
    <van-nav-bar
        title="Add new game"
        left-arrow
        @click-left="onClickLeft"
    >
      <template #right>
        Save
      </template>
    </van-nav-bar>
    <div>
      <van-cell-group inset>
        <van-field v-model="date" type="date" label="Date"/>

        <van-field v-model="goals" type="number" label="Goals">
          <template #input>
            <van-stepper v-model="value" />
          </template>
        </van-field>
        <van-field v-model="assists" type="number" label="Assists">
          <template #input>
            <van-stepper v-model="value" />
          </template>
        </van-field>


        <van-field v-model="text" label="Text"/>
        <van-field v-model="tel" type="tel" label="Phone" />
        <van-field v-model="digit" type="digit" label="Digit" />
        <van-field v-model="password" type="password" label="Password" />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const onClickLeft = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.add-game-view {
  --van-nav-bar-height: 80px;
  --van-nav-bar-background: #5DB075;
  //--van-nav-bar-text-color: white;
  --van-nav-bar-title-text-color: white;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-icon-color: white;
}
</style>