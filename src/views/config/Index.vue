<template>
  <layout-main>
    <j-breadcrumb slot="navigator" separator="<span style='color: red;'>/<span>">
      <j-breadcrumb-item :to="{path: '/user'}">用户
      </j-breadcrumb-item>
      <j-breadcrumb-item>设置</j-breadcrumb-item>
    </j-breadcrumb>
    <test v-for="(val, key) in obj" v-model="obj[key]" :key="key"></test>
    <button type="button" @click="onTest">输出</button>
    <testd v-model="val2"></testd>
    <j-image
      height="300px"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523964743624&di=36b76a2b836b0a1ab752aac5f648ec8a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010a1b554c01d1000001bf72a68b37.jpg%401280w_1l_2o_100sh.png">
    </j-image>
    <j-image
      type="heightFix"
      height="300px"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523964916564&di=fc5f9643bc58ef8012d05f8d809074e8&imgtype=0&src=http%3A%2F%2Fpic61.nipic.com%2Ffile%2F20150309%2F4614066_191939440318_2.jpg">
    </j-image>
    <j-image
      type="scaleToFill"
      height="300px"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523964916564&di=9b222c2ea6ffc2141e33a16009840f66&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201511%2F07%2F20151107152913_LxnKN.jpeg">
    </j-image>
    <j-image
      type="widthFix"
      src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3534884392,1992548807&fm=58">
    </j-image>
  </layout-main>
</template>
<style lang="less">

</style>
<script>
  import test from './test.vue'
  import testd from './test-d.vue'
  import JImage from '@components/j-image'
  export default{
    components: {
      test,
      testd,
      'j-image': JImage
    },
    data () {
      return {
        obj: {
          name: 'xiaolijun',
          phone: '125698963',
          sex: '男'
        },
        val2: ''
      }
    },
    mounted () {
      console.log('index----mounted')
    },
    created () {
      console.log('index----created')
    },
    destroyed () {
      console.log('index----destroyed')
    },
    updated () {
      console.log('index----updated')
    },
    watch: {
      obj: {
        handler (val, oldVal) {
          console.log('obj:', val)
          console.log('objVal:', oldVal)
        },
        deep: true,
        immediate: true
      },
      val2: {
        handler (val, oldVal) {
          console.log(`val:${val},oldVal:${oldVal}`)
        },
        immediate: true
      }
    },
    methods: {
      onTest () {
        console.log('obj:', this.obj)
        console.log('val2:', this.val2)
      }
    }
  }
</script>
