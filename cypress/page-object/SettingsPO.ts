const selectors = {
  tabSettings: 'tab-settings',
  shortFormOfStatsSwitch: 'short-form-of-stats-switch',
  darkThemeSwitch: 'dark-theme-switch',
  deleteCell: 'delete-cell',
  exportCell: 'export-cell',
  importCell: 'import-cell',
  fileInput: 'input[type=file]',
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

  verifyShortFormOfStatsSwitchOn() {
    return this.getShortFormOfStatsSwitch().should('have.class', 'van-switch--on')
  }

  verifyShortFormOfStatsSwitchOff() {
    return this.getShortFormOfStatsSwitch().should('not.have.class', 'van-switch--on')
  }

  getDarkThemeSwitch() {
    return cy.dataCy(selectors.darkThemeSwitch)
  }

  verifyDarkThemeSwitchOn() {
    return this.getDarkThemeSwitch().should('have.class', 'van-switch--on')
  }

  verifyDarkThemeSwitchOff() {
    return this.getDarkThemeSwitch().should('not.have.class', 'van-switch--on')
  }

  getDeleteCell() {
    return cy.dataCy(selectors.deleteCell)
  }

  getExportCell() {
    return cy.dataCy(selectors.exportCell)
  }

  importFile(path: string) {
    return cy.dataCy(selectors.importCell).get(selectors.fileInput).selectFile(path, { force: true })
  }

  getDeleteDialog() {
    return cy.dataCy(selectors.deleteDialog)
  }

  verifyDeleteDialogVisible() {
    return cy.dataCy(selectors.deleteDialog).should('be.visible', true)
  }

  verifyDeleteDialogHeaderText(content: string) {
    return this.getDeleteDialog().find(selectors.deleteDialogHeader).should('have.text', content)
  }

  verifyDeleteDialogMessageText(content: string) {
    return this.getDeleteDialog().find(selectors.deleteDialogMessage).should('have.text', content)
  }

  getDeleteDialogConfirmButton() {
    return this.getDeleteDialog().find(selectors.deleteDialogConfirmButton)
  }

  verifyTheme(isDark: boolean) {
    const chainer = isDark ? 'have.class' : 'not.have.class'
    this.getApp().should(chainer, 'dark')
  }

  getApp() {
    return cy.dataCy(selectors.app)
  }
}

export default SettingsPO
