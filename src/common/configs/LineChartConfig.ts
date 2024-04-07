import CSSVars from '../../models/CSSVars.ts'

export class LineChartConfig {
  static getConfig (title: string | number, subtitle: string | number, max: number, colors: Array<string> = ['#5DB075']): object {
    const theme0 = CSSVars.getTheme0()
    const theme2 = CSSVars.getTheme2()
    const primary = CSSVars.getPrimary()

    return {
      chart: {
        type: 'line',
        background: theme0,
        width: '100%',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      title: {
        text: title,
        offsetX: 10,
        offsetY: 4,
        style: {
          fontSize: '24px',
          align: 'center',
          color: primary
        }
      },
      subtitle: {
        text: subtitle,
        offsetX: 10,
        style: {
          fontSize: '14px',
          color: primary
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
      colors: colors,
      grid: {
        borderColor: theme2,
        padding: {
          top: -20,
          left: 0
          // left: -10,
          // right: -10
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
        max: max,
        labels: {
          show: false
        }
      },
      tooltip: {
        show: false
      }
    }
  }
}
