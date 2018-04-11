<style scoped lang="less">
  @import "~@base/fn";

  @min-width: 1000px;
  @menu-width: 150px;
  @header-height: 60px;
  .layout {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    &-logo-left {
      height: @header-height;
      line-height: @header-height;
      color: #fff;
      font-size: 20px;
      padding-left: 30px;
    }
    &-menus {
      width: @menu-width;
      height: 100%;
      overflow-y: auto;
      background-color: #464c5b;
      //transition: width .1s ease;
      &.active {
        width: 60px;
      }
    }
    &-content {
      position: absolute;
      left: @menu-width;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      overflow-x: auto;
      //transition: left .1s ease;
      &.active {
        left: 60px;
      }
      &-header {
        width: 100%;
        min-width: @min-width;
        background-color: #464c5b;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        flex: 0 0 @header-height;
        height: @header-height;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding: 0 16px;
      }
      &-main {
        position: relative;
        flex: 1;
        overflow-y: auto;
        min-width: @min-width;
        &-wrap {
          position: relative;
          min-height: 100%;
          padding-bottom: 40px;
          background-color: #f1f1f1;
          .layout-content-copyright {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #2a2b33;
            color: #828285;
          }
        }
      }
    }
  }

  .user-header {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    cursor: pointer;
  }

  //重写.ivu-menu-item
  .ivu-menu-item {
    padding: 14px 16px;
  }
</style>
<template>
  <div class="layout">
    <div class="layout-menus" :class="{active:isFold}">
      <j-menu theme="dark" :active-name="activeMenu.activeName" :open-names="activeMenu.openNames" width="auto"
            @on-select="onTapMenu" accordion>
        <!--<div class="layout-logo-left"><span v-show="!isFold">商家决策</span></div>-->
        <div v-for="(item, index) in paths">
          <template v-if="item.id === '-1'">
            <j-menu-item :name="im.path" v-for="(im,idx) in item.urls" :key="idx">
              <j-icon :type="im.icon" :size="iconSize" :title="isFold?im.title:''"></j-icon>
              <span v-show="!isFold">{{im.title}}</span>
            </j-menu-item>
          </template>
          <template v-else>
            <j-sub-menu :name="item.id">
              <template slot="title">
                <j-icon :type="item.icon" :size="iconSize"></j-icon>
                {{item.title}}
              </template>
              <j-menu-item :name="im.path" v-for="(im, idx) in item.urls" :key="idx">{{im.title}}</j-menu-item>
            </j-sub-menu>
          </template>
        </div>
      </j-menu>
    </div>
    <div class="layout-content" :class="{active:isFold}">
      <div class="layout-content-header">
        <div class="left">
          <!--<Icon type="navicon-round"
                class="pointer"
                :style="foldStyle"
                style="color: #fff;"
                :size="20"
                @click.native="onFoldMenus"></Icon>-->
        </div>
        <div class="right">
          <!--<Dropdown placement="bottom-end" @on-click="onToggleHeader">
            <img class="user-header" :src="require('@assets/img/hot.jpg')" alt="商家头像">
            <DropdownMenu slot="list">
              <DropdownItem name="0">{{userName}}</DropdownItem>
              <DropdownItem name="1" divided>退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>-->
        </div>
      </div>
      <div class="layout-content-main">
        <div class="layout-content-main-wrap">
          <!--页面默认都是缓存的，只有当meta.keepAlive===false时不缓存-->
          <transition name="main">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive===undefined||$route.meta.keepAlive===true"></router-view>
            </keep-alive>
          </transition>
          <transition name="main">
            <router-view v-if="$route.meta.keepAlive===false"></router-view>
          </transition>
          <div class="layout-content-copyright">
            2018-2022 &copy; JollyChic
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import storage from '@util/storage'
  import loginApi from '@service/system'
  import menu from './menu'
  export default {
    data () {
      return {
        userName: '',
        paths: menu.paths,
        isFold: false,
        activeMenu: {}
      }
    },
    computed: {
      iconSize () {
        return 18
      },
      foldStyle () {
        return {
          'transform': 'rotateZ(' + (this.isFold ? 90 : 0) + 'deg)',
          'transition': 'transform .3s ease'
        }
      }
    },
    mounted () {
      /* let userName=storage.getUserName()
       if(!userName){
       this.$router.replace('/login')
       return
       } */
      this.userName = storage.getUserName()
    },
    watch: {
      '$route': {
        handler (val) {
          this.activeMenu = menu.activeMenu(val.path)
        },
        immediate: true
      }
    },
    methods: {
      onTapMenu (path) {
        this.$router.push(path)
      },
      onToggleHeader (name) {
        if (name === '1') {
          // this.loginOut()
        }
      },
      onFoldMenus () {
        this.isFold = !this.isFold
      },
      loginOut () {
        loginApi.loginOut()
          .then(data => {
            storage.setUserName()
            this.$router.replace('/login')
          })
      }
    }
  }
</script>
