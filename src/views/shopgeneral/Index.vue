<template>
  <layout-main>
    <Breadcrumb slot="navigator">
      <Breadcrumb-item>店铺概况</Breadcrumb-item>
    </Breadcrumb>
    <Alert type="warning" slot="alert" style="text-align: center;" show-icon>
      <span>你还未完成企业认证，完成企业认证才能获得趣淘笔平台流量</span>
      <Button type="warning" size="small">立即认证</Button>
    </Alert>
    <div class="factory">
      <div>
        <p class="factory-title">一碗婉约的笔厂</p>
        <p>
          <Button type="ghost" size="small">企业认证</Button>
          <Button type="ghost" size="small">资质认证</Button>
        </p>
      </div>
      <div>粉丝数3000</div>
    </div>
    <Card class="card">
      <p slot="title">近30天概况</p>
      <Row>
        <Col span="8" class="general">
        <p class="txt1">3277</p>
        <p>新增访问</p>
        </Col>
        <Col span="8" class="general">
        <p class="txt1">3277</p>
        <p>新增咨询</p>
        </Col>
        <Col span="8" class="general">
        <p class="txt1">3277</p>
        <p>新增粉丝</p>
        </Col>
      </Row>
    </Card>
    <Card class="card">
      <p slot="title">最近编辑</p>
      <p slot="extra">商品管理
        <Icon class="right-icon" type="ios-arrow-right"></Icon>
      </p>
      afasf
    </Card>
    <Card class="card">
      <p slot="title">店铺公告</p>
      <p slot="extra">查看更多
        <Icon class="right-icon" type="ios-arrow-right"></Icon>
      </p>
      afasf
    </Card>
  </layout-main>
</template>
<style lang="less" scoped>
  .card {
    margin-bottom: 10px;
  }

  .right-icon {
    margin-left: 5px;
  }

  .factory {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    &-title {
      font-size: 20px;
      color: #333;
      margin-bottom: 10px;
    }
  }
  .general{
    text-align: center;
    padding:30px 0;
    .txt1{
      font-size:30px;
      color: #333;
      margin-bottom: 10px;
    }
  }
</style>
<script>
  export default{
    data(){
      return {}
    },
    mounted(){
    },
    methods: {}
  }
</script>
