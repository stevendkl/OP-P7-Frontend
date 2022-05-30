import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import Newpost from '../components/Newpost.vue'
import Article from '../components/Article.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/home', component: Home },
  { path: '/profile', component: Profile },
  { path: '/newpost', component: Newpost },
  { path: '/article', Name: 'Article', component: Article },
]

const router = new VueRouter({
  routes
})

// load router guard
router.beforeEach((to, from, next) => {  

  if ((to.path === '/login') || (to.path === '/signup')) return next()
  // get token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
  
})

export default router
