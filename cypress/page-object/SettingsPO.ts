const selectors = {
  tabSettings: 'tab-settings',
  shortFormOfStatsSwitch: 'short-form-of-stats-switch',
  darkThemeSwitch: 'dark-theme-switch',
  deleteCell: 'delete-cell',
  deleteDialog: 'delete-dialog',
  deleteDialogHeader: '.van-dialog__header',
  deleteDialogMessage: '.van-dialog__message',
  deleteDialogConfirmButton: '.van-dialog__confirm',
  app: 'app'
}

class SettingsPO {
  navigateToSettings() {
    cy.dataCy(selectors.tabSettings).click()
  }

  getShortFormOfStatsSwitch() {
    return cy.dataCy(selectors.shortFormOfStatsSwitch)
  }

  getDarkThemeSwitch() {
    return cy.dataCy(selectors.darkThemeSwitch)
  }

  getDeleteCell() {
    return cy.dataCy(selectors.deleteCell)
  }

  getDeleteDialog() {
    return cy.dataCy(selectors.deleteDialog)
  }

  getDeleteDialogHeader() {
    return this.getDeleteDialog().find(selectors.deleteDialogHeader)
  }

  getDeleteDialogMessage() {
    return this.getDeleteDialog().find(selectors.deleteDialogMessage)
  }

  getDeleteDialogConfirmButton() {
    return this.getDeleteDialog().find(selectors.deleteDialogConfirmButton)
  }

  getApp() {
    return cy.dataCy(selectors.app)
  }
}

export default SettingsPO
