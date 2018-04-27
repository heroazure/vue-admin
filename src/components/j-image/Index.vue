<template>
  <div :class="['j-image', classObj, {border: border}]" :style="styleObj">
    <img :src="src" :alt="alt">
  </div>
</template>
<style lang="less">
  @import "~@base/fn";
  .j-image {
    display: flex;
    justify-content: center;
    align-items: center;
    &.border {
      border: 1px solid @border-color;
    }
    &.width-fix {
      img {
        width: 100%;
        height: auto;
      }
    }
    &.height-fix {
      display: inline-block;
      img {
        width: auto;
        height: 100%;
      }
    }
    &.adapt {
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    &.scale-to-fill {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
<script>
  export default{
    name: 'j-image',
    props: {
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '400px'
      },
      src: {
        type: String,
        default: '#'
      },
      alt: {
        type: String,
        default: '图片'
      },
      border: {
        type: Boolean,
        default: true
      },
      // scaleToFill, widthFix, adapt
      // scaleToFill宽高完全充满会变形
      // widthFix宽度固定高度自适应（此时的height属性无效）
      // heightFix高度固定宽度自适应（此时的width属性无效）
      // adapt图片完整展示在容器中，小于尺寸时显示在正中
      type: {
        type: String,
        default: 'adapt'
      }
    },
    data () {
      return {}
    },
    computed: {
      styleObj () {
        if (this.type === 'widthFix') {
          return {
            width: this.width,
            height: 'auto'
          }
        }
        if (this.type === 'heightFix') {
          return {
            width: 'auto',
            height: this.height
          }
        }
        return {
          width: this.width,
          height: this.height
        }
      },
      classObj () {
        switch (this.type) {
          case 'widthFix':
            return 'width-fix'
          case 'adapt':
            return 'adapt'
          case 'scaleToFill':
            return 'scale-to-fill'
          case 'heightFix':
            return 'height-fix'
          default:
            return 'adapt'
        }
      }
    }
  }
</script>
