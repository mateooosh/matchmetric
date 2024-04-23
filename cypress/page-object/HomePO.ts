const selectors = {
  tabHome: 'tab-home',
  headerTitle: 'header-title',
  gameRow: 'div.game-row',
  rating: '.rating'
}

class HomePO {
  navigateToHome() {
    cy.dataCy(selectors.tabHome).click()
  }

  getNavBarContent() {
    return cy.dataCy(selectors.headerTitle)
  }

  getGameRows() {
    return cy.get(selectors.gameRow)
  }

  getGameRowByIndex(index: number) {
    return cy.get(selectors.gameRow).eq(index)
  }

  getGameRatingByIndex(index: number) {
    return this.getGameRowByIndex(index).find(selectors.rating)
  }
}

export default HomePO
