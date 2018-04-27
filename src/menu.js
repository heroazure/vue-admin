/**
 * Created by xuwei on 2018/3/30.
 */
const paths = [
  // -1为假设的特殊id，表示一级菜单,其余为带有子菜单
  {id: '-1', urls: [{title: '菜单1', path: '/menu1', icon: 'alert-circled'}]},
  {id: '-1', urls: [{title: '菜单2', path: '/menu2', icon: 'alert-circled'}]},
  {id: '-1', urls: [{title: '菜单3', path: '/menu3', icon: 'alert-circled'}]},
  {id: '-1', urls: [{title: '用户', path: '/user', icon: 'alert-circled'}]},
  {
    id: '4',
    title: '菜单5',
    icon: 'alert-circled',
    urls: [{title: '配置', path: '/config'}]
  }
  // {
  //   id: '5',
  //   title: '标题2',
  //   icon: 'ios-list',
  //   urls: [{title: 'test2', path: '/test'}, {title: 'test3', path: '/test'}]
  // }
]

const activeMenu = (path) => {
  let obj = {}
  try {
    paths.forEach(item => {
      try {
        item.urls.forEach(im => {
          if (path.indexOf(im.path) === 0) {
            obj.openNames = [item.id]
            obj.activeName = im.path
            throw new Error('break')
          }
        })
      } catch (e) {
        throw e
      }
    })
  } catch (e) {
  }
  return obj
}

export default {
  paths,
  activeMenu
}
