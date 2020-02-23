<template>
  <div>
    <button
      v-if="!isLoggedIn"
      data-cy="login"
      class="px-2 border-2 border-blue-500"
      @click="login"
    >
      Log in with Pocket
    </button>
    <button v-else class="px-2 border-2 border-red-500" @click="logout">
      Log out
    </button>
    <ul>
      <li v-for="article in list" :key="article.item_id">
        {{ article.resolved_title }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      list: [],
      isLoggedIn: false,
    }
  },
  methods: {
    async login() {
      const redirect_uri = process.env.VUE_APP_REDIRECT_URI
      const res = await axios
        .get('/.netlify/functions/connect-pocket', {
          params: { redirect_uri },
        })
        .catch(err => console.dir('It failed!', err))

      const { REQUEST_TOKEN } = res.data

      localStorage.setItem('requestToken', REQUEST_TOKEN)

      window.locationAssign(
        `https://getpocket.com/auth/authorize?request_token=${REQUEST_TOKEN}&redirect_uri=${redirect_uri}`
      )
    },
    getList(token) {
      //TODO: this should be a GET request
      axios
        .get(`/.netlify/functions/get-list-pocket`, {
          params: {
            token,
          },
        })
        .then(res => {
          this.isLoggedIn = true
          const { list } = res.data
          this.list = list
        })
        .catch(error => {
          console.dir(error)
        })
    },
    logout() {
      this.isLoggedIn = false
      this.list = []
      localStorage.clear()
    },
  },
  created() {
    if (this.$route.query.mode === 'auth') {
      const REQUEST_TOKEN = localStorage.getItem('requestToken')
      if (REQUEST_TOKEN) {
        axios
          .get(`/.netlify/functions/login-pocket?code=${REQUEST_TOKEN}`)
          .then(res => {
            const { ACCESS_TOKEN, username, list } = res.data

            localStorage.setItem('accessToken', ACCESS_TOKEN)
            localStorage.setItem('username', username)
            this.list = list
            this.isLoggedIn = true
            this.$router.replace({ name: 'home' })
          })
          .catch(error => {
            console.dir(error)
          })
      } else {
        //TODO: better handling of this case
        console.log('no token')
      }
    }
    const ACCESS_TOKEN = localStorage.getItem('accessToken')
    if (ACCESS_TOKEN) {
      this.getList(ACCESS_TOKEN)
      return
    }
  },
}
</script>
