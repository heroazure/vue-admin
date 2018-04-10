import Vue from 'vue'
import router from './router'
import App from './App.vue'
import 'iview/dist/styles/iview.css'

// 安装全局组件
import install from './install'
install(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

