<template>
  <div class="container text-left">
    <clients></clients>
    <authorized-clients></authorized-clients>
    <personal-access-tokens></personal-access-tokens>
  </div>
</template>
<script>

import Clients from './../components/passport/Clients.vue'
import AuthorizedClients from './../components/passport/AuthorizedClients.vue'
import PersonalAccessTokens from './../components/passport/PersonalAccessTokens.vue'

export default {
  components: {
    PersonalAccessTokens, AuthorizedClients, Clients
  },
  data () {
    return {
      user: this.$store.state.user
    }
  },
  created () {
    if (!this.user) {
      this.$router.push('login')
    }
    // do something after creating vue instance
    console.log('this.$store', this.$store)
  }
}
</script>
<style lang="scss" scoped>

</style>
