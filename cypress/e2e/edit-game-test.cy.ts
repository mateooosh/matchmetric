/// <reference types="cypress" />

import GAME_TYPE from '../../src/common/enums/GAME_TYPE.ts'
import GAME_RESULT from '../../src/common/enums/GAME_RESULT.ts'
import EditGamePO from '../page-object/EditGamePO.ts'
import HomePO from '../page-object/HomePO.ts'

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

  it('should add game', () => {
    editGamePO.navigateToCreateGame()

    editGamePO.changeTypeOfGame(GAME_TYPE.INSIDE)
    editGamePO.changeResultOfGame(GAME_RESULT.WIN)
    editGamePO.setGoals(3)
    editGamePO.setAssists(4)
    editGamePO.setDistance(4.32)
    editGamePO.setCalories(523)

    editGamePO.saveGame()

    homePO.getGameRows().should('have.length', 1)
    homePO.getGameRowByIndex(0).find('.date').should('have.text', formatDate(new Date()))
  })
})

// https://docs.cypress.io/guides/tooling/typescript-support