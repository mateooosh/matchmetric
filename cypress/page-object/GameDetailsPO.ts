const selectors = {
  goals: 'goals',
  assists: 'assists',
  distance: 'distance',
  calories: 'calories',
  gameRow: 'game-row',
  stats: '.stats',
  ballIcon: '.ball-icon',
  assistIcon: '.assist-icon'
}

class GameDetailsPO {
  getGoalIcons() {
    return cy.dataCy(selectors.gameRow).find(selectors.stats).find(selectors.ballIcon)
  }

  verifyGoalIconsCount(count: number) {
    return this.getGoalIcons().should('have.length', count)
  }

  getAssistIcons() {
    return cy.dataCy(selectors.gameRow).find(selectors.stats).find(selectors.assistIcon)
  }

  verifyAssistIconsCount(count: number) {
    return this.getAssistIcons().should('have.length', count)
  }

  getGoals() {
    return cy.dataCy(selectors.goals)
  }

  verifyGoalsCount(count: number) {
    return this.getGoals().find('.value').should('have.text', count)
  }

  getAssists() {
    return cy.dataCy(selectors.assists)
  }

  verifyAssistsCount(count: number) {
    return this.getAssists().find('.value').should('have.text', count)
  }

  getDistance() {
    return cy.dataCy(selectors.distance)
  }

  verifyDistanceCount(count: string) {
    return this.getDistance().find('.value').should('have.text', count)
  }

  getCalories() {
    return cy.dataCy(selectors.calories)
  }

  verifyCaloriesCount(count: number) {
    return this.getCalories().find('.value').should('have.text', count)
  }
}

export default GameDetailsPO
