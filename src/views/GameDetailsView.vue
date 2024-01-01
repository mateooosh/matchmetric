<template>
  <div class="game-details-view">
    <van-nav-bar
        title="Game details"
        left-arrow
        @click-left="onClickLeft"/>
    <div class="content">
      <GameHeader :game="game"/>

      <div class="stats">
        <StatsCell label="Goals" :value="game.goals">
          <template #icon>
            <BallIcon color="#333" height="32px" width="32px"/>
          </template>
        </StatsCell>

        <StatsCell label="Assists" :value="game.assists">
          <template #icon>
            <AssistIcon color="#333" height="32px" width="32px"/>
          </template>
        </StatsCell>

        <StatsCell label="Distance" :value="game.distance">
          <template #icon>
            <MeasureIcon color="green" height="32px" width="32px"/>
          </template>
          <template #unit>
            <span>km</span>
          </template>
        </StatsCell>

        <StatsCell label="Duration" :value="game.duration">
          <template #icon>
            <TimerIcon color="green" height="32px" width="32px"/>
          </template>
        </StatsCell>

        <StatsCell label="Calories" :value="game.calories">
          <template #icon>
            <FireIcon color="#F29D38" height="32px" width="32px"/>
          </template>
        </StatsCell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import useGamesStore from '../stores/gamesStore.ts'
import GameModel from '../models/GameModel.ts'
import GameHeader from '../components/GameHeader.vue'
import BallIcon from '../common/icons/BallIcon.vue'
import AssistIcon from '../common/icons/AssistIcon.vue'
import MeasureIcon from '../common/icons/MeasureIcon.vue'
import TimerIcon from '../common/icons/TimerIcon.vue'
import FireIcon from '../common/icons/FireIcon.vue'
import StatsCell from '../components/StatsCell.vue'

const route = useRoute()
const router = useRouter()
const store = useGamesStore()

const game: GameModel = store.getGameByTimestamp(Number(route.params.id))

const onClickLeft = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped lang="scss">
.game-details-view {
  --van-nav-bar-height: 60px;
  --van-nav-bar-background: #5DB075;
  --van-nav-bar-title-text-color: white;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-icon-color: white;

  > .content {
    padding: 0 $l;
    font-size: 18px;
    font-weight: 600;

    > .game-row {
      padding: $l 0;
      border-bottom: 1px solid $theme-1;
    }

    > .stats {
      display: flex;
      flex-wrap: wrap;
      padding: $m 0;

      > .cell {
        width: 50%;
      }
    }
  }
}
</style>