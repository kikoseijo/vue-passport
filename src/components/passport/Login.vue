<template>
  <div class="row login-view">
    <div class="col-sm-6 col-sm-offset-3">
      <slot>

      </slot>
      <form @submit.prevent="handleLogin">
        <div :class="controlClass">
          <label class="control-label" v-text="labels.user"></label>
          <input
          :class="inputClass"
          type="text"
          :placeholder="userPlaceholder"
          v-model="login.user">
        </div>
        <div :class="controlClass">
          <label class="control-label"  v-text="labels.password"></label>
          <input
          :class="inputClass"
          type="password"
          :placeholder="passwordPlaceholder"
          v-model="login.password">
        </div>
        <p class="control">
          <button
          type="submit"
          class="btn btn-primary btn-block btn-lg"
          v-text="labels.button"
          :disabled="loading"
          ></button>
        </p>
      </form>

    </div>
  </div>
</template>

<script>

export default {
  props: {
    labels: {
      type: Object,
      default () {
        return {
          title: 'Login',
          user: 'User',
          password: 'Password',
          button: 'Login'
        }
      }
    },

    userPlaceholder: String,

    passwordPlaceholder: String,

    controlClass: {
      type: String,
      default: 'form-group'
    },

    inputClass: {
      type: String,
      default: 'form-control'
    },

    apiUrl: {
      type: String,
      required: true
    },

    loginRoute: {
      type: String,
      default: 'oauth/token'
    },

    userRoute: {
      type: String,
      default: 'me'
    },

    clientId: {
      type: [Number, String],
      default: 2
    },

    secret: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      login: {
        user: 'xxx@sunnyface.com',
        password: 'xxx'
      }
    }
  },
  computed: {
    loginUrl () {
      return `${this.apiUrl}/${this.loginRoute}`
    },
    userUrl () {
      return `${this.apiUrl}/${this.userRoute}`
    }
  },
  methods: {
    getHeaders (token) {
      return {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    },
    handleLogin () {
      this.loading = true
      const postData = {
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.secret,
        username: this.login.user,
        password: this.login.password,
        scope: ''
      }

      const authUser = {}

      window.axios.post(this.loginUrl, postData)
        .then(response => {
          authUser.access_token = response.data.access_token
          authUser.refresh_token = response.data.refresh_token

          const headers = this.getHeaders(authUser.access_token)

          window.axios.get(this.userUrl, {headers})
            .then(response => {
              authUser.data = response.data
              this.$emit('success', { authUser, headers })
              this.loading = false
            })
            .catch(error => {
              this.$emit('failed', error)
              this.loading = false
            })
        })
        .catch(error => {
          this.$emit('failed', error)
          this.loading = false
        })
    }
  }
}
</script>

<style>
  .login-view {
    margin-bottom: 34px;
  }
</style>
