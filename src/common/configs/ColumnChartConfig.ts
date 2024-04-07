import * as _ from 'lodash'

export class ColumnChartConfig {
  static getConfig(categories: Array<string>, colors: Array<string> = []): object {
    const computedStyle = getComputedStyle(document.getElementsByClassName('app')[0])
    const theme0 = computedStyle.getPropertyValue('--theme-0')
    const theme2 = computedStyle.getPropertyValue('--theme-2')
    const primary = computedStyle.getPropertyValue('--primary')
    const secondary = computedStyle.getPropertyValue('--secondary')

    return {
      chart: {
        type: 'bar',
        height: 350,
        background: theme0,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: false
        }
      },
      title: {
        text: 'Analytics',
        offsetX: 10,
        offsetY: 4,
        align: 'center',
        style: {
          fontSize: '24px',
          align: 'center',
          color: primary
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 8,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 800,
                color: primary
              }
            }
          }
        }
      },
      colors: colors,
      grid: {
        borderColor: theme2
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: secondary
          }
        }
      },
      yaxis: {
        labels: {
          formatter: (value: number) => _.round(value, 2),
          style: {
            colors: secondary
          }
        }
      },
      legend: {
        position: 'bottom',
        fontSize: '14px',
        fontWeight: 600,
        offsetY: -1,
        itemMargin: {
          vertical: 6
        },
        labels: {
          colors: primary
        }
      },
      fill: {
        opacity: 1
      }
    }
  }
}
