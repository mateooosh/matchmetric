<template>
  <div class="game-row" @click="onGameClick">
    <StadiumIcon :color="GAME_RESULT_COLOR[props.game.result]"/>
    <div class="date">{{ props.game.date }}</div>
    <div class="stats">
      <div>
        <span v-if="!props.game.goals">-</span>
        <template v-else>
          <BallIcon v-for="j in createArrayFromN(props.game.goals)" :key="j" color="#333" height="18px"
                    width="18px"/>
        </template>
      </div>
      <div>
        <span v-if="!props.game.assists">-</span>
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

const router = useRouter()

const props = defineProps({
  game: GameModel
})

const onGameClick = () => {
  router.push({ name: 'game-details', params: { id: props.game.timestamp } })
}

const createArrayFromN = (n: number): Array<number> => {
  return Array.from(Array(n).keys())
}
</script>

<style lang="scss" scoped>
.game-row {
  animation: 1s slide-up;
  display: flex;
  gap: $m;
  align-items: center;
  padding: $m 0;
  background-color: $theme-0;

  &:not(:last-child) {
    border-bottom: 1px solid $theme-1;
  }

  > .date {
    flex: 1;
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
    }
  }
}
</style>
