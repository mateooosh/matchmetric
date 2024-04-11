/// <reference types="cypress" />

import EditGamePO from '../page-object/EditGamePO'
import HomePO from '../page-object/HomePO'

const editGamePO = new EditGamePO()
const homePO = new HomePO()

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}

const formatDate = (date: Date): string => date.toLocaleDateString('en-IN', dateOptions).replaceAll('/', '-')

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('should set values', () => {
    // editGamePO.navigateToCreateGame()
    //
    // editGamePO.changeTypeOfGame(GAME_TYPE.INSIDE)
    // editGamePO.changeResultOfGame(GAME_RESULT.WIN)
    // editGamePO.setGoals(3)
    // editGamePO.setAssists(4)
    // editGamePO.setDistance(4.32)
    // editGamePO.setCalories(523)
  })
})

// https://docs.cypress.io/guides/tooling/typescript-support