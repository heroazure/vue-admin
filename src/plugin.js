/**
 * Created by xuwei on 2018/4/11.
 */
import InputItem from '@components/input-item'
import LayoutMain from '@components/layout-main'
import ListSearch from '@components/list-search'
import Menu from '@components/iview/components/menu'
import Icon from '@components/iview/components/icon'
import LoadingBar from '@components/iview/components/loading-bar'
import Breadcrumb from '@components/iview/components/breadcrumb'

const jolly = {
  [InputItem.name]: InputItem,
  [LayoutMain.name]: LayoutMain,
  [ListSearch.name]: ListSearch,
  'j-menu': Menu,
  'j-menu-item': Menu.Item,
  'j-sub-menu': Menu.Sub,
  'j-menu-group': Menu.Group,
  'j-breadcrumb': Breadcrumb,
  'j-breadcrumb-item': Breadcrumb.Item,
  [Icon.name]: Icon
}

const install = (Vue, opts = {}) => {
  if (install.installed) return
  Object.keys(jolly).forEach(key => {
    Vue.component(key, jolly[key])
  })
}

export default {
  install,
  LoadingBar
}
