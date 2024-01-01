import { defineStore } from 'pinia'
import SettingsModel from '../models/SettingsModel.ts'

const STORAGE_KEY = 'settings'

interface State {
  settings: SettingsModel
}

export const useSettingsStore = defineStore(STORAGE_KEY, {
  state: (): State => ({
    settings: SettingsModel.fromJSON(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'))
  }),

  actions: {
    setSettingsIsLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
    }
  }
})

export default useSettingsStore
