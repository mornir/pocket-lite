<template>
  <h1>Login</h1>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    const REQUEST_TOKEN = window.localStorage.getItem('requestToken')
    if (REQUEST_TOKEN) {
      axios
        .get(`/.netlify/functions/login-pocket?code=${REQUEST_TOKEN}`)
        .then(res => {
          const { ACCESS_TOKEN, username } = res.data

          window.localStorage.setItem('accessToken', ACCESS_TOKEN)
          window.localStorage.setItem('username', username)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      console.log('no token')
    }
  },
}
</script>
