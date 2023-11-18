export default class GameModel {
  type: string
  result: string
  date: string
  goals: number
  assists: number

  constructor(type: string, result: string, date: string, goals: number, assists: number) {
    this.type = type
    this.result = result
    this.date = date
    this.goals = goals
    this.assists = assists
  }
}
