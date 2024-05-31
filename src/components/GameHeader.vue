<template>
  <div class="game-row" data-cy="game-row" @click="onGameClick">
    <div class="type">
      <HallIcon v-if="props.game.type === GameType.INSIDE" :color="getIconColor(props.game.result)"/>
      <StadiumIcon v-else :color="getIconColor(props.game.result)"/>
      <div v-if="settings.showRating" class="rating" :class="ratingClass">
        <AnimatedNumber :number="rating"/>
      </div>
    </div>
    <div class="date" :class="{ 'ml': settings.showRating }">{{ props.game.date }}</div>
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
          <AssistIcon v-for="k in createArrayFromN(props.game.assists)" :key="k" :color="primary" :letter-color="theme0"
                      height="22px"
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
import GameResultColor from '../common/enums/GameResultColor.ts'
import GameResult from '../common/enums/GameResult.ts'
import HallIcon from '../common/icons/HallIcon.vue'
import GameType from '../common/enums/GameType.ts'
import { computed, ref } from 'vue'
import * as _ from 'lodash'
import useSettingsStore from '../stores/settingsStore.ts'
import CSSVars from '../models/CSSVars.ts'
import useGamesStore from '../stores/gamesStore.ts'
import AnimatedNumber from './AnimatedNumber.vue'

const router = useRouter()
const { settings } = useSettingsStore()
const gamesStore = useGamesStore()

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

const getIconColor = (gameResult: GameResult): string => {
  const key = _.keys(GameResult)[_.values(GameResult).indexOf(gameResult)]
  return GameResultColor[key]
}

const rating = computed((): number => gamesStore.getRatingForGame(props.game.timestamp))

const goalsShortForm = computed((): boolean => {
  return settings.shortFormOfStats && goals.value?.clientHeight > 22
})

const assistsShortForm = computed((): boolean => {
  return settings.shortFormOfStats && assists.value?.clientHeight > 22
})

const ratingClass = computed((): string => {
  if (rating.value < 2) {
    return 'rating-lowest'
  } else if (rating.value < 4) {
    return 'rating-low'
  } else if (rating.value < 6) {
    return 'rating-medium'
  } else if (rating.value < 8) {
    return 'rating-high'
  } else {
    return 'rating-highest'
  }
})

const primary = computed(() => CSSVars.getPrimary())
const theme0 = computed(() => CSSVars.getTheme0())
</script>

<style lang="scss" scoped>
.game-row {
  //animation: 1s slide-up;
  display: flex;
  gap: $m;
  align-items: center;
  padding: $m 0;
  background-color: var(--theme-0);
  color: var(--primary);
  min-height: 68px;

  > .type {
    position: relative;

    > svg {
      min-width: 36px;
    }

    > .rating {
      position: absolute;
      left: 20px;
      top: -8px;

      width: 30px;
      min-width: 30px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: $s;
      font-weight: 600;
      font-size: 15px;
      background-color: #76b100;
      color: white;
      border-radius: $m;

      &.rating-lowest {
        background-color: var(--rating-lowest);
      }

      &.rating-low {
        background-color: var(--rating-low);
      }

      &.rating-medium {
        background-color: var(--rating-medium);
      }

      &.rating-high {
        background-color: var(--rating-high);
      }

      &.rating-highest {
        background-color: var(--rating-highest);
      }
    }
  }

  > .date {
    flex: 1;
    text-wrap: nowrap;
    font-weight: 500;
    font-size: 20px;

    &.ml {
      margin-left: 16px;
    }
  }

  > .stats {
    display: flex;
    flex-direction: column;
    gap: $m;
    align-items: flex-end;

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
