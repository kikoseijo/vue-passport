<template>
  <div>
    <login
      :api-url="apiUrl"
      :secret="secret"
      @success="handleLogin"
      @failed="handleErrors">
    </login>
    <div class="alert alert-error" v-if="errors">{{errors}}</div>
  </div>
</template>

<script>
import Login from './../components/passport/Login.vue'

export default {
  components: {
    Login
  },
  data () {
    return {
      errors: null,
      msg: 'Welcome to Your Vue.js App',
      apiUrl: '',
      secret: 'iSvDR5tq7lGC19zGcitB5S2YIN0ScZ10aPTHWSk8'
    }
  },
  methods: {
    handleLogin (payload) {
      console.log('payload', payload)
      this.errors = null
      this.$store.commit('setUser', { user: payload.authUser.data })
      this.$localStorage.set('user', payload.authUser.data)
      this.$localStorage.set('token', payload.headers.Authorization)
      this.$localStorage.set('access_token', payload.authUser.access_token)
      this.$localStorage.set('refresh_token', payload.authUser.refresh_token)
      window.axios.defaults.headers.common['Authorization'] = payload.headers.Authorization
      console.log('payload.headers.Authorization', payload.headers.Authorization)
      this.$router.push('/oAuth')
    },
    handleErrors (errors) {
      this.errors = errors
      console.log('Authorization error' + errors)
    }
  }
}
</script>

<style>
</style>
