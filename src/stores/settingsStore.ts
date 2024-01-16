import { defineStore } from 'pinia'
import SettingsModel from '../models/SettingsModel.ts'
import * as _ from 'lodash'

const STORAGE_KEY = 'settings'

interface State {
  settings: SettingsModel
}

export const useSettingsStore = defineStore(STORAGE_KEY, {
  state: (): State => ({
    settings: SettingsModel.fromJSON(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'))
  }),

  actions: {
    assignSettings(importedSettings: SettingsModel) {
      _.assign(this.settings, importedSettings)
    },

    setSettingsIsLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
    },

    clear() {
      this.settings = SettingsModel.fromJSON({})
      this.setSettingsIsLocalStorage()
    }
  }
})

export default useSettingsStore
