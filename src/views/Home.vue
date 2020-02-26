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
    <button
      v-else
      data-cy="logout"
      class="px-2 border-2 border-red-500"
      @click="logout"
    >
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
export default {
  name: 'home',
  data() {
    return {
      list: [],
      isLoggedIn: false,
      isListLoading: false,
    }
  },
  methods: {
    async login() {
      const redirect_uri = process.env.VUE_APP_REDIRECT_URI

      this.$pocket({
        url: '/pocket/oauth/request',
        data: {
          consumer_key: process.env.VUE_APP_CONSUMER_KEY,
          redirect_uri,
        },
      })
        .then(({ code }) => {
          localStorage.setItem('requestToken', code)
          window.locationAssign(
            `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${redirect_uri}`
          )
        })
        .catch(err => console.dir('It failed!', err))
    },
    async getList(token) {
      return this.$pocket({
        url: '/pocket/get',
        data: {
          consumer_key: process.env.VUE_APP_CONSUMER_KEY,
          access_token: token,
          detailType: 'simple',
        },
      })
    },
    logout() {
      this.isLoggedIn = false
      this.list = []
      localStorage.clear()
    },
  },
  created() {
    console.log('key', process.env.VUE_APP_CONSUMER_KEY)
    if (this.$route.query.mode === 'auth') {
      const REQUEST_TOKEN = localStorage.getItem('requestToken')
      if (REQUEST_TOKEN) {
        this.isListLoading = true
        this.$pocket({
          url: '/pocket/oauth/authorize',
          data: {
            consumer_key: process.env.CONSUMER_KEY,
            code: REQUEST_TOKEN,
          },
        })
          .then(({ access_token, username }) => {
            localStorage.setItem('accessToken', access_token)
            localStorage.setItem('username', username)
            return this.getList(access_token)
          })
          .then(({ list }) => {
            this.list = list
            this.isLoggedIn = true
            this.$router.replace({ name: 'home' })
          })
          .catch(error => console.dir(error))
          .finally(() => {
            this.isListLoading = false
          })
      } else {
        //TODO: better handling of this case
        console.log('no token')
      }
    }
    const ACCESS_TOKEN = localStorage.getItem('accessToken')
    if (ACCESS_TOKEN) {
      this.isListLoading = true
      this.getList(ACCESS_TOKEN)
        .then(({ list }) => {
          this.list = list
          this.isLoggedIn = true
        })
        .catch(error => {
          console.dir(error)
        })
        .finally(() => {
          this.isListLoading = false
        })
    }
  },
}
</script>
