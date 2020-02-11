<template>
  <li>
    <h1>Login</h1>
    <ul>
      <li v-for="article in list" :key="article.item_id">
        {{ article.resolved_title }}
      </li>
    </ul>
  </li>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    const REQUEST_TOKEN = window.localStorage.getItem('requestToken')
    if (REQUEST_TOKEN) {
      axios
        .get(`/.netlify/functions/login-pocket?code=${REQUEST_TOKEN}`)
        .then(res => {
          const { ACCESS_TOKEN, username, list } = res.data

          window.localStorage.setItem('accessToken', ACCESS_TOKEN)
          window.localStorage.setItem('username', username)
          this.list = list
        })
        .catch(error => {
          console.dir(error)
        })
    } else {
      console.log('no token')
    }
  },
}
</script>
