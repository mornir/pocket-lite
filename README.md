# Pocket lite
> Pocket rebuilt with Vue!

[![Netlify Status](https://api.netlify.com/api/v1/badges/317d2f81-848d-4d49-af5d-04bce9aa21a1/deploy-status)](https://app.netlify.com/sites/pocket-lite/deploys)
[![E2E Tests](https://img.shields.io/github/workflow/status/mornir/pocket-lite/End-to-end%20tests?label=build&logo=github&style=for-the-badge)](https://github.com/mornir/pocket-lite/actions)
[![Cypress Dashboard](https://img.shields.io/badge/cypress-dashboard-blue?style=for-the-badge)](https://dashboard.cypress.io/projects/rkg74b/runs)


I rebuilt the popular [Pocket web application](https://getpocket.com/) with Vue! Why? For two reasons: for learning and for a more pleasant use of Pocket at work.

## For learning

Building this single page application with Vue was a great opportunity to learn and consolidate some knowledge, such as:

- [TDD development with Cypress](https://www.cypress.io/blog/2019/02/05/modern-frontend-testing-with-cypress/): In the early phases of development I had Cypress opened the whole time to directly test the code every time I saved. It was a great to have tests in place from the beginning. For example, I decided to do a big refactor to Vuex and it was good to have the tests.
- [OAuth authentication with Pocket](https://getpocket.com/developer/docs/authentication): I used Netlify redirects as a proxy server to communicate with the Pocket API. Thankfully, with [Netlify Dev](https://www.netlify.com/products/dev/) I was able to run the "proxy server" locally.
- [Using GitHub Actions for CI](https://dev.to/mornir/adding-ci-to-your-jamstack-with-cypress-github-actions-and-netlify-deploy-preview-579k)

## For a more pleasant use of Pocket at work

At my workplace, we have corporate policies in place that restrict the installation of web extensions and the access to some websites (Twitter, Facebook, etc.). The problem is that I often save articles to Pocket from Twitter, but those articles get added under the shorten URL (e.g. Twitter: t.co), which redirects to the original URL. But at work the redirection is blocked. However Pocket also provides a `resolved_url` to the original article. However to obtain that URL, you need to copy it from the share menu, which is bit cumbersome. That's why I decided to rebuild Pocket to better suit my needs, meaning:

- Keeping only the functionalities I use on a daily basis: adding articles, reading added articles (open a new tab) marking articles as read,
- Open the `resolved_url` instead of `given_url`
- Minimalistic (no in-app reader, tags, etc.)
- Show the total of saved articles counts
- Easy to add URLs (at work I can't use the web extension to quickly add new articles)
- Easy to reach "Mark as read"

## Project setup
I am using Netlify Dev for development, with my Netlify account.
```
yarn install
```

### Compiles and hot-reloads for development
```
# requires netlify dev to be globally installed
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

### Run your end-to-end tests
```
# requires app to be running locally at localhost:8888
yarn test
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
