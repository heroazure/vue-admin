<template>
  <div>
    <input type="text" v-model="currentValue">
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
    mounted () {
      console.log('test----mounted')
    },
    created () {
      console.log('test----created')
    },
    updated () {
      console.log('test----updated')
    },
    destroyed () {
      console.log('test----destroyed')
    }
  }
</script>
