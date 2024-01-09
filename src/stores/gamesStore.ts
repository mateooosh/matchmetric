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

    concatGames(games: Array<GameModel>) {
      const filteredGames = _.filter(games, (x) => !_.some(this.games, y => x.timestamp === y.timestamp))
      this.games = _.concat(this.games, filteredGames)
      this.setGamesIsLocalStorage()
    },

    setGamesIsLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.games))
    },

    getGameByTimestamp(timestamp: number) {
      return this.games.find((game: GameModel): boolean => game.timestamp === timestamp)
    }
  }
})

export default useGamesStore
