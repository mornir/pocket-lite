<template>
  <div class="fixed flex flex-col items-center justify-center h-screen">
    <a
      href="https://github.com/mornir/pocket-lite"
      rel="nooponer"
      class="github-corner"
      aria-label="View source on GitHub"
      ><svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        style="
          position: absolute;
          top: 0;
          border: 0;
          left: 0;
          transform: scale(-1, 1);
        "
        aria-hidden="true"
        class="fill-current text-primary"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="white"
          style="transform-origin: 130px 106px;"
          class="octo-arm"
        ></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="white"
          class="octo-body"
        ></path></svg
    ></a>
    <div class="ml-8">
      <h1 class="mb-3">
        <span class="text-5xl font-bold leading-none">Pocket</span> <br />
        <span class="text-4xl font-medium text-primary">Lite</span>
      </h1>
      <h2 class="mb-8 text-xl font-medium text-gray-600">A lighter version</h2>
      <button
        v-if="!$store.state.isLoggedIn"
        @click="login"
        data-cy="login"
        class="px-4 py-2 font-semibold border-2 rounded-md border-primary"
      >
        Log in with Pocket
      </button>
      <button
        v-else
        @click="logout"
        data-cy="logout"
        class="px-4 py-2 font-semibold border-2 rounded-md border-primary"
      >
        Log out
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftPane',
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login')
        this.$notify({
          title: 'Login successful!',
          type: 'success',
        })
      } catch (e) {
        this.$notify({
          title: 'There was a problem logging you out',
          type: 'error',
        })
        console.error(e)
      }
    },
    logout() {
      this.$store.commit('logout')
      this.$router.replace({ name: 'about' })
      this.$notify({
        title: 'Logout successful!',
        type: 'success',
      })
    },
  },
}
</script>

<style>
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}
@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}
@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>
