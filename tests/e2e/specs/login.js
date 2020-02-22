// https://docs.cypress.io/api/introduction/api.html
/// <reference types="Cypress" />

describe('Login Workflow - Happy Path', () => {
  it('Gets the request token', () => {
    const requestToken = '323-23432-2342355'

    cy.server()
    cy.route('POST', '/.netlify/functions/connect-pocket', {
      REQUEST_TOKEN: requestToken,
    })

    cy.visit('/')
    cy.window().then(win => {
      cy.stub(win, 'locationAssign').as('windowAssign')
    })

    cy.get('[data-cy=login]')
      .click()
      .should(() => {
        expect(localStorage.getItem('requestToken')).to.eq(requestToken)
      })

    cy.get('@windowAssign').should(
      'be.calledWith',
      `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=https://pocket-lite.netlify.com?mode=auth`
    )
  })

  it('Fetches the list of articles', () => {
    localStorage.setItem('accessToken', Cypress.env().accessToken)
    cy.visit('/')
    cy.contains('Your Pocket journey starts now. Make the most of it.')
  })

  /*   it('Clears localstorage', () => {
    cy.visit('/')
  }) */
})
