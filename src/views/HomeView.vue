<template>
  <div class="home-view">
    <Button label="Add game" @click="addGame"/>
    <div class="games">
      <div v-for="(game, i) in gamesHardCoded" :key="i" class="game-row">
        <StadiumIcon :color="GAME_RESULT[game.result.toUpperCase()]"/>
        <div class="date">06-11-2023</div>
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
</template>

<script setup lang="ts">
import Button from '../components/Button.vue'
import StadiumIcon from '../common/icons/StadiumIcon.vue'
import BallIcon from '../common/icons/BallIcon.vue'
import AssistIcon from '../common/icons/AssistIcon.vue'
import GAME_RESULT from '../common/enums/GAME_RESULT.ts'

const addGame = () => {
  console.log('add game')
}

const createArrayFromN = (n:Number):Array => {
  return Array.from(Array(n).keys())
}

const gamesHardCoded = [
  {
    type: 'outside', // outside | inside
    result: 'win',
    date: '06-11-2023',
    goals: 5,
    assists: 3
  },
  {
    type: 'outside', // outside | inside
    result: 'draw',
    date: '06-11-2023',
    goals: 0,
    assists: 3
  },
  {
    type: 'outside', // outside | inside
    result: 'lose',
    date: '06-11-2023',
    goals: 5,
    assists: 6
  },
  {
    type: 'outside', // outside | inside
    result: 'win',
    date: '06-11-2023',
    goals: 5,
    assists: 3
  },
  {
    type: 'outside', // outside | inside
    result: 'draw',
    date: '06-11-2023',
    goals: 0,
    assists: 3
  },
  {
    type: 'outside', // outside | inside
    result: 'lose',
    date: '06-11-2023',
    goals: 5,
    assists: 6
  },{
    type: 'outside', // outside | inside
    result: 'win',
    date: '06-11-2023',
    goals: 5,
    assists: 3
  },
  {
    type: 'outside', // outside | inside
    result: 'draw',
    date: '06-11-2023',
    goals: 0,
    assists: 3
  },
  {
    type: 'outside', // outside | inside
    result: 'lose',
    date: '06-11-2023',
    goals: 5,
    assists: 6
  }
]
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