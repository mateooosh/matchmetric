import BaseTestPO from './BaseTestPO'
import GAME_TYPE from '../../src/common/enums/GAME_TYPE.ts'
import GAME_RESULT from '../../src/common/enums/GAME_RESULT.ts'

class EditGamePO extends BaseTestPO {

  constructor() {
    super()
  }

  navigateToCreateGame () {
    cy.dataCy('tab-add-game').click()
  }

  changeTypeOfGame (type: GAME_TYPE) {
    cy.dataCy('type').find('.segment').contains(type).click()
  }

  changeResultOfGame (type: GAME_RESULT) {
    cy.dataCy('result').find('.segment').contains(type).click()
  }

  setGoals (goals: number) {
    cy.dataCy('goals').find('input').clear().type(goals.toString())
  }

  setAssists (assists: number) {
    cy.dataCy('assists').find('input').clear().type(assists.toString())
  }

  setDistance (distance: number) {
    cy.dataCy('distance').find('input').clear().type(distance.toString())
  }

  setCalories (calories: number) {
    cy.dataCy('calories').find('input').clear().type(calories.toString())
  }

  saveGame () {
    cy.dataCy('save').click()
  }

  getGameRows() {
    return cy.get('div.game-row')
  }
}

export default EditGamePO
