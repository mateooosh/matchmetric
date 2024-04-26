import { defineStore } from 'pinia'
import GameModel from '../models/GameModel.ts'
import * as _ from 'lodash'
import GameAttribute from '../common/enums/GameAttribute.ts'
import GameType from '../common/enums/GameType.ts'

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

    getRatingForGame(timestamp: number): number {
      const game: GameModel = this.getGameByTimestamp(timestamp)

      const normGoals = game.goals / this.getMaxGoals() || 0
      const normAssists = game.assists / this.getMaxAssists() || 0
      const normDistance = game.distance / this.getMaxDistance() || 0
      const normCalories = game.calories / this.getMaxCalories() || 0

      // sum is equal to 1.1 to prevent situation when only one max rating is possible
      let weightGoals = 0.5
      let weightAssists = 0.3
      let weightDistance = 0.15
      let weightCalories = 0.15

      if (_.isEmpty(game.distance)) {
        weightGoals += weightDistance / 3
        weightAssists += weightDistance / 3
        weightCalories += weightDistance / 3
        weightDistance = 0
      }

      if (_.isEmpty(game.calories)) {
        const divider = weightDistance ? 3 : 2
        weightGoals += weightCalories / divider
        weightAssists += weightCalories / divider
        if (weightDistance) {
          weightDistance += weightCalories / divider
        }

        weightCalories = 0
      }

      const weighted_sum = (normGoals * weightGoals) + (normAssists * weightAssists) + (normDistance * weightDistance) + (normCalories * weightCalories)

      return _.min([_.round(weighted_sum * 10, 1), 10]) || 1
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

    getStatsForSelectedYear(attribute: GameAttribute, period: string, type: string, mode: string): number[] {
      const result: number[] = []

      if (period === 'Last 12 months') {
        return result
      }

      for (let i = 1; i <= 12; i++) {
        const monthKey = _.padStart(_.toString(i), 2, '0')
        let allGamesInMonth: any = this.getMappedGames()?.[period]?.[monthKey]

        if (type === GameType.INSIDE || type === GameType.OUTSIDE) {
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

    getStatsForLast12Months(attribute: GameAttribute, type: string, mode: string): number[] {
      const result: number[] = []
      const d = new Date()
      d.setDate(1)

      for (let i = 0; i < 12; i++) {
        const yearKey = d.getFullYear()
        const monthKey = _.padStart(_.toString(d.getMonth() + 1), 2, '0')
        let allGamesInMonth: any = this.getMappedGames()?.[yearKey]?.[monthKey]

        if (type === GameType.INSIDE || type === GameType.OUTSIDE) {
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

    getAllStatsAsArray(attribute: GameAttribute): number[] {
      return _.reverse(_.map(this.games, (game: GameModel): number => game[attribute]))
    },

    getMaxGoals(): number {
      return _.max(_.map(this.games, (game: GameModel): number => game[GameAttribute.GOALS])) || 0
    },

    getMaxAssists(): number {
      return _.max(_.map(this.games, (game: GameModel): number => game[GameAttribute.ASSISTS])) || 0
    },

    getMaxDistance(): number {
      return _.max(_.map(this.games, (game: GameModel): number => game[GameAttribute.DISTANCE])) || 0
    },

    getMaxCalories(): number {
      return _.max(_.map(this.games, (game: GameModel): number => game[GameAttribute.CALORIES])) || 0
    },

    getTotalStats(attribute: GameAttribute): number {
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
