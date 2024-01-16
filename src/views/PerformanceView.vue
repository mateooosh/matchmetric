<template>
  <!--  https://vue-data-ui.graphieros.com/docs#vue-ui-xy-->
  <div class="performance-view">
    <van-nav-bar title="Performance"
                 left-arrow
                 @click-left="onClickLeft"/>
    <div class="content">
      Last 12 months
      <VueUiXy :dataset="dataset" :config="config"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useGamesStore from '../stores/gamesStore'
import * as _ from 'lodash'

import { VueUiXy, VueUiXyDatasetItem } from 'vue-data-ui'
import { MONTHS } from '../common/consts/consts.ts'

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

const dataset: VueUiXyDatasetItem[] = [
  {
    name: "Goals",
    series: [10, 12, 21, 7, 16, 19, 8, 13, 21, 34, 22, 24],
    type: 'bar',
    color: "rgb(66,211,146)",
    dataLabels: false,
    // useArea: true,
    smooth: true
  },
  {
    name: "Assists",
    series: [22, 11, 21, 13, 8, 25, 13, 24, 21, 19, 15, 18],
    type: 'bar',
    color: 'rgb(95,139,238)',
    // useProgression: true,
    dataLabels: false,
    // useArea: true,
    shape: 'triangle',
    smooth: true
  },
  {
    name: "All",
    series: [32, 23, 42, 20, 24, 44, 21, 37, 42, 53, 37, 42],
    type: 'line',
    color: 'rgb(162,0,225)',
    // useProgression: true,
    dataLabels: false,
    // useArea: true,
    smooth: true
  }
]

const config = {
  useCssAnimation: true,
  useCanvas: false,
  chart: {
    // backgroundColor: "#F3F4F6",
    color: "#1A1A1A",
    height: 300,
    width: 400,
    highlighter: {
      color: "#1A1A1A",
      opacity: 10
    },
    zoom: {
      show: true,
      color: "#42d392"
    },
    padding: {
      top: 16,
      right: 12,
      bottom: 36,
      left: 28
    },
    grid: {
      stroke: "#C4C4C4",
      labels: {
        show: true,
        color: "#1A1A1A",
        fontSize: 12,
        axis: {
          // yLabel: "yLabel",
          // xLabel: "xLabel",
          // fontSize: 12
        },
        xAxisLabels: {
          color: "#1A1A1A",
          show: true,
          showOnlyFirstAndLast: false,
          values: getLastMonths(),
          fontSize: 8
        }
      }
    },
    labels: {
      fontSize: 7
    },
    legend: {
      show: true,
      color: "#1A1A1A",
      useDiv: true,
      fontSize: 20
    },
    title: {
      show: true,
      text: "Performance",
      color: "#1A1A1A",
      fontSize: 20,
      bold: true
      // subtitle: {
      //   fontSize: 16,
      //   color: "#565656",
      //   text: "Subtitle"
      // }
    },
    tooltip: {
      color: "#1A1A1A",
      backgroundColor: "#FFFFFF",
      show: true,
      showValue: true,
      showPercentage: false,
      roundingValue: 0,
      roundingPercentage: 0
    },
    userOptions: {
      show: false
      // title: "options",
      // labels: {
      //   dataLabels: "Show datalabels",
      //   titleInside: "Title inside",
      //   legendInside: "Legend inside",
      //   showTable: "Show table"
      // }
    }
  },
  // bar: {
  //   borderRadius: 2,
  //   useGradient: true,
  //   labels: {
  //     show: true,
  //     offsetY: -6,
  //     rounding: 0,
  //     color: "#1A1A1A"
  //   }
  // },
  line: {
    radius: 3,
    useGradient: true,
    strokeWidth: 2.5,
    labels: {
      show: true,
      // offsetY: -6,
      rounding: 0,
      color: "#1A1A1A"
    },
    area: {
      useGradient: true,
      opacity: 30
    }
  },
  plot: {
    radius: 3,
    useGradient: true,
    labels: {
      show: false,
      offsetY: -6,
      rounding: 0,
      color: "#1A1A1A"
    }
  }
  // table: {
  //   rounding: 0,
  //   th: {
  //     backgroundColor: "#F3F4F6",
  //     color: "#1A1A1A",
  //     outline: "1px solid #C4C4C4"
  //   },
  //   td: {
  //     backgroundColor: "#F3F4F6",
  //     color: "#1A1A1A",
  //     outline: "1px solid #C4C4C4"
  //   }
  // }
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
  }
}
</style>