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

export default {
  name: 'home',
  methods: {
    connect() {
      axios
        .get('/.netlify/functions/connect-pocket')
        .then(res => {
          const { REQUEST_TOKEN, REDIRECT_URI } = res.data
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
