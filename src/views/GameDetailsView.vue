<template>
  <div class="game-details-view">
    <van-nav-bar
        title="Add new game"
        left-arrow
        @click-left="onClickLeft"/>
    <div class="content">
      <GameHeader :game="game"/>
    </div>
    {{ game }}
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import useGamesStore from '../stores/gamesStore.ts'
import GameModel from '../models/GameModel.ts'
import GameHeader from '../components/GameHeader.vue'

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
    padding: $l;
  }
}
</style>