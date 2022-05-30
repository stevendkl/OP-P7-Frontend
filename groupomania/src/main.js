import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

// set url of the backend serve
axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.interceptors.request.use(config => {
  //console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

//命名$http = axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.prototype.formatWord = function (val) {
  return val.replace(/<.*?>/g,"")
},

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
