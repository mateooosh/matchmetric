<template>
  <div>
    <NavBar/>
    <div class="home-view">
      <van-back-top top="12px" bottom="32px"/>
      <van-empty v-if="!hasGames" description="No games found"/>
      <GameHeader v-for="game in games" :key="game.timestamp" :game="game"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameHeader from '../components/GameHeader.vue'
import useGamesStore from '../stores/gamesStore.ts'
import GameModel from '../models/GameModel.ts'
import NavBar from '../components/NavBar.vue'
import { computed } from 'vue'
import * as _ from 'lodash'

const gamesStore = useGamesStore()

const games: Array<GameModel> = gamesStore.games

const hasGames = computed(() => _.size(games))

</script>

<style scoped lang="scss">
//@keyframes slide-up {
//  from {
//    margin-top: 50px;
//    opacity: 0;
//  }
//  to {
//    margin-top: 0;
//    opacity: 1;
//  }
//}
//
//@keyframes slide-right {
//  from {
//    margin-right: 10px;
//    opacity: 0;
//  }
//  to {
//    margin-top: 0;
//    opacity: 1;
//  }
//}

.home-view {
  padding: 0 $l;

  > .button {
    margin-bottom: $m;
  }

  .game-row:not(:last-child) {
    border-bottom: 1px solid $theme-1;
  }
}
</style>