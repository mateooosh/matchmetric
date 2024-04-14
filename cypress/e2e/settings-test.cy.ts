/// <reference types="cypress" />
import SettingsPO from '../page-object/SettingsPO'

const settingsPO = new SettingsPO()

describe('Settings test', () => {

  before(() => {
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
})

// https://docs.cypress.io/guides/tooling/typescript-support