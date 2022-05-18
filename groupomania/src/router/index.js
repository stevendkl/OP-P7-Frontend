import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp }
]

const router = new VueRouter({
  routes
})

export default router
