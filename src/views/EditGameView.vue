<template>
  <div class="edit-game-view">
    <van-dialog v-model:show="state.showDeleteDialog"
                @confirm="onDeleteGameConfirm"
                title="Do you want to delete the game?"
                message="This game will be permanently deleted and you won't be able to see it again."
                confirm-button-text="Delete"
                confirm-button-color="red"
                close-on-click-overlay
                show-cancel-button/>
    <van-nav-bar :title="navBarTitle"
                 left-arrow
                 @click-left="onClickLeft">
      <template v-if="isEdit" #right>
        <TrashIcon color="white" width="28" height="28" @click="deleteGame"/>
      </template>
    </van-nav-bar>
    <div class="content">
      <van-cell-group inset>
        <Field label="Type" data-cy="type">
          <template #input>
            <SegmentedControls v-model="state.type" :segments="gameTypesToSegments"/>
          </template>
        </Field>

        <Field label="Result" data-cy="result">
          <template #input>
            <SegmentedControls v-model="state.result" :segments="gameResultsToSegments"/>
          </template>
        </Field>

        <Field label="Date" placeholder="Choose date..." readonly v-model="state.date">
          <template #right-icon>
            <div class="right-icon">
              <CalendarIcon @click="openCalendar" width="32" height="32"/>
              <van-calendar v-model:show="state.showCalendar"
                            @confirm="onDateConfirm"
                            :show-confirm="false"
                            :first-day-of-week="1"
                            :min-date="new Date(1970, 0, 0)" color="#5DB075"/>
            </div>
          </template>
        </Field>

        <Field label="Goals" data-cy="goals">
          <template #input>
            <van-stepper v-model="state.goals" :min="0" :max="50" input-width="50px" button-size="40px" theme="round"/>
          </template>
        </Field>

        <Field label="Assists" data-cy="assists">
          <template #input>
            <van-stepper v-model="state.assists" :min="0" :max="50" input-width="50px" button-size="40px"
                         theme="round"/>
          </template>
        </Field>

        <Field v-if="settingsStore.settings.showDistance" label="Distance" type="number" placeholder="Distance [km]"
               v-model="state.distance" data-cy="distance"/>

        <Field v-if="settingsStore.settings.showDuration" label="Duration" placeholder="Duration [hh:mm:ss]"
               :maxlength="8" readonly v-model="state.duration">
          <template #right-icon>
            <div class="right-icon">
              <ClockIcon @click="showTimePicker" width="32" height="32"/>
              <van-popup v-model:show="state.showTimePicker" position="bottom">
                <van-time-picker @confirm="onTimePickerConfirm"
                                 @cancel="onTimePickerCancel"
                                 :columns-type="timePickerColumnsType"/>
              </van-popup>
            </div>
          </template>
        </Field>

        <Field v-if="settingsStore.settings.showCalories" label="Calories" type="digit" placeholder="Calories"
               v-model="state.calories" data-cy="calories"/>

      </van-cell-group>
      <Button label="Save" @click="onSave" data-cy="save"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, reactive } from 'vue'
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
import GAME_RESULT_COLOR from '../common/enums/GAME_RESULT_COLOR.ts'
import SegmentModel from '../models/SegmentModel.ts'
import { showNotify, TimePickerColumnType } from 'vant'
import useSettingsStore from '../stores/settingsStore.ts'
import TrashIcon from '../common/icons/TrashIcon.vue'

const gamesStore = useGamesStore()
const settingsStore = useSettingsStore()
const router = useRouter()
const route = useRoute()

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}

const formatDate = (date: Date): string => date.toLocaleDateString('en-IN', dateOptions).replaceAll('/', '-')

const state = reactive({
  timestamp: 0,
  type: GAME_TYPE.OUTSIDE,
  result: GAME_RESULT.DRAW,
  date: formatDate(new Date()),
  goals: 0,
  assists: 0,
  distance: '',
  duration: '',
  calories: '',
  showCalendar: false,
  showTimePicker: false,
  showDeleteDialog: false
})

const isEdit = computed(() => !!route.params.id)

const navBarTitle = computed(() => {
  return isEdit.value ? 'Edit game' : 'Add new game'
})

onMounted(() => {
  if (isEdit.value) {
    const game: GameModel = gamesStore.getGameByTimestamp(Number(route.params.id))
    _.assign(state, game)
  }
})

const getIconColor = (gameResult: GAME_RESULT): string => {
  const key = _.keys(GAME_RESULT)[_.values(GAME_RESULT).indexOf(gameResult)]
  return GAME_RESULT_COLOR[key]
}

const gameTypesToSegments = computed(() => _.map(_.values(GAME_TYPE), (type: GAME_TYPE) => new SegmentModel(type)))

const gameResultsToSegments = computed(() => _.map(_.values(GAME_RESULT), (result: GAME_RESULT) => new SegmentModel(result, getIconColor(result))))

const openCalendar = () => {
  state.showCalendar = true
}

const onDateConfirm = (value: any) => {
  state.showCalendar = false
  state.date = formatDate(value)
}

const timePickerColumnsType: Array<TimePickerColumnType> = ['hour', 'minute', 'second']

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

const onClickLeft = () => {
  if (isEdit.value) {
    router.back()
  } else {
    router.push({ name: 'home' })
  }
}

const deleteGame = () => {
  state.showDeleteDialog = true
}

const onDeleteGameConfirm = () => {
  gamesStore.deleteGame(state.timestamp)
  showNotify({ type: 'success', message: 'Game has been deleted', position: 'bottom' })
  router.push({ name: 'home' })
}

const onSave = () => {
  if (isEdit.value) {
    const modifiedGame: GameModel = GameModel.fromJSON(state)
    gamesStore.editGame(modifiedGame)
    router.push({ name: 'game-details', params: { id: route.params.id } })
  } else {
    const newGame: GameModel = GameModel.fromJSON({ ...state, timestamp: new Date().getTime() })
    gamesStore.addGame(newGame)
    router.push({ name: 'home' })
  }
}

</script>

<style scoped lang="scss">
.edit-game-view {
  --van-nav-bar-height: 60px;
  --van-nav-bar-background: #5DB075;
  --van-nav-bar-title-text-color: white;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-icon-color: white;

  --van-cell-value-font-size: 18px;
  --van-cell-group-inset-padding: 0;
  --van-cell-vertical-padding: 14px;

  --van-stepper-input-font-size: 18px;
  --van-stepper-button-round-theme-color: #5DB075;

  --van-picker-action-font-size: 18px;
  --van-picker-confirm-action-color: #5DB075;

  --van-dialog-font-size: 18px;
  --van-button-default-font-size: 18px;

  display: flex;
  flex-direction: column;
  background-color: var(--theme-0);

  > .content {
    flex: 1;
    overflow: auto;
  }

  .right-icon {
    display: flex;
    align-items: center;
  }

  .button {
    margin: 8px 16px;
  }
}
</style>