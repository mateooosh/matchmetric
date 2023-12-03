<template>
  <div class="add-game-view">
    <van-nav-bar
        title="Add new game"
        left-arrow
        @click-left="onClickLeft"
    >
      <template #right>
        <div @click="onSave" style="color: white;">
          Save
        </div>
      </template>
    </van-nav-bar>
    <div>
      <van-cell-group inset>
        <van-field placeholder="Type...">
          <template #label>
            <div style="font-size: 18px; height: 100%; display: flex; align-items: center">
              <span>Type</span>
            </div>
          </template>
          <template #input>
            <SegmentedControls v-model="state.type" :segments="_.values(GAME_TYPE)"/>
          </template>
        </van-field>

        <van-field placeholder="Result...">
          <template #label>
            <div style="font-size: 18px; height: 100%; display: flex; align-items: center">
              <span>Result</span>
            </div>
          </template>
          <template #input>
            <SegmentedControls v-model="state.result" :segments="_.values(GAME_RESULT)"/>
          </template>
        </van-field>

        <van-calendar v-model:show="state.showCalendar" @confirm="onDateConfirm"/>
        <van-field placeholder="Choose date..." v-model="state.date">
          <template #label>
            <div style="font-size: 18px; height: 100%; display: flex; align-items: center">
              <span>Date</span>
            </div>
          </template>
          <template #right-icon>
            <div style="display: flex; align-items: center;">
              <CalendarIcon @click="openCalendar" width="32" height="32"/>
            </div>
          </template>
        </van-field>

        <van-field>
          <template #label>
            <div style="font-size: 18px; height: 100%; display: flex; align-items: center">
              <span>Goals</span>
            </div>
          </template>
          <template #input>
            <van-stepper v-model="state.goals" :min="0" :max="50" input-width="40px" button-size="32px" theme="round"/>
          </template>
        </van-field>

        <van-field>
          <template #label>
            <div style="font-size: 18px; height: 100%; display: flex; align-items: center">
              <span>Assists</span>
            </div>
          </template>
          <template #input>
            <van-stepper v-model="state.assists" :min="0" :max="50" input-width="40px" button-size="32px"
                         theme="round"/>
          </template>
        </van-field>

        <van-field placeholder="Distance">
          <template #label>
            <div style="font-size: 18px; height: 100%; display: flex; align-items: center">
              <span>Distance</span>
            </div>
          </template>
        </van-field>

      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import GAME_TYPE from '../common/enums/GAME_TYPE.ts'
import SegmentedControls from '../components/SegmentedControls.vue'
import GAME_RESULT from '../common/enums/GAME_RESULT.ts'
import * as _ from 'lodash'
import GameModel from '../models/GameModel.ts'
import useGamesStore from '../stores/gamesStore.ts'
import CalendarIcon from '../common/icons/CalendarIcon.vue'

const gamesStore = useGamesStore()
const router = useRouter()

// const showCalendar = ref(false)

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}

const formatDate = (date: Date): string => date.toLocaleDateString('en-IN', dateOptions).replaceAll('/', '-')

const openCalendar = () => {
  state.showCalendar = true
}
const onDateConfirm = (value: any) => {
  state.showCalendar = false
  state.date = formatDate(value)
}

const state = reactive({
  type: GAME_TYPE.OUTSIDE,
  result: GAME_RESULT.DRAW,
  date: formatDate(new Date()),
  goals: 0,
  assists: 0,
  showCalendar: false
})

const onClickLeft = () => {
  router.back()
}

const onSave = () => {
  const newGame: GameModel = new GameModel(new Date().getTime(), state.type, state.result, state.date, state.goals, state.assists)
  console.log(newGame)
  gamesStore.addGame(newGame)
  router.push({ name: 'home' })
}
</script>

<style scoped lang="scss">
.add-game-view {
  --van-nav-bar-height: 60px;
  --van-nav-bar-background: #5DB075;
  //--van-nav-bar-text-color: white;
  --van-nav-bar-title-text-color: white;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-icon-color: white;

  --van-cell-value-font-size: 18px;
  --van-stepper-input-font-size: 18px;
  --van-stepper-button-round-theme-color: #5DB075;

  //.van-field__body {
  //  font-size: 18px;
  //}
}


</style>