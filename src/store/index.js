import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const redirect_uri = process.env.VUE_APP_REDIRECT_URI
const consumer_key = process.env.VUE_APP_CONSUMER_KEY

const pocket = axios.create({
  method: 'post',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Accept': 'application/json',
  },
})

pocket.interceptors.response.use(response => response.data)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    list: [],
  },
  getters: {
    sortedList(state) {
      return Object.values(state.list).sort((a, b) => {
        return b.time_added - a.time_added
      })
    },
  },
  mutations: {
    setList(state, list) {
      state.list = list
    },
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
      state.list = []
      localStorage.clear()
    },
    archive(state, id) {
      state.list = state.list.filter(({ item_id }) => item_id !== id)
    },
    addURL(state, url) {
      state.list.unshift(url)
    },
  },
  actions: {
    async getList({ commit }, token) {
      const { list } = await pocket({
        url: '/pocket/get',
        data: {
          consumer_key,
          access_token: token,
          count: '50',
          sort: 'newest',
          detailType: 'simple',
        },
      })
      commit('setList', list)
    },
    async auth({ dispatch, commit }) {
      const { access_token, username } = await pocket({
        url: '/pocket/oauth/authorize',
        data: {
          consumer_key,
          // TODO: Missing
          code: REQUEST_TOKEN,
        },
      })

      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('username', username)

      dispatch('getList', access_token)
      commit('login')
    },
    async login() {
      const { code } = await pocket({
        url: '/pocket/oauth/request',
        data: {
          consumer_key,
          redirect_uri,
        },
      })

      localStorage.setItem('requestToken', code)
      window.locationAssign(
        `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${redirect_uri}`
      )
    },
    async archive({ commit }, id) {
      const access_token = localStorage.getItem('accessToken')

      await pocket({
        url: '/pocket/send',
        data: {
          consumer_key,
          access_token,
          actions: [
            {
              action: 'archive',
              item_id: id,
              time: Date().now,
            },
          ],
        },
      })

      commit('archive', id)
    },
    async addURL({ commit }, url) {
      const access_token = localStorage.getItem('accessToken')
      const { item } = pocket({
        url: '/pocket/add',
        data: {
          consumer_key,
          access_token,
          url: encodeURI(url),
        },
      })
      console.log(item)
      commit('addURL', item)
    },
  },
  modules: {},
})
