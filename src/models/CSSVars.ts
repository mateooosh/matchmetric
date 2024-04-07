export default class CSSVars {
  static getMain(): string {
    return getStyle().getPropertyValue('--main')
  }

  static getPrimary(): string {
    return getStyle().getPropertyValue('--primary')
  }

  static getSecondary(): string {
    return getStyle().getPropertyValue('--secondary')
  }

  static getTheme0(): string {
    return getStyle().getPropertyValue('--theme-0')
  }

  static getTheme1(): string {
    return getStyle().getPropertyValue('--theme-1')
  }

  static getTheme2(): string {
    return getStyle().getPropertyValue('--theme-2')
  }
}

const getStyle = (): any => getComputedStyle(document.getElementsByClassName('app')[0])
