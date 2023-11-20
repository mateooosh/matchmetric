import GAME_TYPE from '../common/enums/GAME_TYPE.ts'
import GAME_RESULT from '../common/enums/GAME_RESULT.ts'

export default class GameModel {
  timestamp: number
  type: GAME_TYPE
  result: GAME_RESULT
  date: string
  goals: number
  assists: number

  constructor(timestamp: number, type: GAME_TYPE, result: GAME_RESULT, date: string, goals: number, assists: number) {
    this.timestamp = timestamp
    this.type = type
    this.result = result
    this.date = date
    this.goals = goals
    this.assists = assists
  }
}
