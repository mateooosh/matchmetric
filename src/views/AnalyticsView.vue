<template>
  <!--  https://vue-data-ui.graphieros.com/docs#vue-ui-xy-->
  <div class="analytics-view">
    <van-nav-bar title="Analytics"
                 left-arrow
                 @click-left="onClickLeft"/>

    <div v-if="hasGames" class="content">

      <!--      <div style="display: flex; margin: 16px 16px 0; gap: 16px; text-align: center;">-->
      <!--        <div-->
      <!--            style="display: flex; gap: 8px; align-items: center; justify-content: center; flex: 1; padding: 12px; border-radius: 8px; background-color: white; font-size: 18px; color: #323233;">-->
      <!--          <BallIcon color="#333" height="32px" width="32px"/>-->
      <!--          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">-->
      <!--            <div style="color: #808080;">Total goals</div>-->
      <!--            <div style="font-weight: 600;">{{ totalGoals }}</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div-->
      <!--            style="display: flex; gap: 8px; align-items: center; justify-content: center; flex: 1; padding: 12px; border-radius: 8px; background-color: white; font-size: 18px; color: #323233;">-->
      <!--          <AssistIcon color="#333" height="32px" width="32px"/>-->
      <!--          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">-->
      <!--            <div style="color: #808080;">Total assists</div>-->
      <!--            <div style="font-weight: 600;">{{ totalAssists }}</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->


      <div class="charts-total">
        <apexchart height="185" type="line" :options="configTotalGoals" :series="datasetTotalGoals"/>
        <apexchart height="185" type="line" :options="configTotalAssists" :series="datasetTotalAssists"/>
      </div>

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
<!--        <van-popup v-model:show="state.showPicker" round position="bottom">-->
<!--          <van-picker title="Choose period"-->
<!--                      :columns="periodDataSource"-->
<!--                      @cancel="state.showPicker = false"-->
<!--                      @confirm="onConfirm"-->
<!--          />-->
<!--        </van-popup>-->

        <van-action-sheet v-model:show="state.showPicker" :actions="periodDataSource" @select="onConfirm" />
      </van-cell-group>
      <apexchart type="bar" height="350" :options="barConfig" :series="barSeries"/>
      <VueUiDonutEvolution :dataset="dataset" :config="config"/>
    </div>
    <van-empty v-else description="No games found"/>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useGamesStore from '../stores/gamesStore'
import * as _ from 'lodash'

import { VueUiDonutEvolution } from 'vue-data-ui'
import { MONTHS } from '../common/consts/consts.ts'
import Field from '../components/Field.vue'
import SegmentedControls from '../components/SegmentedControls.vue'
import { computed, reactive } from 'vue'
import SegmentModel from '../models/SegmentModel.ts'
import { LineChartConfig } from '../common/configs/LineChartConfig.ts'
import { ColumnChartConfig } from '../common/configs/ColumnChartConfig.ts'
import GAME_ATTRIBUTE from '../common/enums/GAME_ATTRIBUTE.ts'
// import BallIcon from '../common/icons/BallIcon.vue'
// import AssistIcon from '../common/icons/AssistIcon.vue'

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

const hasGames = computed(() => _.size(gamesStore.games))
const totalGoals = computed(() => gamesStore.getTotalStats(GAME_ATTRIBUTE.GOALS))
const totalAssists = computed(() => gamesStore.getTotalStats(GAME_ATTRIBUTE.ASSISTS))
const allGoalsArray = computed(() => gamesStore.getAllStatsAsArray(GAME_ATTRIBUTE.GOALS))
const allAssistsArray = computed(() => gamesStore.getAllStatsAsArray(GAME_ATTRIBUTE.ASSISTS))
const maxChartValue = computed(() => _.max([...allGoalsArray.value, ...allAssistsArray.value]) || 0)

const onConfirm = ({ name }) => {
  state.showPicker = false
  state.period = name
}

const datasetTotalGoals = computed(() => {
  return [{
    name: 'Goals',
    type: 'line',
    data: gamesStore.getAllStatsAsArray(GAME_ATTRIBUTE.GOALS)
  }]
})

const datasetTotalAssists = computed(() => {
  return [{
    name: 'Assists',
    type: 'line',
    data: gamesStore.getAllStatsAsArray(GAME_ATTRIBUTE.ASSISTS)
  }]
})

const configTotalGoals = computed(() => LineChartConfig.getConfig(totalGoals.value, 'Total goals', maxChartValue.value))
const configTotalAssists = computed(() => LineChartConfig.getConfig(totalAssists.value, 'Total assists', maxChartValue.value, ['#ff6400']))

const availableYears = computed(() => {
  return _.reverse(_.map(_.keys(gamesStore.getMappedGames()), (year) => {
    return {
      name: year
    }
  }))
})

const periodDataSource = computed(() => {
  return [
    {
      name: 'Last 12 months'
    },
    ...availableYears.value
  ]
})

const getLastMonths = (): string[] => {
  const result: string[] = []
  const d = new Date()
  d.setDate(1)

  _.forEach(MONTHS, () => {
    result.push(MONTHS[d.getMonth()])
    d.setMonth(d.getMonth() - 1)
  })

  return _.reverse(result)
}

const getStats = (attribute: GAME_ATTRIBUTE): number[] => {
  if (state.period === 'Last 12 months')
    return gamesStore.getStatsForLast12Months(attribute, state.mode)
  else
    return gamesStore.getStatsForSelectedYear(attribute, state.period, state.mode)
}

const getMonths = () => {
  return state.period === 'Last 12 months' ? getLastMonths() : MONTHS
}


const barConfig = computed(() => ColumnChartConfig.getConfig(getMonths(), ['#5DB075', '#ff6400']))
const barSeries = computed(() => [
  {
    name: 'Goals',
    data: getStats(GAME_ATTRIBUTE.GOALS)
  },
  {
    name: 'Assists',
    data: getStats(GAME_ATTRIBUTE.ASSISTS)
  }
])


const dataset = computed(() => {
  return [
    {
      name: 'Goals',
      values: getStats(GAME_ATTRIBUTE.GOALS),
      color: '#5f8bee'
    },
    {
      name: 'Assists',
      values: getStats(GAME_ATTRIBUTE.ASSISTS),
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
                values: getMonths(),
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
          text: 'Analytics',
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
      show: false
    }
  }
})
</script>

<style scoped lang="scss">
.analytics-view {
  --van-nav-bar-height: 60px;
  --van-nav-bar-background: var(--main);
  --van-nav-bar-title-text-color: white;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-icon-color: white;
  --van-collapse-item-content-padding: 0 0 0 16px;

  --van-cell-value-font-size: 18px;
  --van-cell-group-inset-padding: 0;
  --van-cell-vertical-padding: 14px;

  --van-picker-action-font-size: 18px;
  --van-picker-confirm-action-color: var(--main);

  display: flex;
  flex-direction: column;
  background-color: var(--theme-1);

  > .content {
    display: flex;
    flex-direction: column;
    gap: $l;
    flex: 1;
    overflow: auto;
    padding: 0 0 $l 0;

    > .charts-total {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-column-gap: 16px;
      margin: 16px 16px 0;
    }

    .vue-apexcharts {
      min-height: auto !important;
    }
  }
}
</style>