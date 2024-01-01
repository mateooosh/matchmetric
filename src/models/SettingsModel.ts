import * as _ from 'lodash'

export default class SettingsModel {
  showDistance: boolean
  showDuration: boolean
  showCalories: boolean

  constructor(showDistance: boolean, showDuration: boolean, showCalories: boolean) {
    this.showDistance = _.isNil(showDistance) || showDistance
    this.showDuration = _.isNil(showDuration) || showDuration
    this.showCalories = _.isNil(showCalories) || showCalories
  }

  static fromJSON(json: any): SettingsModel {
    return new SettingsModel(json.showDistance, json.showDuration, json.showCalories)
  }
}
