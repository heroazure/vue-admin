<template>
  <div :class="['input-item',{'is-textarea':isTextarea,'is-must':isMust}]">
    <div class="input-item-label" :style="{'flex':`0 0 ${labelWidth}px`,'width':`${labelWidth}px`}">
      {{label}}

    </div>
    <div class="input-item-input">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import "../../assets/css/base/fn";

  .input-item {
    display: flex;
    align-items: center;
    min-height: 34px;
    margin-bottom: 10px;
    &-label {
      position: relative;
      flex: 0 0 80px;
      width: 80px;
      padding-right: 5px;
    }
    &-input {
      flex: 1;
    }
    &.is-textarea {
      .input-item-label {
        align-self: flex-start;
        margin-top: 8px;
      }
    }
    &.is-must {
      .input-item-label::after {
        position: absolute;
        content: '*';
        left: -8px;
        top: 0;
        color: @theme-color-error;
        font-size:14px;
      }
    }
  }
</style>
<script>
  export default{
    name: 'input-item',
    props: {
      label: {
        type: String,
        default: ''
      },
      labelWidth: {
        type: [String, Number],
        default: 80
      },
      hasText: {
        type: Boolean,
        default: false
      },
      isTextarea: {
        type: Boolean,
        default: false
      },
      isMust: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
