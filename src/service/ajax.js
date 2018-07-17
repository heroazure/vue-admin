/**
 * Created by xuwei on 2017/3/16.
 */
import axios from 'axios'
import iview from 'iview'
import storage from 'util/storage'
const timeout = 8000

// axios.defaults.baseURL = '/index.php/admin'
axios.defaults.timeout = timeout
export default ({
                  url,
                  data = {},
                  method = 'get',
                  selfHandleMsg = false,
                  timeout = 8000,
                  config
                }) => {
  method = method.toLowerCase()

  let option = {
    url: url,
    method: method,
    timeout: timeout// 默认超时时间
  }
  const token=storage.getToken()
  if(token){
    option.headers={
      token:token
    }
  }
  option[method === 'get' ? 'params' : 'data'] = data

  option = Object.assign({}, option, config)
  return new Promise((resolve, reject) => {
    axios(option).then(({data}) => {
      if (!selfHandleMsg) {
        if (data.status.code !== 0) {
          //登录失效
          if (data.status.code === 403) {
            location.replace('/login')
          } else {
            iview.Message.warning(data.status.msg)
          }
          reject()
        } else {
          resolve(data)
        }
      } else {
        resolve(data)
      }
    }).catch(error => {
      iview.Message.warning('网络异常，请重试...')
      reject(error)
    })
  })
}
