import BaseTestPO from './BaseTestPO.ts'

class HomePO extends BaseTestPO {
  url: string

  constructor() {
    super()
    this.url = '/'
  }

  getNavBarContent () {
    return cy.dataCy('header-title')
  }

  setGamesInStorage () {
    cy.fixture('games.json').then((value) => {
      localStorage.setItem('games', JSON.stringify(value))
    })
  }
}

export default HomePO
