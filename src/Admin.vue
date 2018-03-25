<style scoped lang="less">
  @import "./assets/css/base/fn";

  @min-width: 800px;
  @menu-width: 150px;
  .layout {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    &-logo-left {
      height: 50px;
      line-height: 50px;
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
        background-color: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        flex: 0 0 50px;
        height: 50px;
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
      <Menu theme="dark" :active-name="activeMenu.activeName" :open-names="activeMenu.openNames" width="auto"
            @on-select="onTapMenu" accordion>
        <div class="layout-logo-left"><span v-show="!isFold">趣淘笔</span></div>
        <Menu-item name="/shopgeneral">
          <Icon type="arrow-graph-up-right" :size="iconSize" :title="isFold?'店铺概况':''"></Icon>
          <span v-show="!isFold">店铺概况</span>
        </Menu-item>
        <Menu-item name="/goods">
          <Icon type="edit" :size="iconSize" :title="isFold?'商品管理':''"></Icon>
          <span v-show="!isFold">商品管理</span>
        </Menu-item>
        <Menu-item name="/shop">
          <Icon type="briefcase" :size="iconSize" :title="isFold?'店铺管理':''"></Icon>
          <span v-show="!isFold">店铺管理</span>
        </Menu-item>
        <Menu-item name="/message">
          <Icon type="speakerphone" :size="iconSize" :title="isFold?'消息管理':''"></Icon>
          <span v-show="!isFold">消息管理</span>
        </Menu-item>
        <Menu-item name="/customer">
          <Icon type="person-stalker" :size="iconSize" :title="isFold?'客户管理':''"></Icon>
          <span v-show="!isFold">客户管理</span>
        </Menu-item>
        <Menu-item name="/config">
          <Icon type="ios-cog" :size="iconSize" :title="isFold?'设置':''"></Icon>
          <span v-show="!isFold">设置</span>
        </Menu-item>
        <Submenu name="0">
          <template slot="title">
            <Icon type="ios-paper" :size="iconSize"></Icon>
            组件测试
        </template>
          <Menu-item name="/chart">图标组件</Menu-item>
        </Submenu>
      </Menu>
    </div>
    <div class="layout-content" :class="{active:isFold}">
      <div class="layout-content-header">
        <div class="left">
          <Icon type="navicon-round"
                class="pointer"
                :style="foldStyle"
                :size="20"
                @click.native="onFoldMenus"></Icon>
        </div>
        <div class="right">
          <Dropdown placement="bottom-end" @on-click="onToggleHeader">
            <img class="user-header" :src="require('assets/img/hot.jpg')" alt="商家头像">
            <DropdownMenu slot="list">
              <DropdownItem name="0">{{userName}}</DropdownItem>
              <DropdownItem name="1" divided>退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div class="layout-content-main">
        <div class="layout-content-main-wrap">
          <transition name="main">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
          <div class="layout-content-copyright">
            2017-2022 &copy; heroxiao
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import storage from 'util/storage'
  import loginApi from 'service/system'
  export default {
    data () {
      return {
        userName: '',
        paths: [
          // -1为假设的特殊id，表示一级菜单
          {id: '-1', urls: ['/shopgeneral', '/goods', '/shop', '/message', '/customer', '/config']},
          {id: '0', urls: ['/chart']}
          /*{id: '4', urls: ['/resourcecates', '/resource', '/coupon']},
          {id: '5', urls: ['/order']},
          {id: '6', urls: ['/feedback']}*/
        ],
        isFold: false
      }
    },
    computed: {
      iconSize () {
        return 18
      },
      foldStyle(){
        return {
          'transform': 'rotateZ(' + (this.isFold ? 90 : 0) + 'deg)',
          'transition': 'transform .3s ease'
        }
      },
      activeMenu(){
        let path = this.$route.path
        let obj = {}
        try {
          this.paths.forEach(item => {
            try {
              item.urls.forEach(im => {
                if (path.indexOf(im) === 0) {
                  obj.openNames = [item.id]
                  obj.activeName = im
                  throw new Error('break')
                }
              })
            } catch (e) {
              throw e
            }
          })
        } catch (e) {
        }
        return obj
      }
    },
    mounted(){
      /*let userName=storage.getUserName()
       if(!userName){
       this.$router.replace('/login')
       return
       }*/
      this.userName = storage.getUserName()
    },
    methods: {
      onTapMenu(path){
        this.$router.push(path)
      },
      onToggleHeader(name){
        if (name === '1') {
          this.loginOut()
        }
      },
      onFoldMenus(){
        this.isFold = !this.isFold
        console.log('2222')
      },
      loginOut(){
        loginApi.loginOut()
          .then(data => {
            storage.setUserName()
            this.$router.replace('/login')
          })
      }
    }
  }
</script>
