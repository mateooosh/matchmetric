<template>
  <div class="game-details-view">
    <van-nav-bar
        title="Game details"
        right-text="Edit"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight">
      <template #right>
        <EditIcon color="white" width="28" height="28"/>
      </template>
    </van-nav-bar>
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

        <StatsCell v-if="settingsStore.settings.showDistance" label="Distance" :value="game.distance">
          <template #icon>
            <MeasureIcon color="green" height="32px" width="32px"/>
          </template>
          <template #unit>
            <span>km</span>
          </template>
        </StatsCell>

        <StatsCell v-if="settingsStore.settings.showDuration" label="Duration" :value="game.duration">
          <template #icon>
            <TimerIcon color="green" height="32px" width="32px"/>
          </template>
        </StatsCell>

        <StatsCell v-if="settingsStore.settings.showCalories" label="Calories" :value="game.calories">
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
import useSettingsStore from '../stores/settingsStore.ts'
import EditIcon from '../common/icons/EditIcon.vue'

const route = useRoute()
const router = useRouter()
const store = useGamesStore()
const settingsStore = useSettingsStore()

const game: GameModel = store.getGameByTimestamp(Number(route.params.id))

const onClickLeft = () => {
  router.push({ name: 'home' })
}

const onClickRight = () => {
  router.push({ name: 'edit-game', params: { id: route.params.id } })
}
</script>

<style scoped lang="scss">
.game-details-view {
  --van-nav-bar-height: 60px;
  --van-nav-bar-background: #5DB075;
  --van-nav-bar-title-text-color: white;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-icon-color: white;
  --van-nav-bar-text-color: white;
  --van-font-size-md: 16px;

  display: flex;
  flex-direction: column;

  > .content {
    padding: 0 $l;
    font-size: 18px;
    font-weight: 600;
    flex: 1;
    overflow: auto;

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
        margin: $m 0;
      }
    }
  }
}
</style>