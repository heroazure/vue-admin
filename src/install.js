/**
 * Created by xuwei on 2018/3/22.
 * 安装全局组件
 */
import iView from 'iview'
import InputItem from '@components/input-item'
import LayoutMain from '@components/layout-main'
import ListSearch from '@components/list-search'

export default (Vue) => {
  Vue.use(iView)
  Vue.component(InputItem.name, InputItem)
  Vue.component(LayoutMain.name, LayoutMain)
  Vue.component(ListSearch.name, ListSearch)
}
