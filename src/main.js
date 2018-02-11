import Vue from 'vue'
import iView from 'iview'
import router from './router'
import App from './App.vue'
import 'iview/dist/styles/iview.css'
// import InputItem from './components/input-item'
// import Editor from './components/editor'
import LayoutMain from './components/layout-main'
import ListSearch from './components/list-search'

Vue.use(iView)
// Vue.component(InputItem.name,InputItem)
// Vue.component(Editor.name,Editor)
Vue.component(LayoutMain.name,LayoutMain)
Vue.component(ListSearch.name,ListSearch)

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})

