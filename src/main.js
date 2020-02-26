import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'

import '@/assets/css/tailwind.css'

// Wrap window.location in a function for stubbing needs because window.location is read-only
window.locationAssign = url => window.location.assign(url)

Vue.config.productionTip = false

const instance = axios.create({
  method: 'post',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Accept': 'application/json',
  },
})

instance.interceptors.response.use(response => response.data)

Vue.prototype.$pocket = instance

new Vue({
  router,
  render: function(h) {
    return h(App)
  },
}).$mount('#app')
