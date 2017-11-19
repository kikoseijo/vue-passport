import Cookies from 'js-cookie'
import Cookie from 'cookie'

const inBrowser = typeof window !== 'undefined'
const opts = {}
export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.user = user
  },
  SET_TOKEN: function (state, token) {
    state.token = token
    // Setup axios
    this.$axios.setToken(token, 'Bearer')

    // Store token in cookies
    if (inBrowser) {
      if (!token) {
        return Cookies.remove('token', opts)
      }
      Cookies.set('token', token, opts)
    }
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}

export const actions = {
  async load_token ({ commit }, req) {
    // Try to extract token from cookies
    const cookieStr = inBrowser ? document.cookie : req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies.token
    commit('SET_TOKEN', token)
  },

  async register ({ commit }, { email, password, confirmPassword }) {
    try {
      const { data } = await this.$axios.post('auth/register', { email, password, confirmPassword })

      commit('SET_USER', data.user)
      commit('SET_TOKEN', data.token)
    } catch (error) {
      throw error
    }
  },

  async login ({ commit }, { email, password }) {
    try {
      const { data } = await this.$axios.post('auth/login', { email, password })
      commit('SET_USER', data.user)
      commit('SET_TOKEN', data.token)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await this.$axios.post('auth/logout')
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
  },

  async set_user ({ commit, dispatch, state }, req) {
    try {
      await dispatch('load_token', req)
      // No token
      if (!state.token) {
        return
      }

      if (inBrowser) {
        await _refreshToken(this, commit)
      } else {
        const { data } = await this.$axios.get('auth/user')
        commit('SET_USER', data.data)
      }
    } catch (error) {
      // Token doesn't work anymore, throw it out
      commit('SET_USER', null)
      commit('SET_TOKEN', null)
    }
  },

  start_refresh_interval ({ getters }) {
    let refreshInterval = setInterval(() => {
      // If authenticated, refresh token every 60 min
      // Get new token from header & replace token in storage and axios headers
      try {
        if (getters.isAuthenticated) {
          _refreshToken(this)
        }
      } catch (error) {
        clearInterval(refreshInterval)
      }
    }, 1000 * 60 * 60)
  }
}

async function _refreshToken (vm, commit) {
  return vm.$axios.get('auth/refresh')
    .then(async ({ headers }) => {
      let token = headers.authorization.replace('Bearer ', '')
      commit('SET_TOKEN', token)
    })
    .catch(() => {
      console.log('error')
    })
}
