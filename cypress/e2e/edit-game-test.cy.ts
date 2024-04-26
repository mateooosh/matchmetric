/// <reference types="cypress" />

import GameType from '../../src/common/enums/GameType.ts'
import GameResult from '../../src/common/enums/GameResult.ts'
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

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('Should create game', () => {
    editGamePO.navigateToCreateGame()

    editGamePO.changeTypeOfGame(GameType.INSIDE)
    editGamePO.changeResultOfGame(GameResult.WIN)
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

  it('Should display icons with proper color', () => {
    editGamePO.navigateToCreateGame()
    editGamePO.changeResultOfGame(GameResult.WIN)
    editGamePO.saveGame()

    editGamePO.navigateToCreateGame()
    editGamePO.changeResultOfGame(GameResult.DRAW)
    editGamePO.saveGame()

    editGamePO.navigateToCreateGame()
    editGamePO.changeResultOfGame(GameResult.LOSE)
    editGamePO.saveGame()

    homePO.getGameRows().should('have.length', 3)

    homePO.getGameRowByIndex(0).find('svg').should('have.attr', 'fill').and('equal', '#DC143C')
    homePO.getGameRowByIndex(1).find('svg').should('have.attr', 'fill').and('equal', '#AFAFAF')
    homePO.getGameRowByIndex(2).find('svg').should('have.attr', 'fill').and('equal', '#5DB075')
  })

  it('Should calculate rating', () => {
    editGamePO.navigateToCreateGame()
    editGamePO.setGoals(1)
    editGamePO.saveGame()

    editGamePO.navigateToCreateGame()
    editGamePO.setGoals(2)
    editGamePO.saveGame()

    editGamePO.navigateToCreateGame()
    editGamePO.setGoals(3)
    editGamePO.saveGame()

    editGamePO.navigateToCreateGame()
    editGamePO.setGoals(4)
    editGamePO.saveGame()

    editGamePO.navigateToCreateGame()
    editGamePO.setGoals(4)
    editGamePO.setAssists(2)
    editGamePO.saveGame()

    homePO.getGameRatingByIndex(0).should('have.text', 10)
    homePO.getGameRatingByIndex(0).should('have.css', 'background-color', 'rgb(11, 121, 42)')
    homePO.getGameRatingByIndex(1).should('have.text', 6.5)
    homePO.getGameRatingByIndex(1).should('have.css', 'background-color', 'rgb(118, 177, 0)')
    homePO.getGameRatingByIndex(2).should('have.text', 4.9)
    homePO.getGameRatingByIndex(2).should('have.css', 'background-color', 'rgb(243, 160, 0)')
    homePO.getGameRatingByIndex(3).should('have.text', 3.3)
    homePO.getGameRatingByIndex(3).should('have.css', 'background-color', 'rgb(236, 107, 7)')
    homePO.getGameRatingByIndex(4).should('have.text', 1.6)
    homePO.getGameRatingByIndex(4).should('have.css', 'background-color', 'rgb(220, 0, 0)')
  })
})

// https://docs.cypress.io/guides/tooling/typescript-support