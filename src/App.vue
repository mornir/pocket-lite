<template>
  <div id="app" class="font-sans c-grid">
    <header class="relative border-r-2">
      <LeftPane />
    </header>
    <main class="px-8">
      <router-view />
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
  async created() {
    if (this.$route.query.mode === 'auth') {
      const REQUEST_TOKEN = localStorage.getItem('requestToken')
      if (REQUEST_TOKEN) {
        this.isListLoading = true

        try {
          await this.$store.dispatch('auth', REQUEST_TOKEN)
          this.$router.replace({ name: 'article-list' })
        } catch (e) {
          console.error(e)
        } finally {
          this.isListLoading = false
        }
      } else {
        //TODO: better handling of this case
        console.log('no token')
      }
    }
    const ACCESS_TOKEN = localStorage.getItem('accessToken')
    if (ACCESS_TOKEN) {
      this.isListLoading = true

      try {
        await this.$store.dispatch('getList', ACCESS_TOKEN)
        this.$store.commit('login')
      } catch (e) {
        console.log(e)
      } finally {
        this.isListLoading = false
      }
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
