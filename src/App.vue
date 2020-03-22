<template>
  <div id="app" class="font-sans c-grid">
    <header class="relative border-r-2">
      <LeftPane :isLoggedIn="isLoggedIn" @logout="logout" />
    </header>
    <main class="px-8">
      <router-view :list="list" />
    </main>
  </div>
</template>

<script>
import LeftPane from '@/components/LeftPane'
export default {
  name: 'App',
  components: {
    LeftPane,
  },
  data() {
    return {
      list: [],
      isLoggedIn: false,
      isListLoading: false,
    }
  },
  methods: {
    async getList(token) {
      return this.$pocket({
        url: '/pocket/get',
        data: {
          consumer_key: process.env.VUE_APP_CONSUMER_KEY,
          access_token: token,
          count: '50',
          sort: 'newest',
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
        .then(res => {
          this.list = this.formatList(res.list)
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

<style scoped>
.c-grid {
  display: grid;
  grid-template-columns: 20rem 1fr;
}
</style>
