<template>
  <div class="gallery">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in urls" :key="index" @click="onClickThumb(index)">
          <j-image
            width="100%"
            height="100%"
            :src="item"></j-image>
        </div>
      </div>
      <!-- 如果需要导航按钮 -->
      <div class="gallery-button-prev">
        <j-icon type="ios-arrow-up"></j-icon>
      </div>
      <div class="gallery-button-next">
        <j-icon type="ios-arrow-down"></j-icon>
      </div>
    </div>
    <slot>
      <div class="gallery-bigimg-wrap">
        <j-image
          width="400px"
          height="400px"
          :src="current"></j-image>
      </div>
    </slot>
  </div>
</template>
<style lang="less">
  @import "swiper/dist/css/swiper.css";

  .gallery {
    display: inline-block;
  }

  .gallery-bigimg-wrap {
    display: inline-block;
    margin-left: 10px;
  }

  .swiper-container {
    display: inline-block;
    border: 1px solid #eee;
    width: 60px;
    height: 400px;
    padding: 20px 0;
  }

  .swiper-slide {
    cursor: pointer;
  }

  .gallery-button-prev,
  .gallery-button-next {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    height: 20px;
    background: #fff;
    z-index: 100;
    cursor: pointer;
  }

  .gallery-button-prev {
    top: 0;
  }

  .gallery-button-next {
    bottom: 0;
  }
</style>
<script>
  import Swiper from 'swiper'
  import Jimage from '../j-image'
  export default{
    name: 'j-image-gallery',
    components: {
      [Jimage.name]: Jimage
    },
    props: {
      urls: {
        type: Array,
        default () {
          return [
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.60x60.jpg',
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.60x60.jpg',
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.60x60.jpg',
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.60x60.jpg',
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.60x60.jpg',
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.60x60.jpg'
          ]
        }
      },
      preUrls: {
        type: Array,
        default () {
          return [
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.400x400.jpg',
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.400x400.jpg',
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.400x400.jpg',
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.400x400.jpg',
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.400x400.jpg',
            'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.400x400.jpg'
          ]
        }
      },
      current: {
        type: String,
        default: 'https://cbu01.alicdn.com/img/ibank/2018/278/510/8598015872_1458597433.400x400.jpg'
      }
    },
    data () {
      return {
        swiper: null,
        currentImg: this.current
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.initSwiper()
      })
    },
    methods: {
      onClickThumb (index) {
        this.currentImg = this.preUrls[index]
      },
      initSwiper () {
        this.swiper = new Swiper('.swiper-container', {
          direction: 'vertical',
          slidesPerView: 5, // 一容器显示多少个
          spaceBetween: 10, // 每个之间的间距
          slidesPerGroup: 5, // 一次换页切换多少个单元
          navigation: {
            nextEl: '.gallery-button-next',
            prevEl: '.gallery-button-prev'
          }
        })
      }
    }
  }
</script>
