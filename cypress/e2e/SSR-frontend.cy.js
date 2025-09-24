/// <reference types="cypress" />

describe('ssr-editor-frontend', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:5173/')
  })

  it('checks page has necessary items', () => {
    // kolla att titel finns i <h1>
    cy.get('h1').should('have.text', 'SSR-editor')

    //kollar att formulär finns
    cy.get('form').should('exist')

    // kollar att dokumentlistan finns
    cy.get('ul li').should('exist')
    

  })

  it('can add new documents', () => {
  // värden att lägga till
    const newDoc = 'Bananer'
    const newContent = 'I pyjamas'

  //lägg till värde för titel och content
    cy.get('input[name="title"]').type(newDoc)
    cy.get('textarea[name="content"]').type(newContent)

  //skicka formulär
    cy.get('input[type="submit"]').click()

  //kolla att dokumentet hamnar i listan
    cy.get('ul li').contains(`${newDoc}`)

  // kolla att textfälten töms efteråt
    cy.get('input[name="title"]').should('have.value', '')
    cy.get('textarea[name="content"]').should('have.value', '')

})

  it('opens right document', () => {
    //öppna nytillagd dokument
    cy.contains('ul li', 'Bananer').click()

    // kolla att rätt dokument öppnats
    cy.get('input[name="title"]').should('have.value', 'Bananer')
    cy.get('textarea[name="content"]').should('have.value', 'I pyjamas')

  })

  it('updates document correctly', () => {
    // ändra titeln
    cy.get('input[name="title"]').clear().type('B1 och B2')
    cy.get('input[type="submit"]').click()

    // kolla att titeln ändrats i listan
    cy.contains('ul li', 'B1 och B2')
  })
})
