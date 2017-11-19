
import Login from './../views/Login.vue'
import Passport from './../views/Passport.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/oauth', component: Passport },
  { path: '/', component: Login }
]

export default routes
