import Vue from 'vue'
import VueRouter from 'vue-router'
import VueLocalStorage from 'vue-localstorage'
import Vuex from 'vuex'
import VueHighlightJS from 'vue-highlightjs'
import routes from './routes/route'
import App from './App.vue'

require('./bootstrap')

Vue.use(VueHighlightJS)
Vue.use(VueLocalStorage)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  routes // short for `routes: routes`
})

const store = new Vuex.Store({
  state: {
    count: 0,
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload.user
    }
  }
})


const app = new Vue({
  el: '#app',
  localStorage: {
    user: { type: Object }
  },
  store,
  router,
  render: h => h(App)
})
