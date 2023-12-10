/// <reference types="cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    cy.dataCy('header-title').should('have.text', 'Matchmetric')
  })
})

// https://docs.cypress.io/guides/tooling/typescript-support