<template>
  <div>
    <PocketAdd @newArticle="list.unshift($event)" />
    <p>
      You have <span class="font-semibold">{{ count }}</span> in your reading
      list
    </p>
    <ul class="c-grid">
      <li
        v-for="{ item_id, resolved_title, resolved_url } in list"
        :key="item_id"
      >
        <PocketArticle
          :id="item_id"
          :title="resolved_title"
          :url="resolved_url"
          @archived="archive"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import PocketArticle from '@/components/PocketArticle'
import PocketAdd from '@/components/PocketAdd'

export default {
  name: 'ArticlesList',
  components: {
    PocketArticle,
    PocketAdd,
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
    formatList(list) {
      return Object.values(list).sort((a, b) => {
        return b.time_added - a.time_added
      })
    },
    archive(id) {
      this.list = this.list.filter(({ item_id }) => item_id !== id)
    },
  },
  computed: {
    count() {
      const nb = this.list.length
      if (nb === 0 || nb === 1) {
        return nb + ' article'
      } else if (nb >= 50) {
        return 'more than 50 articles'
      } else {
        return nb + ' articles'
      }
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

<style lang="postcss" scoped>
@sreen md {
  .c-grid {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  }
}
</style>
