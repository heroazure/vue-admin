import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
// import Util from '../util/myUtil'

Vue.use(Router)

let Admin = (resolve) => require(['../Admin.vue'], resolve)

// 设置
let Config = (resolve) => require(['@views/config/Index.vue'], resolve)

let routes = [
  {
    path: '/',
    component: Admin,
    children: [
      {
        path: 'config',
        name: 'config',
        meta: {
          title: '设置'
        },
        component: Config
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
  iView.LoadingBar.start()
  // Util.title(to.meta.title);
  // window.document.title=''
  next()
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
