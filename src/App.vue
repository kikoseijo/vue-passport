<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" style="padding:5px 0 0 15px" href="/">
            <img alt="Vue Passport demo" src="./assets/logo.png" height="40">
          </a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><router-link to="/login" v-if="!cur_user">Login</router-link></li>
            <li><a href="#stye" @click="logOut" v-if="cur_user">logout</a></li>
            <li><router-link to="/oauth">Passport</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a role="button" data-toggle="collapse"
                href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Show debug</a>
            </li>
            <li v-if="cur_user && cur_user.id>0" class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                {{ cur_user.name }} <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <router-view :current-user="cur_user"></router-view>
    </div>
    <div class="container text-left">

      <div class="collapse" id="collapseExample">
        <div class="well">
          <span class="label label-info pull-right">Debug</span>
          <pre v-highlightjs="">
            <code class="javascript">{{cur_user}}</code>
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      cur_user: {}
    }
  },
  created () {
    // do something after creating vue instance
    console.log('[App.vue] created()')

    if (!this.$store.state.user) {
      const storedUser = this.$localStorage.get('user')
      if (storedUser && storedUser.id > 0) {
        this.$store.commit('setUser', { user: storedUser })
        this.cur_user = storedUser
        console.log('this.$store.state.user', this.$store.state.user)
        window.axios.defaults.headers.common['Authorization'] = this.$localStorage.get('token')
      } else {
        console.log('Needs login')
        this.$router.push('/login')
      }
    } else {
      this.cur_user = this.$store.state.user
    }

    this.$on('userChange', function (updatedUser) {
      this.cur_user = updatedUser
    })
  },
  methods: {
    logOut () {
      this.$localStorage.remove('user')
      this.$localStorage.remove('token')
      this.$store.commit('setUser', { user: null })
      this.cur_user = null
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container-fluid {
  margin-top: 42px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
