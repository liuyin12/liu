import Vue from 'vue'
import App from './App.vue'
// 导入包和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
// 导入components组件
import componnets from '@/components'
// 导入axios
import axios from '@/api/axios'
// 导入全局样式
import '@/styles/index.less'
// 导入jsonbig
// import JSONBig from 'json-bigint'
// 注册组件
Vue.use(componnets)
Vue.prototype.$http = axios
// 注册到vue实例
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
