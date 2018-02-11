<template>
  <div class="list-search" :class="{between:type==='between'}" @keyup.enter="onSearch">
    <template v-if="type==='between'">
      <div class="list-search-extra">
        <slot name="extra"></slot>
      </div>
      <div class="list-search-opt">
        <slot></slot>
      </div>
    </template>
    <template v-if="type==='default'">
      <slot></slot>
    </template>
  </div>
</template>
<style lang="less" scoped>
  .list-search {
    margin-bottom: 20px;
    &.between{
      display: flex;
      justify-content: space-between;
    }
  }
</style>
<script>
  export default{
    name: 'list-search',
    props: {
        //default,between
      type: {
        type: String,
        default: 'default'
      }
    },
    methods: {
      onSearch(){
        this.$emit('on-search')
      }
    }
  }
</script>
