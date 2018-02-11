/**
 * Created by xuwei on 2017/7/12.
 */
export default {
  keys: {
    account: 'account',
    userName: 'userName',
    token: 'loginToken',
  },
  getAccount(){
    return this.getLocal(this.keys.account)
  },
  setAccount(val){
    this.setLocal(this.keys.account, val)
  },
  getUserName(){
    return this.getLocal(this.keys.userName)
  },
  setUserName(val){
    this.setLocal(this.keys.userName, val)
  },
  getToken(){
    return this.getLocal(this.keys.token)
  },
  setToken(val){
    this.setLocal(this.keys.token, val)
  },
  getLocal(key){
    let result = null
    try {
      result = JSON.parse(localStorage.getItem(key))
    } catch (e) {
      result = localStorage.getItem(key)
    }
    return result
  },
  setLocal(key, val){
    if (!val) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, val)
    }
  }
}
