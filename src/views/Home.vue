<template>
  <div>
    <button class="border-2 border-blue-500 px-2" @click="connect">
      Connect with Pocket
    </button>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'

const REDIRECT_URI = 'http://localhost:8080/'

export default {
  name: 'home',
  methods: {
    connect() {
      axios
        .post('https://getpocket.com/v3/oauth/request', {
          consumer_key: process.env.VUE_APP_CONSUMER_KEY,
          redirect_uri: REDIRECT_URI,
        })
        .then(response => {
          const REQUEST_TOKEN = response.code
          window.location.assign(
            `https://getpocket.com/auth/authorize?request_token=${REQUEST_TOKEN}&redirect_uri=${REDIRECT_URI}`
          )
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
