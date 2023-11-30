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
        <van-field placeholder="Choose date...">
          <template #label>
            <div style="font-size: 18px; height: 100%; display: flex; align-items: center">
              <span>Date</span>
            </div>
          </template>
<!--          <template #input>-->
<!--            <van-cell title="Select Single Date" :value="date" @click="showCalendar = true"/>-->
<!--            <van-calendar v-model:show="showCalendar" @confirm="onDateConfirm" />-->
<!--          </template>-->
        </van-field>

        <van-field>
          <template #label>
            <div style="font-size: 18px; height: 100%; display: flex; align-items: center">
              <span>Goals</span>
            </div>
          </template>
          <template #input>
            <van-stepper v-model="goals" :min="0" :max="50" input-width="40px" button-size="32px"/>
          </template>
        </van-field>

        <van-field>
          <template #label>
            <div style="font-size: 18px; height: 100%; display: flex; align-items: center">
              <span>Assists</span>
            </div>
          </template>
          <template #input>
            <van-stepper v-model="assists" :min="0" :max="50" input-width="40px" button-size="32px"/>
          </template>
        </van-field>

        <van-field placeholder="Distance">
          <template #label>
            <div style="font-size: 18px; height: 100%; display: flex; align-items: center">
              <span>Distance</span>
            </div>
          </template>
        </van-field>



<!--        <van-field v-model="text" label="Text"/>-->
<!--        <van-field v-model="tel" type="tel" label="Phone"/>-->
<!--        <van-field v-model="digit" type="digit" label="Digit"/>-->
<!--        <van-field v-model="password" type="password" label="Password"/>-->
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {ref} from 'vue'

const router = useRouter()

const date = ref()
const showCalendar = ref(false)
const goals = ref(0)
const assists = ref(0)

const formatDate = (date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
const onDateConfirm = (value) => {
  showCalendar.value = false
  date.value = formatDate(value)
}

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

  --van-cell-value-font-size: 18px;
  --van-stepper-input-font-size: 18px;

  //.van-field__body {
  //  font-size: 18px;
  //}
}


</style>