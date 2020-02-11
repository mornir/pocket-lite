const axios = require('axios')

const pocket = axios.create({
  baseURL: 'https://getpocket.com/v3/',
  method: 'post',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Accept': 'application/json',
  },
})

module.exports = pocket
