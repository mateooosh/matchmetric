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


      <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-column-gap: 16px; margin: 16px 16px 0;">
<!--        <div style="display: flex; gap: 8px; align-items: center; justify-content: center; padding: 12px; border-radius: 8px; background-color: white; font-size: 18px; color: #323233;">-->
<!--          <BallIcon color="#333" height="32px" width="32px"/>-->
<!--          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">-->
<!--            <div style="color: #808080;">Goals</div>-->
<!--            <div style="font-weight: 600;">{{ totalGoals }}</div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div style="display: flex; gap: 8px; align-items: center; justify-content: center; padding: 12px; border-radius: 8px; background-color: white; font-size: 18px; color: #323233;">-->
<!--          <AssistIcon color="#333" height="32px" width="32px"/>-->
<!--          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">-->
<!--            <div style="color: #808080;">Assists</div>-->
<!--            <div style="font-weight: 600;">{{ totalAssists }}</div>-->
<!--          </div>-->
<!--        </div>-->

        <div>
          <apexchart height="185" type="line" :options="configTotalGoals" :series="datasetTotalGoals"></apexchart>
        </div>
        <div>
          <apexchart height="185" type="line" :options="configTotalAssists" :series="datasetTotalAssists"></apexchart>
        </div>
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
        <van-popup v-model:show="state.showPicker" round position="bottom">
          <van-picker title="Choose period"
                      :columns="periodDataSource"
                      @cancel="state.showPicker = false"
                      @confirm="onConfirm"
          />
        </van-popup>
      </van-cell-group>
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
// import BallIcon from '../common/icons/BallIcon.vue'
// import AssistIcon from '../common/icons/AssistIcon.vue'

const router = useRouter()
const gamesStore = useGamesStore()

const state = reactive({
  mode: 'Total',
  period: 'Last 12 months',
  showPicker: false
})

// const options = {
//   chart: {
//     height: 350,
//     type: 'line',
//     zoom: {
//       enabled: false
//     }
//   },
//   dataLabels: {
//     enabled: false
//   },
//   legend: {
//     show: false
//   },
//   stroke: {
//     curve: 'smooth'
//   },
//   title: {
//     text: 'Statistics',
//     align: 'left'
//   },
//   grid: {
//     row: {
//       colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//       opacity: 0.5
//     },
//   },
//   xaxis: {
//     labels: {
//       show: false
//     }
//   },
//   yaxis: {
//     min: 33,
//     max: 75,
//     labels: {
//       show: true
//     }
//   }
// }

// const series = [{
//   name: 'Goals',
//   type: 'line',
//   data: [55, 69, 45, 61, 43, 54, 37, 52]
// }]

const onClickLeft = () => {
  router.push({ name: 'settings' })
}

const modeSegments = [
  new SegmentModel('Total'),
  new SegmentModel('Average')
]

const hasGames = computed(() => _.size(gamesStore.games))
// const totalGoals = computed(() => gamesStore.getTotalStats('goals'))
// const totalAssists = computed(() => gamesStore.getTotalStats('assists'))

const availableYears = computed(() => {
  return _.reverse(_.map(_.keys(gamesStore.getMappedGames()), (year) => {
    return {
      text: year,
      value: year
    }
  }))
})

const periodDataSource = computed(() => {
  return [
    {
      text: 'Last 12 months',
      value: 'Last 12 months'
    },
    ...availableYears.value
  ]
})

const onConfirm = ({ selectedOptions }) => {
  state.showPicker = false
  state.period = selectedOptions[0].text
}

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

const getStats = (attribute: 'goals' | 'assists'): number[] => {
  if (state.period === 'Last 12 months')
    return gamesStore.getStatsForLast12Months(attribute, state.mode)
  else
    return gamesStore.getStatsForSelectedYear(attribute, state.period, state.mode)
}

const getMonths = () => {
  return state.period === 'Last 12 months' ? getLastMonths() : MONTHS
}

const dataset = computed(() => {
  return [
    {
      name: 'Goals',
      values: getStats('goals'),
      color: '#5f8bee'
    },
    {
      name: 'Assists',
      values: getStats('assists'),
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

const datasetTotalGoals = computed(() => {
  return [{
    name: 'Goals',
    type: 'line',
    data: gamesStore.getStatsAsArray('goals')
  }]
})

const datasetTotalAssists = computed(() => {
  return [{
    name: 'Assists',
    type: 'line',
    data: gamesStore.getStatsAsArray('assists')
  }]
})

const configTotalGoals = computed(() => {
  const totalGoals = gamesStore.getStatsAsArray('goals')
  const totalAssists = gamesStore.getStatsAsArray('assists')

  return {
    chart: {
      type: 'line',
      background: '#fff',
      width: '100%',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    title: {
      text: gamesStore.getTotalStats('goals'),
      offsetX: 10,
      offsetY: 4,
      style: {
        fontSize: '24px',
        align: 'center',
      }
    },
    subtitle: {
      text: 'Total goals',
      offsetX: 10,
      style: {
        fontSize: '14px',
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    stroke: {
      curve: 'smooth'
    },
    colors: ['#5DB075'],
    grid: {
      borderColor: '#eee',
      padding: {
        top: -20,
        left: 0
      }
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      min: 0,
      max: _.max([...totalGoals, ...totalAssists]),
      labels: {
        show: false
      }
    },
    tooltip: {
      show: false
    }
  }
})

const configTotalAssists = computed(() => {
  const totalGoals = gamesStore.getStatsAsArray('goals')
  const totalAssists = gamesStore.getStatsAsArray('assists')

  return {
    chart: {
      type: 'line',
      background: '#fff',
      width: '100%',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    title: {
      text: gamesStore.getTotalStats('assists'),
      offsetX: 10,
      offsetY: 4,
      style: {
        fontSize: '24px',
        align: 'center',
      }
    },
    subtitle: {
      text: 'Total assists',
      offsetX: 10,
      style: {
        fontSize: '14px',
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    stroke: {
      curve: 'smooth'
    },
    colors: ['#ff6400'],
    grid: {
      borderColor: '#eee',
      padding: {
        top: -20,
        left: 0
      }
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      min: 0,
      max: _.max([...totalGoals, ...totalAssists]),
      labels: {
        show: false
      }
    },
    tooltip: {
      show: false
    }
  }
})

</script>

<style scoped lang="scss">
.analytics-view {
  --van-nav-bar-height: 60px;
  --van-nav-bar-background: #5DB075;
  --van-nav-bar-title-text-color: white;
  --van-nav-bar-arrow-size: 32px;
  --van-nav-bar-icon-color: white;
  --van-collapse-item-content-padding: 0 0 0 16px;

  --van-cell-value-font-size: 18px;
  --van-cell-group-inset-padding: 0;
  --van-cell-vertical-padding: 14px;

  --van-picker-action-font-size: 18px;
  --van-picker-confirm-action-color: #5DB075;

  //--van-cell-font-size: 18px;
  //--van-cell-vertical-padding: 16px;
  //
  //--van-cell-group-inset-padding: 16px;

  display: flex;
  flex-direction: column;
  background-color: #eff2f5;
  //background-color: #eff2f5;

  > .content {
    display: flex;
    flex-direction: column;
    gap: $l;
    flex: 1;
    overflow: auto;
    padding: 0 0 $l 0;
  }
}
</style>