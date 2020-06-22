// https://docs.cypress.io/api/introduction/api.html
/// <reference types="Cypress" />

describe('Authentication Workflow - Happy Path', () => {
  it('Authenticates with Pocket', function () {
    cy.server()
    cy.route('POST', '/pocket/oauth/request').as('getToken')
    cy.route('POST', '/pocket/oauth/authorize', {
      access_token: Cypress.env().accessToken,
      username: 'John',
    })

    cy.visit('/')
    cy.window().then(win => {
      cy.stub(win, 'locationAssign').as('windowAssign')
    })

    cy.get('[data-cy=login]').as('button').click()

    cy.contains('Login successful!')

    cy.wait('@getToken').should(xhr => {
      const requestToken = xhr.response.body.code
      expect(localStorage.getItem('requestToken')).to.eq(requestToken)
      cy.get('@windowAssign').should(
        'be.calledWith',
        `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${
          Cypress.config().baseUrl
        }?mode=auth`
      )
    })
    cy.visit('/', {
      qs: {
        mode: 'auth',
      },
    })

    cy.fixture('defaultArticle').then(article => {
      cy.contains(article.title)
    })
  })

  it('Clears localstorage', () => {
    const { username, accessToken } = Cypress.env()
    localStorage.setItem('username', username)
    localStorage.setItem('accessToken', accessToken)
    cy.visit('/')
    cy.get('[data-cy=logout]')
      .click()
      .should(() => {
        expect(localStorage.getItem('accessToken')).to.be.null
        expect(localStorage.getItem('username')).to.be.null
      })

    cy.contains('Logout successful!')
  })
})
