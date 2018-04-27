<template>
  <layout-main>
    <j-breadcrumb slot="navigator">
      <j-breadcrumb-item>用户</j-breadcrumb-item>
    </j-breadcrumb>
    <!--<Select v-model="selected" @on-change="onChange">-->
      <!--<Option v-for="item in opts" :value="item.value" :key="item.value">{{item.label}}</Option>-->
    <!--</Select>-->
    <button type="button" @click="onTest">测试</button>
    <j-select v-model="selected" @on-change="onChange">
      <j-option v-for="item in opts" :value="item.value" :key="item.value">{{item.label}}</j-option>
    </j-select>
    <!--<j-image-gallery></j-image-gallery>-->
    <!--<div>
        <div class="row-wrap">
          <Row :gutter="24" class-name="row1">
            <Col span="8">
            <Input placeholder="请输入" v-model="value1"></Input>
            </Col>
            <Col span="8">
            <Input placeholder="请输入" v-model="value1"></Input>
            </Col>
            <Col span="8">
            <Input placeholder="请输入" v-model="value1"></Input>
            </Col>
          </Row>
        </div>
        <div class="row-wrap">
          <Row :gutter="24" class-name="row1">
            <Col :xs="12" :sm="8" :md="6" :lg="4" style="margin-bottom: 10px;">
            <Input placeholder="请输入" v-model="value2"></Input>
            </Col>
            <Col :xs="12" :sm="8" :md="6" :lg="4" style="margin-bottom: 10px;">
            <Input placeholder="请输入" v-model="value2"></Input>
            </Col>
            <Col :xs="12" :sm="8" :md="6" :lg="4" style="margin-bottom: 10px;">
            <Input placeholder="请输入" v-model="value2"></Input>
            </Col>
            <Col :xs="12" :sm="8" :md="6" :lg="4" style="margin-bottom: 10px;">
            <Input placeholder="请输入" v-model="value2"></Input>
            </Col>
            <Col :xs="12" :sm="8" :md="6" :lg="4" style="margin-bottom: 10px;">
            <Input placeholder="请输入" v-model="value2"></Input>
            </Col>
            <Col :xs="12" :sm="8" :md="6" :lg="4" style="margin-bottom: 10px;">
            <Input placeholder="请输入" v-model="value2"></Input>
            </Col>
          </Row>
        </div>
        <div class="row-wrap">
          <Input type="textarea" placeholder="请输入描述" />
        </div>
        <div class="row-wrap">
          <Input type="textarea" placeholder="请输入描述" />
        </div>
        <div class="row-wrap">
          <Input type="textarea" placeholder="请输入描述" />
        </div>
        <div class="row-wrap">
          <CheckboxGroup>
            <Checkbox label="Eat"></Checkbox>
            <Checkbox label="Sleep"></Checkbox>
            <Checkbox label="Run"></Checkbox>
            <Checkbox label="Movie"></Checkbox>
          </CheckboxGroup>
        </div>
    </div>-->
    <div style="background: #eee;height: 10px;"></div>
    <j-row :gutter="24" has-space-side>
      <j-col span="8">col-8</j-col>
      <j-col span="8">col-8</j-col>
      <j-col span="8">col-8</j-col>
    </j-row>
  </layout-main>
</template>
<style lang="less">
  .row-wrap {
    padding: 0 12px;
    margin-bottom: 10px;
  }
</style>
<script>
  export default{
    data () {
      return {
        selected: '2',
        opts: [
          {value: '0', label: '选项1'},
          {value: '1', label: '选项2'},
          {value: '2', label: '选项3'}
        ],
        isSChange: false,
        value1: '',
        value2: ''
      }
    },
    methods: {
      onChange (val) {
        console.log('val:', val)
      },
      onTest () {
        this.selected = '2'
      }
    }
  }
</script>
