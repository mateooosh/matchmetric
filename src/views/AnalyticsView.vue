<template>
  <div class="analytics-view">
    <van-nav-bar title="Analytics"
                 left-arrow
                 @click-left="onClickLeft"/>

    <div v-if="hasGames" class="content">
      <div class="charts-total">
        <apexchart height="185" type="line" :options="configTotalGoals" :series="datasetTotalGoals"/>
        <apexchart height="185" type="line" :options="configTotalAssists" :series="datasetTotalAssists"/>
      </div>

      <van-cell-group>
        <Field v-model="state.period"
               is-link
               readonly
               label="Period"
               placeholder="Choose period"
               @click="state.showPicker = true"/>
        <van-action-sheet v-model:show="state.showPicker" :actions="periodDataSource" @select="onConfirm"/>

        <Field label="Type">
          <template #input>
            <SegmentedControls v-model="state.type" :segments="typeSegments"/>
          </template>
        </Field>
        <Field label="Mode">
          <template #input>
            <SegmentedControls v-model="state.mode" :segments="modeSegments"/>
          </template>
        </Field>

      </van-cell-group>
      <apexchart type="bar" height="350" :options="barConfig" :series="barSeries"/>
    </div>
    <van-empty v-else description="No games found"/>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useGamesStore from '../stores/gamesStore'
import * as _ from 'lodash'

import { MONTHS } from '../common/consts/consts.ts'
import Field from '../components/Field.vue'
import SegmentedControls from '../components/SegmentedControls.vue'
import { computed, reactive } from 'vue'
import SegmentModel from '../models/SegmentModel.ts'
import { LineChartConfig } from '../common/configs/LineChartConfig.ts'
import { ColumnChartConfig } from '../common/configs/ColumnChartConfig.ts'
import GameAttribute from '../common/enums/GameAttribute.ts'
import GameType from '../common/enums/GameType.ts'

const router = useRouter()
const gamesStore = useGamesStore()

const state = reactive({
  period: 'Last 12 months',
  type: 'All',
  mode: 'Total',
  showPicker: false
})

const onClickLeft = () => {
  router.push({ name: 'settings' })
}

const typeSegments: Array<SegmentModel> = [
  new SegmentModel('All'),
  new SegmentModel(GameType.INSIDE),
  new SegmentModel(GameType.OUTSIDE)
]

const modeSegments: Array<SegmentModel> = [
  new SegmentModel('Total'),
  new SegmentModel('Average')
]

const hasGames = computed(() => _.size(gamesStore.games))
const totalGoals = computed(() => gamesStore.getTotalStats(GameAttribute.GOALS))
const totalAssists = computed(() => gamesStore.getTotalStats(GameAttribute.ASSISTS))
const allGoalsArray = computed(() => gamesStore.getAllStatsAsArray(GameAttribute.GOALS))
const allAssistsArray = computed(() => gamesStore.getAllStatsAsArray(GameAttribute.ASSISTS))
const maxChartValue = computed(() => _.max([...allGoalsArray.value, ...allAssistsArray.value]) || 0)

const onConfirm = ({ name }) => {
  state.showPicker = false
  state.period = name
}

const datasetTotalGoals = computed(() => {
  return [{
    name: 'Goals',
    type: 'line',
    data: gamesStore.getAllStatsAsArray(GameAttribute.GOALS)
  }]
})

const datasetTotalAssists = computed(() => {
  return [{
    name: 'Assists',
    type: 'line',
    data: gamesStore.getAllStatsAsArray(GameAttribute.ASSISTS)
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

const getStats = (attribute: GameAttribute): number[] => {
  if (state.period === 'Last 12 months')
    return gamesStore.getStatsForLast12Months(attribute, state.type, state.mode)
  else
    return gamesStore.getStatsForSelectedYear(attribute, state.period, state.type, state.mode)
}

const getMonths = () => {
  return state.period === 'Last 12 months' ? getLastMonths() : MONTHS
}

const barConfig = computed(() => ColumnChartConfig.getConfig(getMonths(), ['#5DB075', '#ff6400']))
const barSeries = computed(() => [
  {
    name: 'Goals',
    data: getStats(GameAttribute.GOALS)
  },
  {
    name: 'Assists',
    data: getStats(GameAttribute.ASSISTS)
  }
])
</script>

<style scoped lang="scss">
.analytics-view {
  --van-cell-group-inset-padding: 0;
  --van-cell-vertical-padding: 14px;

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