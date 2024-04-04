import * as _ from 'lodash'

export class ColumnChartConfig {
  static getConfig(categories: Array<string>, colors: Array<string> = []): object {
    return {
      chart: {
        type: 'bar',
        height: 350,
        background: '#fff',
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
          align: 'center'
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
                fontWeight: 800
              }
            }
          }
        }
      },
      colors: colors,
      xaxis: {
        categories: categories
      },
      yaxis: {
        labels: {
          formatter: (value: number) => _.round(value, 2)
        }
      },
      legend: {
        position: 'bottom',
        fontSize: '14px',
        fontWeight: 600,
        offsetY: -1,
        itemMargin: {
          vertical: 6
        }
      },
      fill: {
        opacity: 1
      }
    }
  }
}
