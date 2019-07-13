// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '../views/home/index .vue'
import Welcome from '../views/welcome/index.vue'
import NotFound from '../views/404/index.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    { path: '/',
      component: Home,
      children: [{ name: 'welcome', path: '/', component: Welcome }]
    },
    // 匹配不到页面的时候显示404 错误
    { name: '404', path: '*', component: NotFound }
  ]
})
// 加上前置守卫
router.beforeEach((to, from, next) => {
  // 判断当路径等于login的时候进入下一环节
  if (to.path === '/login') return next()
  // 定义一个变量用来保存 获取本地存储的信息
  const user = window.sessionStorage.getItem('hm74')
  // 判断在本地的数据的时进入   next()放行   next('/login')拦截
  if (user) return next()
  // 拦截  进入login页面
  next('/login')
})

export default router
