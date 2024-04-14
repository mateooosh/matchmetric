import GAME_TYPE from '../../src/common/enums/GAME_TYPE.ts'
import GAME_RESULT from '../../src/common/enums/GAME_RESULT.ts'

const selectors = {
  tabAddGame: 'tab-add-game',
  type: 'type',
  result: 'result',
  goals: 'goals',
  assists: 'assists',
  distance: 'distance',
  calories: 'calories',
  save: 'save'
}

class EditGamePO {
  navigateToCreateGame() {
    cy.dataCy(selectors.tabAddGame).click()
  }

  changeTypeOfGame(type: GAME_TYPE) {
    cy.dataCy(selectors.type).find('.segment').contains(type).click()
  }

  changeResultOfGame(type: GAME_RESULT) {
    cy.dataCy(selectors.result).find('.segment').contains(type).click()
  }

  setGoals(goals: number) {
    cy.dataCy(selectors.goals).find('input').clear().type(goals.toString())
  }

  setAssists(assists: number) {
    cy.dataCy(selectors.assists).find('input').clear().type(assists.toString())
  }

  setDistance(distance: number) {
    cy.dataCy(selectors.distance).find('input').clear().type(distance.toString())
  }

  setCalories(calories: number) {
    cy.dataCy(selectors.calories).find('input').clear().type(calories.toString())
  }

  saveGame() {
    cy.dataCy(selectors.save).click()
  }
}

export default EditGamePO
