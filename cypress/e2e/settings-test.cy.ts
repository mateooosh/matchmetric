/// <reference types="cypress" />
import SettingsPO from '../page-object/SettingsPO'
import GameResult from '../../src/common/enums/GameResult.ts'
import EditGamePO from '../page-object/EditGamePO.ts'
import HomePO from '../page-object/HomePO.ts'
import * as _ from 'lodash'

const homePO = new HomePO()
const settingsPO = new SettingsPO()
const editGamePO = new EditGamePO()

describe('Settings test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('Should set dark theme', () => {
    settingsPO.navigateToSettings()

    settingsPO.getDarkThemeSwitch().should('not.have.class', 'van-switch--on')
    settingsPO.getApp().should('not.have.class', 'dark')

    settingsPO.getDarkThemeSwitch().click()

    settingsPO.getDarkThemeSwitch().should('have.class', 'van-switch--on')

    settingsPO.getApp().should('have.class', 'dark')
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
    settingsPO.getDeleteDialog().should('be.visible', true)
    settingsPO.getDeleteDialogHeader().should('have.text', 'Delete saved games and settings?')
    settingsPO.getDeleteDialogMessage().should('have.text', 'The games and settings will be permanently deleted and you won\'t be able to revert it.')
    settingsPO.getDeleteDialogConfirmButton().click()

    settingsPO.getDarkThemeSwitch().should('not.have.class', 'van-switch--on')
    settingsPO.getApp().should('not.have.class', 'dark')

    homePO.navigateToHome()
    homePO.getGameRows().should('have.length', 0)
  })

  it('Should set short form of stats', () => {
    editGamePO.navigateToCreateGame()
    editGamePO.setGoals(40)
    editGamePO.setAssists(44)
    editGamePO.saveGame()

    homePO.navigateToHome()
    homePO.getGameRowByIndex(0).find('.stats').find('.short-form').eq(0).should('have.text', 40)
    homePO.getGameRowByIndex(0).find('.stats').find('.short-form').eq(1).should('have.text', 44)

    settingsPO.navigateToSettings()
    settingsPO.getShortFormOfStatsSwitch().should('have.class', 'van-switch--on')
    settingsPO.getShortFormOfStatsSwitch().click()
    settingsPO.getShortFormOfStatsSwitch().should('not.have.class', 'van-switch--on')

    homePO.navigateToHome()
    homePO.getGameRowByIndex(0).find('.stats').find('.ball-icon').should('have.length', 40)
    homePO.getGameRowByIndex(0).find('.stats').find('.assist-icon').should('have.length', 44)
  })

  it('Should import and export data', async () => {
    settingsPO.navigateToSettings()
    settingsPO.getImportCell().selectFile('cypress/fixtures/matchmetric.json', { force: true })

    settingsPO.getApp().should('have.class', 'dark')
    homePO.navigateToHome()
    homePO.getGameRows().should('have.length', 6)
    homePO.getGameRatingByIndex(0).should('have.text', 9.4)
    homePO.getGameRatingByIndex(0).should('have.css', 'background-color', 'rgb(11, 121, 42)')

    settingsPO.navigateToSettings()
    settingsPO.getExportCell().click()

    cy.fixture('matchmetric.json').then(importedFile => {
      cy.readFile('cypress/downloads/matchmetric.json').then(exportedFile => {
        assert(_.isEqual(exportedFile, importedFile), 'Files are equal')
      })
    })
  })
})

// https://docs.cypress.io/guides/tooling/typescript-support