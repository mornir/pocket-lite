<template>
  <article class="flex border-2 border-red-200">
    <a
      class="flex-1 p-4 pr-0"
      target="_blank"
      :href="url"
      rel="noopener nofollow"
    >
      <h1>
        {{ title || url }}
      </h1>
      <h2 class="text-xs font-bold">
        {{ domain }}
      </h2>
    </a>
    <button
      class="flex items-center p-4 bg-red-200"
      data-cy="archive-btn"
      @click="archive"
      aria-label="Archive article"
    >
      <svg
        class="inline-block w-8 h-8 fill-current text-primary"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
        />
      </svg>
    </button>
  </article>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    domain() {
      const url = new URL(this.url)
      return url.hostname.replace('www.', '')
    },
  },
  methods: {
    archive() {
      const access_token = localStorage.getItem('accessToken')
      this.$pocket({
        url: '/pocket/send',
        data: {
          consumer_key: process.env.VUE_APP_CONSUMER_KEY,
          access_token,
          actions: [
            {
              action: 'archive',
              item_id: this.id,
              time: Date().now,
            },
          ],
        },
      }).then(res => {
        if (res.status) {
          this.$emit('archived', this.id)
        } else {
          console.log('failed!')
        }
      })
    },
  },
}
</script>

<style></style>
