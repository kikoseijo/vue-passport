<template>
  <div class="container">


    <login
      :api-url="apiUrl"
      :secret="secret"
      @success="handleLogin"
      @failed="handleErrors">
      <template>
        <div class="page-header">
          <h1>Login <small>Using password grant client</small></h1>
        </div>
        <div class="alert alert-warning" role="alert" v-if="errors">
          <!-- <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> -->
          {{errors}}
        </div>
      </template>
    </login>
  </div>
</template>

<script>
import Login from '@/passport/Login.vue'

export default {
  // props: ['cur_user'],
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
      this.errors = null
      this.$store.commit('setUser', { user: payload.authUser.data })
      // this.cur_user = payload.authUser.data
      this.$emit('user-change', payload.authUser.data)
      this.$localStorage.set('user', payload.authUser.data)
      this.$localStorage.set('token', payload.headers.Authorization)
      this.$localStorage.set('access_token', payload.authUser.access_token)
      this.$localStorage.set('refresh_token', payload.authUser.refresh_token)
      window.axios.defaults.headers.common['Authorization'] = payload.headers.Authorization
      this.$router.push('/oAuth')
    },
    handleErrors (errors) {
      this.errors = errors.response.data.message
      console.log('Authorization error' + errors)
    }
  }
}
</script>

<style scoped>
.page-header {
  margin-bottom: 28px;
}
</style>
