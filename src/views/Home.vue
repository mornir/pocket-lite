<template>
  <div>
    <button class="px-2 border-2 border-blue-500" @click="connect">
      Connect with Pocket
    </button>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios'

export default {
  name: 'home',
  methods: {
    connect() {
      axios
        .get('/.netlify/functions/connect-pocket')
        .then(res => {
          const { REQUEST_TOKEN, CONSUMER_KEY, REDIRECT_URI } = res.data

          window.localStorage.setItem('requestToken', REQUEST_TOKEN)
          window.localStorage.setItem('consumerKey', CONSUMER_KEY)

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
