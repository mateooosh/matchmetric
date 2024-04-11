const selectors = {
  goals: 'goals',
  assists: 'assists',
  distance: 'distance',
  calories: 'calories',
  gameRow: 'game-row',
  stats: '.stats',
  ballIcon: '.ball-icon',
  assistIcon: '.assist-icon',
}

class GameDetailsPO {
  getGoalIcons () {
    return cy.dataCy(selectors.gameRow).find(selectors.stats).find(selectors.ballIcon)
  }

  getAssistIcons () {
    return cy.dataCy(selectors.gameRow).find(selectors.stats).find(selectors.assistIcon)
  }

  getGoals () {
    return cy.dataCy(selectors.goals)
  }

  getAssists () {
    return cy.dataCy(selectors.assists)
  }

  getDistance () {
    return cy.dataCy(selectors.distance)
  }

  getCalories () {
    return cy.dataCy(selectors.calories)
  }
}

export default GameDetailsPO
