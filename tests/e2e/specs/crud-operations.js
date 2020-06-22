/// <reference types="Cypress" />

describe('Retrieving, adding and archiving articles', () => {
  beforeEach(() => {
    localStorage.setItem('accessToken', Cypress.env().accessToken)
    cy.visit('/')
  })

  it('Retrieves initial article', () => {
    cy.fixture('defaultArticle').then(article => {
      cy.contains(article.title)
    })
  })

  it('Adds a new article', () => {
    cy.fixture('newArticle').then(article => {
      cy.get('[data-cy=add-url]').type(`${article.url}{enter}`)
      cy.get('[data-cy=add-url]').should('have.value', '')
      cy.contains(article.url)
      cy.reload()
      cy.get('article').first().contains(article.title)
    })
  })

  it('Archives an article', () => {
    cy.get('button[data-cy=archive-btn]').first().click()

    cy.fixture('defaultArticle').then(article => {
      // Use Should callback to have Cypress automatically retry the assertions
      cy.get('ul li').should($list => {
        expect($list).to.have.length(1)
        expect($list.get(0).textContent, 'first item').to.contain(article.title)
      })
    })
  })
})
