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
// import Select from '@components/iview/components/select'
import {Select, Option, OptionGroup} from '@components/iview/components/select'
import {Row, Col} from '@components/iview/components/grid'
import DatePicker from '@components/iview/components/date-picker'
import Dropdown from '@components/iview/components/dropdown'
import ImageGallery from '@components/image-gallery'
import dateFixPicker from '@components/date-fix-picker'

const jolly = {
  [InputItem.name]: InputItem,
  [LayoutMain.name]: LayoutMain,
  [ListSearch.name]: ListSearch,
  [ImageGallery.name]: ImageGallery,
  'j-menu': Menu,
  'j-menu-item': Menu.Item,
  'j-sub-menu': Menu.Sub,
  'j-menu-group': Menu.Group,
  'j-breadcrumb': Breadcrumb,
  'j-breadcrumb-item': Breadcrumb.Item,
  'j-option': Option,
  'j-option-group': OptionGroup,
  'j-select': Select,
  'j-row': Row,
  'j-col': Col,
  'j-date-picker': DatePicker,
  'j-dropdown': Dropdown,
  'j-dropdown-menu': Dropdown.Menu,
  'j-dropdown-item': Dropdown.Item,
  [Icon.name]: Icon,
  [dateFixPicker.name]: dateFixPicker
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
