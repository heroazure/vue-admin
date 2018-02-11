<template>
  <layout-main>
    <Breadcrumb slot="navigator">
      <Breadcrumb-item>商品管理</Breadcrumb-item>
    </Breadcrumb>
    <RadioGroup v-model="tab"
                class="tabs"
                type="button"
                @on-change="onChangeTab"
                size="large">
      <Radio label="1">已上架</Radio>
      <Radio label="0">仓库中</Radio>
    </RadioGroup>
    <list-search @on-search="onSearch">
      <Row type="flex" justify="space-between">
        <Col span="8">
        <Button type="primary" icon="ios-plus-empty" @click.native="onPublish">发布商品</Button>
        </Col>
        <Col span="8">
        <Row :gutter="16">
          <Col span="18">
          <Input type="text" v-model="search.title" placeholder="搜索商品名">
          </Input>
          </Col>
          <Col span="6">
          <Button type="primary" @click.native="onSearch">搜索</Button>
          </Col>
        </Row>
        </Col>
      </Row>
    </list-search>
    <Table :columns="columns" :data="dataSource"></Table>
    <div class="table-paging between">
      <div class="table-paging-operator">
        <Button type="primary">下架</Button>
      </div>
      <Page :total="totalNumber"
            :current="page"
            :page-size="pageSize"
            show-total
            @on-change="onPageChange"></Page>
    </div>
  </layout-main>
</template>
<style lang="less">

</style>
<script>
  import api from 'service/goods'
  import pagingMixin from 'mixin/paging'
  import getColumns from './columns'
  export default{
    data(){
      let columns = getColumns(this)
      return {
        tab: '1',
        search: {
          title: ''
        },
        columns: columns
      }
    },
    mixins: [pagingMixin],
    methods: {
      onChangeTab(val){
        this.tab = val
        this.page = 1
        this.getList()
      },
      onPublish(){
        this.$router.push({path: '/goods/publish'})
      },
      onDelListItem(id){
        api.delGoods({id: id})
          .then(data => {
            this.getList()
            this.$Message.success('删除成功！')
          })
      },
      getList(){
        api.getGoodsList({
          page: this.page,
          per_page: this.pageSize,
          published: this.tab,
          title: this.search.title.trim()
        }).then(({data}) => {
          this.dataSource = (data.list || [])
          this.totalNumber = Number(data.total_count)
        })
      }
    }
  }
</script>
