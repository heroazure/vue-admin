/**
 * Created by xuwei on 2017/7/12.
 * 账户登录与登出相关接口,系统管理相关
 */
import ajax from '@service/ajax'
const loginInUrl = '/index.php/admin/User/Login'
const loginOutUrl = '/index.php/admin/User/LoginOut'

export default {
  loginIn: (data = {}) => {
    return ajax({
      url: loginInUrl,
      data: data,
      method: 'post'
    })
  },
  loginOut: (data = {}) => {
    return ajax({
      url: loginOutUrl,
      data: data,
      method: 'post'
    })
  }
}
