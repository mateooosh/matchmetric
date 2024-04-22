import { defineStore } from 'pinia'
import GameModel from '../models/GameModel.ts'
import * as _ from 'lodash'
import GAME_ATTRIBUTE from '../common/enums/GAME_ATTRIBUTE.ts'
import GAME_TYPE from '../common/enums/GAME_TYPE.ts'

const STORAGE_KEY = 'games'

interface State {
  games: GameModel[]
}

export const useGamesStore = defineStore(STORAGE_KEY, {
  state: (): State => ({
    games: _.map(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'), GameModel.fromJSON)
  }),

  actions: {
    addGame(game: GameModel) {
      this.games.unshift(game)
      this.setGamesIsLocalStorage()
    },

    editGame(game: GameModel) {
      const index = _.findIndex(this.games, ['timestamp', game.timestamp])
      this.games[index] = game
      this.setGamesIsLocalStorage()
    },

    deleteGame(timestamp: number) {
      this.games = _.filter(this.games, (game: GameModel) => game.timestamp !== timestamp)
      this.setGamesIsLocalStorage()
    },

    concatGames(games: GameModel[]) {
      const filteredGames = _.filter(games, (x) => !_.some(this.games, y => x.timestamp === y.timestamp))
      this.games = _.concat(this.games, filteredGames)
      this.setGamesIsLocalStorage()
    },

    setGamesIsLocalStorage() {
      this.sortGamesByDate()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.games))
    },

    sortGamesByDate() {
      this.games.sort((game1, game2) => game2.getDate().getTime() - game1.getDate().getTime())
    },

    getGameByTimestamp(timestamp: number): GameModel {
      return _.find(this.games, (game: GameModel): boolean => game.timestamp === timestamp) as GameModel
    },

    getNextGameByTimestamp(timestamp: number): GameModel {
      const index = _.findIndex(this.games, (game: GameModel): boolean => game.timestamp === timestamp)
      return this.games[index + 1] as GameModel
    },

    getPreviousGameByTimestamp(timestamp: number): GameModel {
      const index = _.findIndex(this.games, (game: GameModel): boolean => game.timestamp === timestamp)
      return this.games[index - 1] as GameModel
    },

    getMappedGames(): { [key: string]: { [key: string]: GameModel[] } } {
      const groupedByYear = _.groupBy(this.games, (game: GameModel) => _.split(game.date, '-')[2])
      const groupedByYearAndMonth = _.mapValues(groupedByYear, (games) => _.groupBy(games, (game: GameModel) => _.split(game.date, '-')[1]))
      return groupedByYearAndMonth
    },

    getStatsForSelectedYear(attribute: GAME_ATTRIBUTE, period: string, type: string, mode: string): number[] {
      const result: number[] = []

      if (period === 'Last 12 months') {
        return result
      }

      for (let i = 1; i <= 12; i++) {
        const monthKey = _.padStart(_.toString(i), 2, '0')
        let allGamesInMonth: any = this.getMappedGames()?.[period]?.[monthKey]

        if (type === GAME_TYPE.INSIDE || type === GAME_TYPE.OUTSIDE) {
          allGamesInMonth = _.filter(allGamesInMonth, ['type', type])
        }

        let valuesByMonth = _.reduce(allGamesInMonth, (result, game: GameModel) => {
          return result + game[attribute]
        }, 0)

        if (mode === 'Average' && _.size(allGamesInMonth)) {
          valuesByMonth /= _.size(allGamesInMonth)
        }

        result.push(valuesByMonth)
      }

      return result
    },

    getStatsForLast12Months(attribute: GAME_ATTRIBUTE, type: string, mode: string): number[] {
      const result: number[] = []
      const d = new Date()
      d.setDate(1)

      for (let i = 0; i < 12; i++) {
        const yearKey = d.getFullYear()
        const monthKey = _.padStart(_.toString(d.getMonth() + 1), 2, '0')
        let allGamesInMonth: any = this.getMappedGames()?.[yearKey]?.[monthKey]

        if (type === GAME_TYPE.INSIDE || type === GAME_TYPE.OUTSIDE) {
          allGamesInMonth = _.filter(allGamesInMonth, ['type', type])
        }

        let valuesByMonth = _.reduce(allGamesInMonth, (result, game: GameModel) => {
          return result + game[attribute]
        }, 0)

        if (mode === 'Average' && _.size(allGamesInMonth)) {
          valuesByMonth /= _.size(allGamesInMonth)
        }

        result.push(_.round(valuesByMonth, 1))
        d.setMonth(d.getMonth() - 1)
      }

      return _.reverse(result)
    },

    getAllStatsAsArray(attribute: GAME_ATTRIBUTE): number[] {
      return _.reverse(_.map(this.games, (game: GameModel): number => game[attribute]))
    },

    getTotalStats(attribute: GAME_ATTRIBUTE): number {
      return _.reduce(this.games, (result, game: GameModel) => {
        return result + game[attribute]
      }, 0)
    },

    clear() {
      this.games = []
      this.setGamesIsLocalStorage()
    }
  }
})

export default useGamesStore
