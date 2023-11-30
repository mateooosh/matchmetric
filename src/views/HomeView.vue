<template>
  <div>
    <NavBar/>
    <div class="home-view">
      <Button label="Add game" @click="addGame"/>
      <div class="games">
        <div v-for="game in games" :key="game.timestamp" class="game-row" @click="onGameClick(game.timestamp)">
          <StadiumIcon :color="game.result"/>
          <div class="date">{{ game.date }}</div>
          <div class="stats">
            <div>
              <span v-if="!game.goals">-</span>
              <template v-else>
                <BallIcon v-for="j in createArrayFromN(game.goals)" :key="j" color="#333" width="18px"
                          height="18px"/>
              </template>
            </div>
            <div>
              <AssistIcon v-for="k in createArrayFromN(game.assists)" :key="k" color="#333" width="18px"
                          height="18px"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../components/Button.vue'
import StadiumIcon from '../common/icons/StadiumIcon.vue'
import BallIcon from '../common/icons/BallIcon.vue'
import AssistIcon from '../common/icons/AssistIcon.vue'
import useGamesStore from '../stores/gamesStore.ts'
import GameModel from '../models/GameModel.ts'
import GAME_RESULT from '../common/enums/GAME_RESULT.ts'
import GAME_TYPE from '../common/enums/GAME_TYPE.ts'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const store = useGamesStore()
const router = useRouter()

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max)
}

const addGame = () => {
  router.push({ name: 'add-game' })

  // const types: Array<GAME_TYPE> = [GAME_TYPE.INSIDE, GAME_TYPE.OUTSIDE]
  // const results: Array<GAME_RESULT> = [GAME_RESULT.WIN, GAME_RESULT.DRAW, GAME_RESULT.LOSE]
  //
  // const currentDate: Date = new Date()
  // store.addGame(new GameModel(currentDate.getTime(), types[getRandomInt(2)], results[getRandomInt(3)], '06-11-2023', getRandomInt(7), getRandomInt(7)))
}

const createArrayFromN = (n: number): Array<number> => {
  return Array.from(Array(n).keys())
}

const onGameClick = (timestamp: number) => {
  router.push({ name: 'game-details', params: { id: timestamp } })
}

const games: Array<GameModel> = store.games

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

  .button {
    border-radius: $xl;
  }

  .games {
    //display: flex;
    //flex-direction: column;
    //gap: $xxs;
    //background-color: $theme-1;

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

          svg {
            //animation: 1s slide-right;
          }
        }
      }
    }
  }
}
</style>