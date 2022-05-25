import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import { Message, MessageBox } from 'element-ui'

Vue.use(ElementUI, { locale })
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

