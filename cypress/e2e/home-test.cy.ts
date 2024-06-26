/// <reference types="cypress" />

import HomePO from '../page-object/HomePO'

const homePO = new HomePO()
describe('Home test', () => {

  before(() => {
    cy.visit('http://localhost:5173/')
  })

  it('passes', () => {
    homePO.verifyNavBarContent()
  })
})

// https://docs.cypress.io/guides/tooling/typescript-support