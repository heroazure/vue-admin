/**
 * Created by xuwei on 2017/7/12.
 *
 */
import ajax from 'service/ajax'
const urlList = '/index.php/admin/Pen/List'
const urlCreate = '/index.php/admin/Pen/Create'
const urlDel = '/index.php/admin/Pen/Pen'
const urlDetail = '/index.php/admin/Pen/Detail'

export default {
  getGoodsList: (data = {}) => {
    return ajax({
      url: urlList,
      data: data,
      method: 'get'
    })
  },
  postGoods: (data = {}) => {
    return ajax({
      url: urlCreate,
      data: data,
      method: 'post'
    })
  },
  delGoods: (data = {}) => {
    return ajax({
      url: urlDel,
      data: data,
      method: 'delete'
    })
  },
  getGoodsDetail: (data = {}) => {
    return ajax({
      url: urlDetail,
      data: data,
      method: 'get'
    })
  }
}
