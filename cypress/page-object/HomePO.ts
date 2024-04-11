const selectors = {
  headerTitle: 'header-title',
  gameRow: 'div.game-row'
}

class HomePO {
  getNavBarContent() {
    return cy.dataCy(selectors.headerTitle)
  }

  getGameRows() {
    return cy.get(selectors.gameRow)
  }

  getGameRowByIndex(index: number) {
    return cy.get(selectors.gameRow).eq(index)
  }
}

export default HomePO
