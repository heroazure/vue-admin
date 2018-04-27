import Vue from 'vue'
import Router from 'vue-router'
import plugin from '../plugin'
// import Util from '../util/myUtil'

Vue.use(Router)

let Admin = (resolve) => require(['../Admin.vue'], resolve)

// 设置
let Config = (resolve) => require(['@views/config/Index.vue'], resolve)

// 用户
let User = (resolve) => require(['@views/user/Index.vue'], resolve)

let routes = [
  {
    path: '/',
    component: Admin,
    children: [
      {
        path: '',
        name: 'index',
        meta: {
          title: '后台首页'
        },
        redirect: '/config',
        component: Config
      },
      {
        path: 'config',
        name: 'config',
        meta: {
          title: '设置',
          keepAlive: false
        },
        component: Config
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '用户',
          keepAlive: false
        },
        component: User
      }
    ]
  },
  {
    path: '*',
    redirect: '/config'
  }
]

const router = new Router({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  plugin.LoadingBar.start()
  // Util.title(to.meta.title);20*800
  // window.document.title=''
  next()
})

router.afterEach((to, from, next) => {
  plugin.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
