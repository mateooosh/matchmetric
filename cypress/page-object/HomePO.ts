import BaseTestPO from './BaseTestPO'

class HomePO extends BaseTestPO {
  url: string

  constructor() {
    super()
    this.url = '/'
  }

  getNavBarContent() {
    return cy.dataCy('header-title')
  }

  setGamesInStorage() {
    cy.fixture('games.json').then((value: object) => {
      this.setInStorage('games', value)
    })
  }
}

export default HomePO
