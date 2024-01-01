<template>
  <div class="add-game-view">
    <van-nav-bar
        title="Add new game"
        left-arrow
        @click-left="onClickLeft"/>
    <div>
      <van-cell-group inset>
        <Field label="Type">
          <template #input>
            <SegmentedControls v-model="state.type" :segments="_.values(GAME_TYPE)"/>
          </template>
        </Field>

        <Field label="Result">
          <template #input>
            <SegmentedControls v-model="state.result" :segments="_.values(GAME_RESULT)"/>
          </template>
        </Field>

        <Field label="Date" placeholder="Choose date..." readonly v-model="state.date">
          <template #right-icon>
            <div style="display: flex; align-items: center;">
              <CalendarIcon @click="openCalendar" width="32" height="32"/>
              <van-calendar v-model:show="state.showCalendar"
                            @confirm="onDateConfirm"
                            :show-confirm="false"
                            :first-day-of-week="1"
                            :min-date="new Date(1970, 0, 0)" color="#5DB075"/>
            </div>
          </template>
        </Field>

        <Field label="Goals">
          <template #input>
            <van-stepper v-model="state.goals" :min="0" :max="50" input-width="40px" button-size="32px" theme="round"/>
          </template>
        </Field>

        <Field label="Assists">
          <template #input>
            <van-stepper v-model="state.assists" :min="0" :max="50" input-width="40px" button-size="32px"
                         theme="round"/>
          </template>
        </Field>

        <Field label="Distance" type="number" placeholder="Distance [km]" v-model="state.distance"/>

        <Field label="Duration" placeholder="Duration [hh:mm:ss]" :maxlength="8" readonly v-model="state.duration">
          <template #right-icon>
            <div style="display: flex; align-items: center;">
              <ClockIcon @click="showTimePicker" width="32" height="32"/>
              <van-popup v-model:show="state.showTimePicker" position="bottom">
                <van-time-picker @confirm="onTimePickerConfirm"
                                 @cancel="onTimePickerCancel"
                                 :columns-type="timePickerColumnsType"/>
              </van-popup>
            </div>
          </template>
        </Field>

        <Field label="Calories" type="digit" placeholder="Calories" v-model="state.calories"/>

      </van-cell-group>
      <Button label="Save" @click="onSave"/>
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
import Button from '../components/Button.vue'
import Field from '../components/Field.vue'
import ClockIcon from '../common/icons/ClockIcon.vue'

const gamesStore = useGamesStore()
const router = useRouter()

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

const timePickerColumnsType = ['hour', 'minute', 'second']

const showTimePicker = () => {
  state.showTimePicker = true
}

const onTimePickerCancel = () => {
  state.showTimePicker = false
}

const onTimePickerConfirm = (value: any) => {
  state.duration = _.join(value.selectedValues, ':')
  state.showTimePicker = false
}

const state = reactive({
  type: GAME_TYPE.OUTSIDE,
  result: GAME_RESULT.DRAW,
  date: formatDate(new Date()),
  goals: 0,
  assists: 0,
  distance: null,
  duration: null,
  calories: null,
  showCalendar: false,
  showTimePicker: false
})

const onClickLeft = () => {
  router.push({ name: 'home' })
}

const onSave = () => {
  const newGame: GameModel = new GameModel(new Date().getTime(), state.type, state.result, state.date, state.goals, state.assists, state.distance, state.duration, state.calories)
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
  --van-cell-group-inset-padding: 0;

  --van-stepper-input-font-size: 18px;
  --van-stepper-button-round-theme-color: #5DB075;

  --van-picker-action-font-size: 18px;
  --van-picker-confirm-action-color: #5DB075;


  //.van-field__body {
  //  font-size: 18px;
  //}

  .button {
    margin: 8px 16px;
  }
}


</style>