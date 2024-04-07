<template>
  <div class="game-row" @click="onGameClick">
    <div class="icon">
      <HallIcon v-if="props.game.type === GAME_TYPE.INSIDE" :color="getIconColor(props.game.result)"/>
      <StadiumIcon v-else :color="getIconColor(props.game.result)"/>
    </div>
    <div class="date">{{ props.game.date }}</div>
    <div class="stats">
      <div ref="goals">
        <span v-if="!props.game.goals">-</span>
        <div v-else-if="goalsShortForm" class="short-form">
          <span>{{ props.game.goals }}</span>
          <BallIcon :color="primary" height="22px" width="22px"/>
        </div>
        <template v-else>
          <BallIcon v-for="j in createArrayFromN(props.game.goals)" :key="j" :color="primary" height="22px"
                    width="22px"/>
        </template>
      </div>
      <div ref="assists">
        <span v-if="!props.game.assists">-</span>
        <div v-else-if="assistsShortForm" class="short-form">
          <span>{{ props.game.assists }}</span>
          <AssistIcon :color="primary" :letter-color="theme0" height="22px" width="22px"/>
        </div>
        <template v-else>
          <AssistIcon v-for="k in createArrayFromN(props.game.assists)" :key="k" :color="primary" :letter-color="theme0" height="22px"
                      width="22px"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AssistIcon from '../common/icons/AssistIcon.vue'
import BallIcon from '../common/icons/BallIcon.vue'
import StadiumIcon from '../common/icons/StadiumIcon.vue'
import GameModel from '../models/GameModel.ts'
import { useRouter } from 'vue-router'
import GAME_RESULT_COLOR from '../common/enums/GAME_RESULT_COLOR.ts'
import GAME_RESULT from '../common/enums/GAME_RESULT.ts'
import HallIcon from '../common/icons/HallIcon.vue'
import GAME_TYPE from '../common/enums/GAME_TYPE.ts'
import { computed, ref } from 'vue'
import * as _ from 'lodash'
import useSettingsStore from '../stores/settingsStore.ts'

const router = useRouter()
const { settings } = useSettingsStore()

const goals = ref<HTMLElement | null>(null)
const assists = ref<HTMLElement | null>(null)

const props = defineProps({
  game: {
    type: GameModel,
    default: null
  }
})

const onGameClick = () => {
  router.push({ name: 'game-details', params: { id: props.game.timestamp } })
}

const createArrayFromN = (n: number): Array<number> => {
  return Array.from(Array(n).keys())
}

const getIconColor = (gameResult: GAME_RESULT): string => {
  const key = _.keys(GAME_RESULT)[_.values(GAME_RESULT).indexOf(gameResult)]
  return GAME_RESULT_COLOR[key]
}

const goalsShortForm = computed((): boolean => {
  return settings.shortFormOfStats && goals.value?.clientHeight > 22
})

const assistsShortForm = computed((): boolean => {
  return settings.shortFormOfStats && assists.value?.clientHeight > 22
})

const primary = computed(() => getComputedStyle(document.getElementsByClassName('app')[0]).getPropertyValue('--primary'))
const theme0 = computed(() => getComputedStyle(document.getElementsByClassName('app')[0]).getPropertyValue('--theme-0'))
</script>

<style lang="scss" scoped>
.game-row {
  //animation: 1s slide-up;
  display: flex;
  gap: $m;
  align-items: center;
  padding: $m 0;
  background-color: var(--theme-0);

  > .icon {
    > svg {
      min-width: 36px;
    }
  }

  > .date {
    flex: 1;
    text-wrap: nowrap;
    font-weight: 500;
    font-size: 20px;
    color: var(--primary);
  }

  > .stats {
    display: flex;
    flex-direction: column;
    gap: $m;
    align-items: flex-end;
    color: var(--primary);

    > div {
      display: flex;
      gap: $s;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .short-form {
      display: flex;
      align-items: center;
      gap: $s;
      font-weight: 600;
      font-size: 20px;
    }
  }
}
</style>
