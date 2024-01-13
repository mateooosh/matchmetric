import GAME_TYPE from '../common/enums/GAME_TYPE.ts'
import GAME_RESULT from '../common/enums/GAME_RESULT.ts'
import * as _ from 'lodash'

export default class GameModel {
  timestamp: number
  type: GAME_TYPE
  result: GAME_RESULT
  date: string
  goals: number
  assists: number
  distance: number
  duration: string
  calories: number

  constructor(timestamp: number, type: GAME_TYPE, result: GAME_RESULT, date: string, goals: number, assists: number, distance: number, duration: string, calories: number) {
    this.timestamp = timestamp
    this.type = type
    this.result = result
    this.date = date
    this.goals = goals
    this.assists = assists
    this.distance = distance
    this.duration = duration
    this.calories = calories
  }

  getDate () {
    return new Date(_.join(_.reverse(_.split(this.date, '-')), '-'))
  }

  static fromJSON(json: any): GameModel {
    return new GameModel(json.timestamp, json.type, json.result, json.date, json.goals, json.assists, json.distance, json.duration, json.calories)
  }
}
