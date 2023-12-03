<template>
  <div>
    <NavBar/>
    <div class="home-view">
      <Button label="Add game" @click="addGame"/>
      <GameHeader v-for="game in games" :key="game.timestamp" :game="game"/>
      <!--      <van-tabs v-model:active="selectedTab" title-active-color="#5DB075" color="#5DB075">-->
      <!--        <van-tab title="All">-->
      <!--          <GameHeader v-for="game in games" :key="game.timestamp" :game="game"/>-->
      <!--        </van-tab>-->
      <!--        <van-tab title="Outside">-->
      <!--          <GameHeader v-for="game in outsideGames" :key="game.timestamp" :game="game"/>-->
      <!--        </van-tab>-->
      <!--        <van-tab title="Inside">-->
      <!--          <GameHeader v-for="game in insideGames" :key="game.timestamp" :game="game"/>-->
      <!--        </van-tab>-->
      <!--      </van-tabs>-->

    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../components/Button.vue'
import GameHeader from '../components/GameHeader.vue'
import useGamesStore from '../stores/gamesStore.ts'
import GameModel from '../models/GameModel.ts'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const gamesStore = useGamesStore()
const router = useRouter()

// const selectedTab = ref(0)

const games: Array<GameModel> = gamesStore.games

// const outsideGames = computed(() => {
//   return _.filter(games, ['type', GAME_TYPE.OUTSIDE])
// })
//
// const insideGames = computed(() => {
//   return _.filter(games, ['type', GAME_TYPE.INSIDE])
// })

// const getRandomInt = (max: number) => {
//   return Math.floor(Math.random() * max)
// }

const addGame = () => {
  router.push({ name: 'add-game' })
}

</script>

<style scoped lang="scss">
@keyframes slide-up {
  from {
    margin-top: 50px;
    opacity: 0;
  }
  to {
    margin-top: 0;
    opacity: 1;
  }
}

@keyframes slide-right {
  from {
    margin-right: 10px;
    opacity: 0;
  }
  to {
    margin-top: 0;
    opacity: 1;
  }
}

.home-view {
  padding: $l;
  --van-tabs-bottom-bar-width: 80px;

  .button {
    border-radius: $xl;
  }
}
</style>