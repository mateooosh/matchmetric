<template>
  <!--  https://vue-data-ui.graphieros.com/docs#vue-ui-xy-->
  <div class="performance-view">
    <van-nav-bar title="Performance"
                 left-arrow
                 @click-left="onClickLeft"/>
    <div class="content">
      <van-cell-group>
        <Field label="Mode">
          <template #input>
            <SegmentedControls v-model="state.mode" :segments="modeSegments"/>
          </template>
        </Field>
        <Field v-model="state.period"
               is-link
               readonly
               label="Period"
               placeholder="Choose period"
               @click="state.showPicker = true"
        />
        <van-popup v-model:show="state.showPicker" round position="bottom">
          <van-picker title="Choose period"
                      :columns="columns"
                      @cancel="state.showPicker = false"
                      @confirm="onConfirm"
          />
        </van-popup>
      </van-cell-group>
      <VueUiDonutEvolution :dataset="dataset" :config="config"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useGamesStore from '../stores/gamesStore'
import * as _ from 'lodash'

import { VueUiDonutEvolution } from 'vue-data-ui'
import { MONTHS } from '../common/consts/consts.ts'
import GameModel from '../models/GameModel.ts'
import Field from '../components/Field.vue'
import SegmentedControls from '../components/SegmentedControls.vue'
import { computed, reactive } from 'vue'
import SegmentModel from '../models/SegmentModel.ts'

const router = useRouter()
const gamesStore = useGamesStore()

const state = reactive({
  mode: 'Total',
  period: 'Last 12 months',
  showPicker: false
})

const onClickLeft = () => {
  router.push({ name: 'settings' })
}

const modeSegments = [
  new SegmentModel('Total'),
  new SegmentModel('Average')
]

const columns = [
  { text: 'Last 12 months', value: 'Last 12 months' },
  { text: '2024', value: '2024' },
  { text: '2023', value: '2023' },
  { text: '2022', value: '2022' },
  { text: '2021', value: '2021' }
]

const onConfirm = ({ selectedOptions }) => {
  state.showPicker = false
  state.period = selectedOptions[0].text
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
    const allGamesInMonth: any = gamesStore.getMappedGames()?.[yearKey]?.[monthKey]
    let valuesByMonth = _.reduce(allGamesInMonth, (result, game: GameModel) => {
      return result + game[attribute]
    }, 0)

    if (state.mode === 'Average' && _.size(allGamesInMonth)) {
      valuesByMonth /= _.size(allGamesInMonth)
    }

    goalsArray.push(valuesByMonth)
    d.setMonth(d.getMonth() - 1)
  })

  return _.reverse(goalsArray)
}

const dataset = computed(() => {
  return [
    {
      name: 'Goals',
      values: getStatsForLast12Months('goals'),
      color: '#5f8bee'
    },
    {
      name: 'Assists',
      values: getStatsForLast12Months('assists'),
      color: '#ff6400'
    }
  ]
})

const config = computed(() => {
  return {
    style: {
      fontFamily: 'inherit',
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
                bold: false,
                steps: 5
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
            color: "#2D353C",
            rounding: 2
          }
        },
        title: {
          text: 'Performance',
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
})

</script>

<style scoped lang="scss">
.performance-view {
  --van-nav-bar-height: 60px;
  --van-nav-bar-background: #5DB075;
  --van-nav-bar-title-text-color: white;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-icon-color: white;
  --van-collapse-item-content-padding: 0 0 0 16px;

  --van-cell-value-font-size: 18px;
  --van-cell-group-inset-padding: 0;
  --van-cell-vertical-padding: 14px;

  //--van-cell-font-size: 18px;
  //--van-cell-vertical-padding: 16px;
  //
  //--van-cell-group-inset-padding: 16px;

  display: flex;
  flex-direction: column;
  //background-color: #eff2f5;

  > .content {
    display: flex;
    flex-direction: column;
    gap: $l;
    flex: 1;
    overflow: auto;
    padding: 4px 0 $l 0;
  }
}
</style>