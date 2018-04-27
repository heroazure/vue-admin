<template>
  <div>
    {{currentValue}}
    <button type="button" @click="onChange">修改</button>
  </div>
</template>
<style lang="less">

</style>
<script>
  export default{
    data () {
      return {}
    },
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    computed: {
      currentValue: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        }
      }
    },
    created () {
      // console.log('testDDD----created')
    },
    destroyed () {
      // console.log('testDDD----destroyed')
    },
    methods: {
      onChange () {
        this.currentValue = 'name112222'
      },
      test () {
        /** * *
         * @param fn {Function} 实际要执行的函数
         * @param delay {Number} 延迟时间，也就是阈值，单位是毫秒（ms）
         * @return {Function} 返回一个“去弹跳”了的函数
         * */
        function debounce (fn, delay) {
          // 定时器，用来 setTimeout
          var timer
          // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
          return function () {
            // 保存函数调用时的上下文和参数，传递给 fn
            var context = this
            var args = arguments
            // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
            clearTimeout(timer)
            // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
            // 再过 delay 毫秒就执行 fn
            timer = setTimeout(function () {
              fn.apply(context, args)
            }, delay)
          }
        }
        setInterval(function () {
          debounce(function () {
            console.log('ddd')
          }, 1000)()
        }, 10)
      }
    }
  }
</script>
