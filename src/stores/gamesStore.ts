import { defineStore } from 'pinia'
import GameModel from '../models/GameModel.ts'
import * as _ from 'lodash'

const STORAGE_KEY = 'games'

interface State {
  games: Array<GameModel>
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

    concatGames(games: Array<GameModel>) {
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

    getMappedGames(): { [key: string]: { [key: string]: GameModel[] } } {
      const groupedByYear = _.groupBy(this.games, (game: GameModel) => _.split(game.date, '-')[2])
      const groupedByYearAndMonth = _.mapValues(groupedByYear, (games) => _.groupBy(games, (game: GameModel) => _.split(game.date, '-')[1]))
      return groupedByYearAndMonth
    },

    clear() {
      this.games = []
      this.setGamesIsLocalStorage()
    }
  }
})

export default useGamesStore
