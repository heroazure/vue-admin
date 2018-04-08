import Vue from 'vue'
import {Breadcrumb, BreadcrumbItem, Button, RadioGroup, Radio, Row, Col, Input, Table, Page, Form, FormItem, Select, Option, Icon, Card} from 'iview'
import router from './router'
import App from './App.vue'
import 'iview/dist/styles/iview.css'
// import InputItem from './components/input-item'
// import Editor from './components/editor'
import LayoutMain from './components/layout-main'
import ListSearch from './components/list-search'

// Vue.use(iView)
Vue.component('Breadcrumb',Breadcrumb)
Vue.component('Breadcrumb-item',BreadcrumbItem)
Vue.component('Button',Button)
Vue.component('RadioGroup',RadioGroup)
Vue.component('Radio',Radio)
Vue.component('Row',Row)
Vue.component('Col',Col)
Vue.component('Input',Input)
Vue.component('Table',Table)
Vue.component('Page',Page)
Vue.component('Form',Form)
Vue.component('FormItem',FormItem)
Vue.component('Select',Select)
Vue.component('Option',Option)
Vue.component('Icon',Icon)
Vue.component('Card',Card)
// Vue.component(InputItem.name,InputItem)
// Vue.component(Editor.name,Editor)
Vue.component(LayoutMain.name,LayoutMain)
Vue.component(ListSearch.name,ListSearch)

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})

