
import Dashboard from './../views/Dashboard.vue'
import Login from './../views/Login.vue'
import Passport from './../views/Passport.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/oauth', component: Passport },
  { path: '/', component: Dashboard }
]

export default routes
