import * as _ from 'lodash'

export default class SettingsModel {
  showDistance: boolean
  showDuration: boolean
  showCalories: boolean
  shortFormOfStats: boolean
  darkTheme: boolean
  showRating: boolean

  constructor(showDistance: boolean, showDuration: boolean, showCalories: boolean, shortFormOfStats: boolean, darkTheme: boolean, showRating: boolean) {
    this.showDistance = _.isNil(showDistance) || showDistance
    this.showDuration = _.isNil(showDuration) || showDuration
    this.showCalories = _.isNil(showCalories) || showCalories
    this.shortFormOfStats = _.isNil(shortFormOfStats) || shortFormOfStats
    this.darkTheme = !_.isNil(darkTheme) && darkTheme // false as default
    this.showRating = _.isNil(showRating) || showRating
  }

  static fromJSON(json: any): SettingsModel {
    return new SettingsModel(json.showDistance, json.showDuration, json.showCalories, json.shortFormOfStats, json.darkTheme, json.showRating)
  }
}
