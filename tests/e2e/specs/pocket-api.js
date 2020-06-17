// https://docs.cypress.io/api/introduction/api.html
/// <reference types="Cypress" />

describe('Authentication Workflow - Happy Path', () => {
  it('Gets the request token', () => {
    cy.server()
    cy.route('POST', '/pocket/oauth/request').as('getToken')

    cy.visit('/')

    cy.window().then(win => {
      cy.stub(win, 'locationAssign').as('windowAssign')
    })

    cy.get('[data-cy=login]').click()

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
  })

  // TODO: Make clearer which tests are passing: retrieving, adding or archiving
  it('Retrieves, adds and archives', () => {
    const url = 'https://dev.to/mornir/add-tailwind-to-your-vue-app-5hea'
    const urlTitle = 'How to add Tailwind to your Vue app'

    const defaultArticle =
      'Your Pocket journey starts now. Make the most of it.'
    localStorage.setItem('accessToken', Cypress.env().accessToken)
    cy.visit('/')
    cy.contains(defaultArticle)

    cy.get('[data-cy=add-url]').type(`${url}{enter}`)
    cy.contains(url)
    cy.reload()
    cy.get('article').first().contains(urlTitle)

    cy.get('button[data-cy=archive-btn]').first().click()

    // Use Should callback to have Cypress automatically retry the assertions
    cy.get('ul li').should($list => {
      expect($list).to.have.length(1)
      expect($list.get(0).textContent, 'first item').to.contain(defaultArticle)
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
  })
})
