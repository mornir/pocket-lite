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
    cy.visit('/?mode=auth')

    cy.fixture('defaultArticle').then(article => {
      cy.contains(article.title)
    })
  })

  it('Retrieves, adds and archives', () => {
    localStorage.setItem('accessToken', Cypress.env().accessToken)
    cy.visit('/')

    cy.log('👉 Retrieves default article')
    cy.fixture('defaultArticle').as('defaultArticle')
    cy.get('@defaultArticle').then(article => {
      cy.contains(article.title)
    })

    cy.log('👉 Adds new article')
    cy.fixture('newArticle').then(article => {
      cy.get('[data-cy=add-url]').type(`${article.url}{enter}`)
      cy.contains(article.url)
      cy.reload()
      cy.get('article').first().contains(article.title)
    })

    cy.log('👉 Archives recently added article')
    cy.get('button[data-cy=archive-btn]').first().click()

    cy.get('@defaultArticle').then(article => {
      // Use Should callback to have Cypress automatically retry the assertions
      cy.get('ul li').should($list => {
        expect($list).to.have.length(1)
        expect($list.get(0).textContent, 'first item').to.contain(article.title)
      })
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

  /*   it.skip('Manually parse id_token and set on local storage to login', () => {
    cy.request({
      method: 'POST',
      url: `https://getpocket.com/v3/oauth/request`,
      followRedirect: false,
      body: {
        redirect_uri: 'http://localhost:8888?mode=auth',
        consumer_key: '89737-f011af573a45996d1901b7d4',
      },
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Accept': 'application/json',
      },
    }).then(res => {
      const request_token = res.body.code
    })
  }) */
})
