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

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next()  放行  next('/login')  强制跳转

  if ((to.path === '/login') || (to.path === '/signup')) return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
