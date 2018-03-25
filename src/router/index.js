import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
//import Util from '../util/myUtil'

Vue.use(Router)

let Admin = (resolve) => require(['../Admin.vue'], resolve)

//登录页面
let Login = (resolve) => require(['views/Login.vue'], resolve)

//店铺概况
let ShopGeneral = (resolve) => require(['views/shopgeneral/Index.vue'], resolve)

//商品管理
let Goods = (resolve) => require(['views/goods/Index.vue'], resolve)
let GoodsPublish = (resolve) => require(['views/goods/publish/Index.vue'], resolve)

//店铺管理
let Shop = (resolve) => require(['views/shop/Index.vue'], resolve)

//消息管理
let Message = (resolve) => require(['views/message/Index.vue'], resolve)

//客户管理
let Customer = (resolve) => require(['views/customer/Index.vue'], resolve)

//设置
let Config = (resolve) => require(['views/config/Index.vue'], resolve)

// 组件测试
let Chart = (resolve) => require(['views/chart/Index.vue'], resolve)

let routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '用户登录'
    },
    component: Login
  },
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
        redirect: '/shopgeneral',
        component: ShopGeneral
      },
      {
        path: 'shopgeneral',
        name: 'shopgeneral',
        meta: {
          title: '店铺概况'
        },
        component: ShopGeneral
      },
      {
        path: 'goods',
        name: 'goods',
        meta: {
          title: '商品管理'
        },
        component: Goods
      },
      {
        path: 'goods/publish',
        name: 'goodspublish',
        meta: {
          title: '商品发布'
        },
        component: GoodsPublish
      },
      {
        path: 'goods/edit/:id',
        name: 'goodsedit',
        meta: {
          title: '商品编辑'
        },
        component: GoodsPublish
      },
      {
        path: 'shop',
        name: 'shop',
        meta: {
          title: '店铺管理'
        },
        component: Shop
      },
      {
        path: 'message',
        name: 'message',
        meta: {
          title: '消息管理'
        },
        component: Message
      },
      {
        path: 'customer',
        name: 'customer',
        meta: {
          title: '客户管理'
        },
        component: Customer
      },
      {
        path: 'config',
        name: 'config',
        meta: {
          title: '设置'
        },
        component: Config
      },
      {
        path: 'chart',
        name: 'chart',
        meta: {
          title: '图标组件'
        },
        component: Chart
      },
    ]
  }
]

const router = new Router({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  // Util.title(to.meta.title);
  //window.document.title=''
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router
