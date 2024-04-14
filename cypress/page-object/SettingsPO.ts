const selectors = {
  tabSettings: 'tab-settings',
  darkTheme: 'dark-theme',
  app: 'app'
}

class SettingsPO {
  navigateToSettings() {
    cy.dataCy(selectors.tabSettings).click()
  }

  getDarkTheme() {
    return cy.dataCy(selectors.darkTheme)
  }

  getApp() {
    return cy.dataCy(selectors.app)
  }
}

export default SettingsPO
