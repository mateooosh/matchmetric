/// <reference types="cypress" />
import SettingsPO from '../page-object/SettingsPO'
import GAME_RESULT from '../../src/common/enums/GAME_RESULT.ts'
import EditGamePO from '../page-object/EditGamePO.ts'
import HomePO from '../page-object/HomePO.ts'

const homePO = new HomePO()
const settingsPO = new SettingsPO()
const editGamePO = new EditGamePO()

describe('Settings test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('Should set dark theme', () => {
    settingsPO.navigateToSettings()

    settingsPO.getDarkTheme().should('not.have.class', 'van-switch--on')
    settingsPO.getApp().should('not.have.class', 'dark')

    settingsPO.getDarkTheme().click()

    settingsPO.getDarkTheme().should('have.class', 'van-switch--on')

    settingsPO.getApp().should('have.class', 'dark')
  })

  it('Should delete data', () => {
    editGamePO.navigateToCreateGame()
    editGamePO.changeResultOfGame(GAME_RESULT.WIN)
    editGamePO.saveGame()

    editGamePO.navigateToCreateGame()
    editGamePO.changeResultOfGame(GAME_RESULT.DRAW)
    editGamePO.saveGame()

    settingsPO.navigateToSettings()

    settingsPO.getDarkTheme().click()

    settingsPO.getDeleteCell().click()
    settingsPO.getDeleteDialog().should('be.visible', true)
    settingsPO.getDeleteDialogHeader().should('have.text', 'Delete saved games and settings?')
    settingsPO.getDeleteDialogMessage().should('have.text', 'The games and settings will be permanently deleted and you won\'t be able to revert it.')
    settingsPO.getDeleteDialogConfirmButton().click()

    settingsPO.getDarkTheme().should('not.have.class', 'van-switch--on')
    settingsPO.getApp().should('not.have.class', 'dark')

    homePO.navigateToHome()
    homePO.getGameRows().should('have.length', 0)
  })
})

// https://docs.cypress.io/guides/tooling/typescript-support