<template>
  <div id="app" class="font-sans c-grid">
    <header class="relative border-r-2">
      <LeftPane />
    </header>
    <main class="px-8 ">
      <router-view />
    </main>
    <!--     <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
  </div>
</template>

<script>
import LeftPane from '@/components/LeftPane'
export default {
  components: {
    LeftPane,
  },
}
</script>

<style scoped>
.c-grid {
  display: grid;
  grid-template-columns: 20rem 1fr;
}
</style>
