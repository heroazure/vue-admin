/**
 * Created by xuwei on 2017/3/14.
 */
let util = {}
util.title = function (title) {
  title = title ? title + ' - 后台' : '后台'
  window.document.title = title
}

// 点击页面（除当前需要隐藏的块）隐藏当前块
util.documentTapHide = (func) => {
  let bindHide = function () {
    func && func()
    document.removeEventListener('click', bindHide, false)
  }
  setTimeout(function () {
    document.addEventListener('click', bindHide, false)
  }, 500)
}

export default util
