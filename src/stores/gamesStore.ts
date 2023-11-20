import { defineStore } from 'pinia'
import GameModel from '../models/GameModel.ts'

const STORAGE_KEY = 'games'

interface State {
  games: Array<GameModel>
}

export const useGamesStore = defineStore(STORAGE_KEY, {
  state: (): State => ({
    games: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }),

  actions: {
    addGame(game: GameModel) {
      this.games.unshift(game)
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
