<template>
  <!--  https://vue-data-ui.graphieros.com/docs#vue-ui-xy-->
  <div class="performance-view">
    <van-nav-bar title="Performance"
                 left-arrow
                 @click-left="onClickLeft"/>
    <div class="content">
      <VueUiDonutEvolution :dataset="dataset2" :config="config2"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useGamesStore from '../stores/gamesStore'
import * as _ from 'lodash'

import { VueUiDonutEvolution, VueUiDonutEvolutionConfig, VueUiDonutEvolutionDatasetItem } from 'vue-data-ui'
import { MONTHS } from '../common/consts/consts.ts'
import GameModel from '../models/GameModel.ts'

const router = useRouter()
const gamesStore = useGamesStore()

const onClickLeft = () => {
  router.push({ name: 'settings' })
}

const getLastMonths = (): Array<string> => {
  const result: Array<string> = []
  const d = new Date()
  d.setDate(1)

  _.forEach(MONTHS, () => {
    result.push(MONTHS[d.getMonth()])
    d.setMonth(d.getMonth() - 1)
  })

  return _.reverse(result)
}

const getStatsForLast12Months = (attribute: 'goals' | 'assists'): Array<number> => {
  const goalsArray: Array<number> = []
  const d = new Date()
  d.setDate(1)

  _.forEach(MONTHS, () => {
    const yearKey = d.getFullYear()
    const monthKey = _.padStart(_.toString(d.getMonth() + 1), 2, '0')
    const allGamesInMonth: any = gamesStore.getMappedGames()[yearKey][monthKey]

    const goalsByMonth = _.reduce(allGamesInMonth, (result, game: GameModel) => {
      return result + game[attribute]
    }, 0)

    goalsArray.push(goalsByMonth)
    d.setMonth(d.getMonth() - 1)
  })

  return _.reverse(goalsArray)
}


const dataset2: VueUiDonutEvolutionDatasetItem[] = [
  {
    name: "Goals",
    values: getStatsForLast12Months('goals'),
    color: '#3366CC'
  },
  {
    name: "Assists",
    values: getStatsForLast12Months('assists'),
    color: '#DC3912'
  }
]

const config2: VueUiDonutEvolutionConfig = {
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#ffffff",
      color: "#2D353C",
      layout: {
        height: 316,
        width: 500,
        padding: {
          top: 8,
          left: 36,
          right: 28,
          bottom: 24
        },
        grid: {
          stroke: "#e1e5e8",
          strokeWidth: 0.7,
          yAxis: {
            dataLabels: {
              show: true,
              fontSize: 10,
              color: "#2D353C",
              roundingValue: 0,
              offsetX: 0,
              bold: false,
              steps: 10
            }
          },
          xAxis: {
            dataLabels: {
              show: true,
              values: getLastMonths(),
              fontSize: 8,
              showOnlyFirstAndLast: false
            }
          }
        },
        line: {
          show: true,
          stroke: "#CCCCCC",
          strokeWidth: 4
        },
        highlighter: {
          color: "#2D353C",
          opacity: 5
        },
        dataLabels: {
          show: true,
          fontSize: 10,
          color: "#2D353C"
        }
      },
      title: {
        text: "Performance (last 12 months)",
        color: "#2D353C",
        fontSize: 20,
        bold: true
      },
      legend: {
        color: "#2D353C",
        backgroundColor: "#FFFFFF",
        bold: true,
        show: true,
        fontSize: 16
      }
    }
  },
  userOptions: {
    show: true
  }
}
</script>

<style scoped lang="scss">
.performance-view {
  --van-nav-bar-height: 60px;
  --van-nav-bar-background: #5DB075;
  --van-nav-bar-title-text-color: white;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-icon-color: white;
  --van-collapse-item-content-padding: 0 0 0 16px;

  //--van-cell-font-size: 18px;
  //--van-cell-vertical-padding: 16px;
  //
  //--van-cell-group-inset-padding: 16px;

  display: flex;
  flex-direction: column;
  //background-color: #eff2f5;

  > .content {
    flex: 1;
    overflow: auto;
    padding: $l 0;
  }
}
</style>