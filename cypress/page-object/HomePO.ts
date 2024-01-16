import BaseTestPO from './BaseTestPO'

class HomePO extends BaseTestPO {

  constructor() {
    super()
  }

  getNavBarContent() {
    return cy.dataCy('header-title')
  }

  getGameRows() {
    return cy.get('div.game-row')
  }

  getGameRowByIndex(index: number) {
    return cy.get('div.game-row').eq(index)
  }
}

export default HomePO
