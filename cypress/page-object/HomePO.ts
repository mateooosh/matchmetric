const selectors = {
  tabHome: 'tab-home',
  headerTitle: 'header-title',
  gameRow: 'div.game-row',
  rating: '.rating',
  date: '.date'
}

class HomePO {
  navigateToHome() {
    cy.dataCy(selectors.tabHome).click()
  }

  verifyNavBarContent() {
    return cy.dataCy(selectors.headerTitle).should('have.text', 'MATCHMETRIC')
  }

  getGameRows() {
    return cy.get(selectors.gameRow)
  }

  verifyGameRowsCount(count: number) {
    return this.getGameRows().should('have.length', count)
  }

  getGameRowByIndex(index: number) {
    return cy.get(selectors.gameRow).eq(index)
  }

  getGameRatingByIndex(index: number) {
    return this.getGameRowByIndex(index).find(selectors.rating)
  }

  verifyDateByIndex(index: number, date: string) {
    return this.getGameRowByIndex(index).find(selectors.date).should('have.text', date)
  }

  verifyGameTypeIconColor(index: number, color: string) {
    return this.getGameRowByIndex(index).find('svg').should('have.attr', 'fill').and('equal', color)
  }

  verifyGoalIconsCount(index: number, count: number) {
    return this.getGameRowByIndex(index).find('.stats').find('.ball-icon').should('have.length', count)
  }

  verifyAssistIconsCount(index: number, count: number) {
    return this.getGameRowByIndex(index).find('.stats').find('.assist-icon').should('have.length', count)
  }

  verifyShortFormGoalsNumber(index: number, content: number) {
    return this.getGameRowByIndex(index).find('.stats').find('.short-form').eq(0).should('have.text', content)
  }

  verifyShortFormAssistsNumber(index: number, content: number) {
    return this.getGameRowByIndex(index).find('.stats').find('.short-form').eq(1).should('have.text', content)
  }

  verifyRating(index: number, rating: number) {
    return this.getGameRatingByIndex(index).should('have.text', rating)
  }

  verifyRatingBackgroundColor(index: number, color: string) {
    return this.getGameRatingByIndex(index).should('have.css', 'background-color', color)
  }
}

export default HomePO
