<template>
  <form @submit.prevent="addURL">
    <input
      required
      v-model="url"
      type="url"
      data-cy="add-url"
      class="border-2 border-red-200"
    />
    <button>ADD</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      url: '',
    }
  },
  methods: {
    addURL() {
      const url = encodeURI(this.url)
      const access_token = localStorage.getItem('accessToken')
      this.$pocket({
        url: '/pocket/add',
        data: {
          consumer_key: process.env.VUE_APP_CONSUMER_KEY,
          access_token,
          url,
        },
      }).then(({ item }) => {
        this.$emit('newArticle', item)
        console.log(item)
      })
    },
  },
}
</script>
