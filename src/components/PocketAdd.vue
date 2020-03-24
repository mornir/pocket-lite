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
      try {
        this.$store.dispatch('addURL', this.url)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
