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
    homePO.verifyGameRowsCount(1)
    homePO.verifyDateByIndex(0, formatDate(new Date()))

    homePO.getGameRowByIndex(0).click()

    gameDetailsPO.verifyGoalIconsCount(3)
    gameDetailsPO.verifyAssistIconsCount(4)
    gameDetailsPO.verifyGoalsCount(3)
    gameDetailsPO.verifyAssistsCount(4)
    gameDetailsPO.verifyDistanceCount('4.32km')
    gameDetailsPO.verifyCaloriesCount(523)
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

    homePO.verifyGameRowsCount(3)

    homePO.verifyGameTypeIconColor(0, '#DC143C')
    homePO.verifyGameTypeIconColor(1, '#AFAFAF')
    homePO.verifyGameTypeIconColor(2, '#5DB075')
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

    homePO.verifyRating(0, 10)
    homePO.verifyRatingBackgroundColor(0, 'rgb(11, 121, 42)')
    homePO.verifyRating(1, 6.5)
    homePO.verifyRatingBackgroundColor(1, 'rgb(118, 177, 0)')
    homePO.verifyRating(2, 4.9)
    homePO.verifyRatingBackgroundColor(2, 'rgb(243, 160, 0)')
    homePO.verifyRating(3, 3.3)
    homePO.verifyRatingBackgroundColor(3, 'rgb(236, 107, 7)')
    homePO.verifyRating(4, 1.6)
    homePO.verifyRatingBackgroundColor(4, 'rgb(220, 0, 0)')
  })
})

// https://docs.cypress.io/guides/tooling/typescript-support