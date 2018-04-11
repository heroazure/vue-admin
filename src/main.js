import Vue from 'vue'
import router from './router'
import App from './App.vue'
// import 'iview/dist/styles/iview.css'
import '@components/iview/styles/index.less'

// 安装全局组件
import plugin from './plugin'
Vue.use(plugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

