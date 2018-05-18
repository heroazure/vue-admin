/**
 * 定义一个“依赖收集器”
 */
const Dep = {
  target: null
}

/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 */
function defineReactive (obj, key, val) {
  const deps = []
  Object.defineProperty(obj, key, {
    get () {
      console.log(`我的${key}属性被读取了！`)
      if (Dep.target && deps.indexOf(Dep.target) === -1) {
        deps.push(Dep.target)
      }
      return val
    },
    set (newVal) {
      console.log(`我的${key}属性被修改了！`)
      val = newVal
      deps.forEach((dep) => {
        dep()
      })
    }
  })
}

/**
 * 把一个对象的每一项都转化成可观测对象
 * @param { Object } obj 对象
 */
function observable (obj) {
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]])
  }
  return obj
}

/**
 * 当计算属性的值被更新时调用
 * @param { Any } val 计算属性的值
 */
function onComputedUpdate (val) {
  document.getElementById('input').value = val
  console.log(`我的类型是：${val}`)
}

/**
 * 观测者
 * @param { Object } obj 被观测对象
 * @param { String } key 被观测对象的key
 * @param { Function } cb 回调函数，返回“计算属性”的值
 */
function watcher (obj, key, cb) {
  // 定义一个被动触发函数，当这个“被观测对象”的依赖更新时调用
  const onDepUpdated = () => {
    const val = cb()
    onComputedUpdate(val)
  }

  Object.defineProperty(obj, key, {
    get () {
      Dep.target = onDepUpdated
      // 执行cb()的过程中会用到Dep.target，
      // 当cb()执行完了就重置Dep.target为null
      const val = cb()
      Dep.target = null
      return val
    },
    set () {
      console.error('计算属性无法被赋值！')
    }
  })
}

const hero = observable({
  health: 3000,
  IQ: 150
})

watcher(hero, 'type', () => {
  return hero.health > 4000 ? '坦克' : '脆皮'
})

// console.log(`英雄初始类型：${hero.type}`)

// hero.health = 5000

document.getElementById('input').value = '10'

