<template>
  <div>
    <j-dropdown trigger="custom" :visible="visible" :placement="placement">
      <slot>
        <div class="date-fix-input"
             @mouseenter="isHoverInput = true"
             @mouseleave="isHoverInput = false"
             @click.stop="onOpen">
          <span class="placeholder" v-if="!currentValue">{{placeholder}}</span>
          <span v-else>{{currentValue}}</span>
          <j-icon v-if="currentValue && isHoverInput" :size="14" type="ios-close" @click.native="onClear"></j-icon>
          <j-icon v-else :size="14" type="ios-calendar-outline"></j-icon>
        </div>
      </slot>
      <j-dropdown-menu slot="list" class="down" @click.native.stop="">
        <ul class="down-left">
          <li class="down-left-item" :class="{active: activeId === item.id}" v-for="item in items" :key="item.id"
              @mouseenter="onHover(item.id)" @click="onTapItem(item)">
            <div v-if="item.id.startsWith('s')" class="down-left-item-more">
              <span>{{item.name}}</span>
              <j-icon type="ios-arrow-right"></j-icon>
            </div>
            <div v-else>
              {{item.name}}
              <span class="down-left-item-range" v-show="!showCalendar">({{item.range}})</span>
            </div>
          </li>
        </ul>
        <div class="down-right" v-show="showCalendar">
          <div v-show="activeId === 's1'" style="position: relative;height: 100%;">
            <j-date-picker
              dropdown-class-name="date-wrap"
              type="date"
              @on-change="onChangeDate"
              placeholder="选择某天"
              open>
              <span style="display: none;">&nbsp;</span>
            </j-date-picker>
          </div>
          <div v-show="activeId === 's2'" style="position: relative;height: 100%;">
            <j-date-picker
              dropdown-class-name="date-wrap"
              type="date"
              @on-change="onChangeWeek"
              select-week
              placeholder="选择一周"
              open>
              <span style="display: none;">&nbsp;</span>
            </j-date-picker>
          </div>
          <div v-show="activeId === 's3'" style="position: relative;height: 100%;">
            <j-date-picker
              dropdown-class-name="date-wrap"
              type="month"
              @on-change="onChangeMonth"
              placeholder="选择月份"
              open>
              <span style="display: none;">&nbsp;</span>
            </j-date-picker>
          </div>
        </div>
      </j-dropdown-menu>
    </j-dropdown>
  </div>
</template>
<style lang="less">
  .date-wrap {
    top: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    margin: 0 !important;
    box-shadow: none !important;
    .ivu-picker-panel-body {
      width: 100%;
    }
    .ivu-date-picker-header {
      height: 36px;
      line-height: 36px;
    }
    .ivu-picker-panel-icon-btn {
      margin-top: 6px;
    }
  }
</style>
<style lang="less" scoped>
  .date-fix-input {
    position: relative;
    width: 250px;
    height: 32px;
    line-height: 30px;
    padding-left: 10px;
    padding-right: 30px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    cursor: pointer;
    .j-icon {
      position: absolute;
      top: 8px;
      right: 10px;
    }
    .placeholder {
      color: #bbbec4;
    }
  }

  .down {
    display: flex;
    margin: -5px 0;
    width: 300px;
    font-size: 12px;
    &-left {
      flex: 1;
      &-item {
        position: relative;
        height: 36px;
        line-height: 36px;
        background: #f5f5f5;
        padding-left: 10px;
        padding-right: 10px;
        cursor: pointer;
        &:hover,
        &.active {
          background: #fff;
          &::before {
            position: absolute;
            content: '';
            display: block;
            height: 100%;
            width: 2px;
            left: 0;
            top: 0;
            background: #2D8CF0;
          }
        }
        &:not(:last-child) {
          border-bottom: 1px solid #e2e2e2;
        }
        &-range {
          position: absolute;
          left: 110px;
        }
        &-more {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    &-right {
      flex: 0 0 220px;
      width: 220px;
    }
  }
</style>
<script>
  import util from '@util/myUtil'
  import {format, lastDayOfMonth, lastDayOfWeek, subDays} from 'date-fns'
  export default{
    name: 'j-date-fix-picker',
    props: {
      placement: {
        type: String,
        default: 'bottom-end'
      },
      placeholder: {
        type: String,
        default: '选择日期范围'
      }
    },
    data () {
      const now = new Date()
      const yesterday = format(subDays(now, 1), 'YYYY-MM-DD') + '~' + format(subDays(now, 1), 'YYYY-MM-DD')
      const day7 = format(subDays(now, 6), 'YYYY-MM-DD') + '~' + format(now, 'YYYY-MM-DD')
      const day30 = format(subDays(now, 29), 'YYYY-MM-DD') + '~' + format(now, 'YYYY-MM-DD')
      const day60 = format(subDays(now, 59), 'YYYY-MM-DD') + '~' + format(now, 'YYYY-MM-DD')
      return {
        visible: false,
        showCalendar: false,
        activeId: '-1',
        items: [
          {id: '-1', name: '昨日', range: yesterday},
          {id: '7', name: '最近7日', range: day7},
          {id: '30', name: '最近30日', range: day30},
          {id: '60', name: '最近60日', range: day60},
          {id: 's1', name: '自然日'},
          {id: 's2', name: '自然周'},
          {id: 's3', name: '自然月'}
        ],
        currentValue: '',
        isHoverInput: false
      }
    },
    methods: {
      onOpen () {
        if (this.disabled) {
          return
        }
        this.visible = !this.visible
        util.documentTapHide(() => {
          this.visible = false
        })
      },
      onHover (id) {
        this.activeId = id
        this.showCalendar = id.startsWith('s')
      },
      onTapItem (item) {
        if (item.id.startsWith('s')) return
        this.currentValue = `${item.name} (${item.range})`
      },
      onClear () {
        this.currentValue = ''
      },
      onChangeMonth (val) {
        this.currentValue = `自然月(${val}-01~${format(lastDayOfMonth(val), 'YYYY-MM-DD')})`
      },
      onChangeDate (val) {
        this.currentValue = `自然日(${val}~${val})`
      },
      onChangeWeek (val) {
        const lastDay = format(lastDayOfWeek(val), 'YYYY-MM-DD')
        const firstDay = format(subDays(lastDay, 6), 'YYYY-MM-DD')
        this.currentValue = `自然周(${firstDay}~${lastDay})`
      }
    }
  }
</script>
