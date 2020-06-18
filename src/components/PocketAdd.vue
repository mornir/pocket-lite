<template>
  <form @submit.prevent="addURL">
    <label for="url" class="text-sm">Add new URL</label>
    <div class="flex">
      <input
        required
        v-model="url"
        name="url"
        type="url"
        data-cy="add-url"
        class="flex-1 p-2 border-2 border-red-200 rounded-md"
      />

      <button class="p-2 bg-secondary">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-8 h-8 text-primary"
        >
          <path
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </button>
    </div>
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
      try {
        this.$store.dispatch('addURL', this.url)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
