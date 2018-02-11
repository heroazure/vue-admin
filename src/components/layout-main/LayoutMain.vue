<template>
    <div class="main">
      <div class="main-breadcrumb">
        <slot name="navigator"></slot>
      </div>
      <div class="main-alert" v-if="$slots.alert">
        <slot name="alert"></slot>
      </div>
      <div class="main-content">
        <slot></slot>
      </div>
    </div>
</template>
<style lang="less" scoped>
  @gutter:16px;
  .main{
    &-breadcrumb{
      height:30px;
      line-height:30px;
      background: #f1f1f1;
      padding:0 @gutter;
    }
    &-content{
      min-height: 440px;
      border-radius: 6px;
      padding: @gutter;
      margin:0 @gutter @gutter;
      background-color: #fff;
    }
    &-alert{
      padding:0 @gutter;
    }
  }
</style>
<script>
    export default{
        name:'layout-main',
        props:{
        }
    }
</script>
