/// <reference types="cypress" />
import SettingsPO from '../page-object/SettingsPO'
import GameResult from '../../src/common/enums/GameResult.ts'
import EditGamePO from '../page-object/EditGamePO.ts'
import HomePO from '../page-object/HomePO.ts'
import GameDetailsPO from '../page-object/GameDetailsPO.ts'
import * as _ from 'lodash'

const homePO = new HomePO()
const settingsPO = new SettingsPO()
const editGamePO = new EditGamePO()
const gameDetailsPO = new GameDetailsPO()

describe('Settings test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('Should set dark theme', () => {
    settingsPO.navigateToSettings()

    settingsPO.verifyDarkThemeSwitchOff()
    settingsPO.verifyTheme(false)

    settingsPO.getDarkThemeSwitch().click()

    settingsPO.verifyDarkThemeSwitchOn()
    settingsPO.verifyTheme(true)
  })

  it('Should delete data', () => {
    editGamePO.navigateToCreateGame()
    editGamePO.changeResultOfGame(GameResult.WIN)
    editGamePO.saveGame()

    editGamePO.navigateToCreateGame()
    editGamePO.changeResultOfGame(GameResult.DRAW)
    editGamePO.saveGame()

    settingsPO.navigateToSettings()

    settingsPO.getDarkThemeSwitch().click()

    settingsPO.getDeleteCell().click()
    settingsPO.verifyDeleteDialogVisible()
    settingsPO.verifyDeleteDialogHeaderText('Delete saved games and settings?')
    settingsPO.verifyDeleteDialogMessageText('The games and settings will be permanently deleted and you won\'t be able to revert it.')
    settingsPO.getDeleteDialogConfirmButton().click()

    settingsPO.verifyDarkThemeSwitchOff()
    settingsPO.verifyTheme(false)

    homePO.navigateToHome()
    homePO.verifyGameRowsCount(0)
  })

  it('Should set short form of stats', () => {
    editGamePO.navigateToCreateGame()
    editGamePO.setGoals(40)
    editGamePO.setAssists(44)
    editGamePO.saveGame()

    homePO.navigateToHome()
    homePO.verifyShortFormGoalsNumber(0, 40)
    homePO.verifyShortFormAssistsNumber(0, 44)

    settingsPO.navigateToSettings()
    settingsPO.verifyShortFormOfStatsSwitchOn()
    settingsPO.getShortFormOfStatsSwitch().click()
    settingsPO.verifyShortFormOfStatsSwitchOff()

    homePO.navigateToHome()
    homePO.verifyGoalIconsCount(0, 40)
    homePO.verifyAssistIconsCount(0, 44)
  })

  it('Should import and export data', async () => {
    settingsPO.navigateToSettings()
    settingsPO.importFile('cypress/fixtures/matchmetric.json')

    settingsPO.verifyTheme(true)
    homePO.navigateToHome()
    homePO.verifyGameRowsCount(6)
    homePO.verifyRating(0, 9.4)
    homePO.verifyRatingBackgroundColor(0, 'rgb(11, 121, 42)')

    settingsPO.navigateToSettings()
    settingsPO.getExportCell().click()

    cy.fixture('matchmetric.json').then(importedFile => {
      cy.readFile('cypress/downloads/matchmetric.json').then(exportedFile => {
        assert(_.isEqual(exportedFile, importedFile), 'Files are equal')
      })
    })
  })

  it('Should toggle attributes', async () => {
    settingsPO.navigateToSettings()
    settingsPO.importFile('cypress/fixtures/matchmetric.json')
    settingsPO.navigateToSettings()
    settingsPO.getAttributesCollapse().click()

    settingsPO.verifyShowGoalsSwitchIsOnAndDisabled()
    settingsPO.verifyShowAssistsSwitchIsOnAndDisabled()
    settingsPO.verifyShowDistanceSwitch(true)
    settingsPO.verifyShowDurationSwitch(true)
    settingsPO.verifyShowCaloriesSwitch(true)

    settingsPO.getShowDistanceSwitch().click()
    settingsPO.getShowDurationSwitch().click()
    settingsPO.getShowCaloriesSwitch().click()

    settingsPO.verifyShowDistanceSwitch(false)
    settingsPO.verifyShowDurationSwitch(false)
    settingsPO.verifyShowCaloriesSwitch(false)


    homePO.navigateToHome()
    homePO.getGameRowByIndex(0).click()

    gameDetailsPO.getDistance().should('not.exist')
    gameDetailsPO.getDuration().should('not.exist')
    gameDetailsPO.getCalories().should('not.exist')
  })
})

// https://docs.cypress.io/guides/tooling/typescript-support