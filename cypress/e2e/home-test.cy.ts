/// <reference types="cypress" />

import HomePO from '../page-object/HomePO'

const homePO = new HomePO()
describe('template spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('passes', () => {
    homePO.getNavBarContent().should('have.text', 'Matchmetric')
  })

  it('should add to local storage', () => {
    homePO.setGamesInStorage()
  })
})

// https://docs.cypress.io/guides/tooling/typescript-support