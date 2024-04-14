/// <reference types="cypress" />

import GAME_TYPE from '../../src/common/enums/GAME_TYPE'
import GAME_RESULT from '../../src/common/enums/GAME_RESULT'
import EditGamePO from '../page-object/EditGamePO'
import HomePO from '../page-object/HomePO'
import GameDetailsPO from '../page-object/GameDetailsPO'

const homePO = new HomePO()
const editGamePO = new EditGamePO()
const gameDetailsPO = new GameDetailsPO()

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}

const formatDate = (date: Date): string => date.toLocaleDateString('en-IN', dateOptions).replaceAll('/', '-')

describe('Add game test', () => {

  before(() => {
    cy.visit('http://localhost:5173/')
  })

  it('Should create game', () => {
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

    homePO.getGameRowByIndex(0).click()

    gameDetailsPO.getGoalIcons().should('have.length', 3)
    gameDetailsPO.getAssistIcons().should('have.length', 4)
    gameDetailsPO.getGoals().find('.value').should('have.text', 3)
    gameDetailsPO.getAssists().find('.value').should('have.text', 4)
    gameDetailsPO.getDistance().find('.value').should('have.text', '4.32km')
    gameDetailsPO.getCalories().find('.value').should('have.text', 523)
  })
})

// https://docs.cypress.io/guides/tooling/typescript-support