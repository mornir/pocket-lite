<template>
  <article class="flex h-full border-2 rounded-md border-primary">
    <a
      class="flex-1 p-4 pr-0 bg-white"
      target="_blank"
      :href="url"
      rel="noopener nofollow"
    >
      <h1 class="text-sm font-semibold" v-if="title">{{ title }}</h1>
      <h1 class="text-sm font-semibold break-all" v-else>{{ url }}</h1>
      <h2 class="text-xs">{{ domain }}</h2>
    </a>
    <button
      class="flex items-center px-2 py-4 bg-primary"
      data-cy="archive-btn"
      @click.once="archive"
      aria-label="Archive article"
    >
      <svg
        class="inline-block w-8 h-8 text-white fill-current"
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
      try {
        const url = new URL(this.url)
        return url.hostname.replace('www.', '')
      } catch {
        return this.url
      }
    },
  },
  methods: {
    archive() {
      try {
        this.$store.dispatch('archive', this.id)
        this.$notify({
          title: 'Article archived!',
          type: 'success',
        })
      } catch (e) {
        console.error(e)
        this.$notify({
          title: 'Error when archiving',
          text: e.message,
          type: 'error',
        })
      }
    },
  },
}
</script>
