import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
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
  mutations: {
    setList(state, list) {
      state.list = Object.values(list).sort((a, b) => {
        return b.time_added - a.time_added
      })
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
    addURL(state, article) {
      state.list.unshift(article)
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
    async auth({ dispatch, commit }, REQUEST_TOKEN) {
      const { access_token, username } = await pocket({
        url: '/pocket/oauth/authorize',
        data: {
          consumer_key,
          code: REQUEST_TOKEN,
        },
      })

      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('username', username)

      dispatch('getList', access_token)
      commit('login')
    },
    async login() {
      const redirect_uri = window.location.origin + '?mode=auth'
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
      const { item } = await pocket({
        url: '/pocket/add',
        data: {
          consumer_key,
          access_token,
          url: encodeURI(url),
        },
      })
      commit('addURL', item)
    },
  },
  modules: {},
})
