import axios from 'axios'

export default axios.create({
  baseURL: 'https://getpocket.com/v3/',
  method: 'post',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Accept': 'application/json',
  },
})
