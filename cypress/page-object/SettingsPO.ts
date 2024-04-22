const selectors = {
  tabSettings: 'tab-settings',
  darkTheme: 'dark-theme',
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

  getDarkTheme() {
    return cy.dataCy(selectors.darkTheme)
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
