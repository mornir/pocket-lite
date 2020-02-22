import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/tailwind.css'

// Wrap window.location in a function for stubbing needs because window.location is read-only
window.locationAssign = url => window.location.assign(url)

Vue.config.productionTip = false

new Vue({
  router,
  render: function(h) {
    return h(App)
  },
}).$mount('#app')
