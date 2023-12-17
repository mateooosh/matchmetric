<template>
  <div class="game-row" @click="onGameClick">
    <HallIcon v-if="props.game.type === GAME_TYPE.INSIDE" :color="getIconColor(props.game.result)"/>
    <StadiumIcon v-else :color="getIconColor(props.game.result)"/>
    <div class="date">{{ props.game.date }}</div>
    <div class="stats">
      <div ref="goals">
        <span v-if="!props.game.goals">-</span>
        <div v-else-if="goalsShortForm" class="short-form">
          <span>{{ props.game.goals }}</span>
          <BallIcon color="#333" height="18px" width="18px"/>
        </div>
        <template v-else>
          <BallIcon v-for="j in createArrayFromN(props.game.goals)" :key="j" color="#333" height="18px"
                    width="18px"/>
        </template>
      </div>
      <div ref="assists">
        <span v-if="!props.game.assists">-</span>
        <div v-else-if="assistsShortForm" class="short-form">
          <span>{{ props.game.assists }}</span>
          <AssistIcon color="#333" height="18px" width="18px"/>
        </div>
        <template v-else>
          <AssistIcon v-for="k in createArrayFromN(props.game.assists)" :key="k" color="#333" height="18px"
                      width="18px"/>
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

const router = useRouter()

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
  return goals.value?.clientHeight > 20
})

const assistsShortForm = computed((): boolean => {
  return assists.value?.clientHeight > 20
})

</script>

<style lang="scss" scoped>
.game-row {
  animation: 1s slide-up;
  display: flex;
  gap: $m;
  align-items: center;
  padding: $m 0;
  background-color: $theme-0;

  > svg {
    min-width: 36px;
  }

  > .date {
    flex: 1;
    text-wrap: nowrap;
    font-weight: 500;
    font-size: 18px;
  }

  > .stats {
    display: flex;
    flex-direction: column;
    gap: $s;
    align-items: flex-end;

    > div {
      display: flex;
      gap: $s;
      flex-wrap: wrap;
      justify-content: flex-end
    }

    .short-form {
      display: flex;
      align-items: center;
      gap: $s;
      font-weight: 600;
    }
  }
}
</style>
