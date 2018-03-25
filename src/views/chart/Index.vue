<template>
  <layout-main>
    <Breadcrumb slot="navigator">
      <Breadcrumb-item>图表组件</Breadcrumb-item>
    </Breadcrumb>
    <v-chart></v-chart>
    <v-chart></v-chart>
    <v-chart style="width: 300px;height: 200px;"></v-chart>
  </layout-main>
</template>
<style lang="less">

</style>
<script>
  import VChart from 'components/v-chart'
  export default{
    components: {
      [VChart.name]: VChart,
    },
    data(){
      return {}
    }
  }
</script>
