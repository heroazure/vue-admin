<template>
  <div class="j-chart" ref="chart"></div>
</template>
<style lang="less">
  .j-chart {
    height: 300px;
  }
</style>
<script>
  import echarts from 'echarts'
  export default{
    name: 'v-chart',
    data(){
      return {
        chartData: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            //show: false,
            data: ['类目1', '类目2'],
            top: 0,
          },
          grid: {
            left: '30px',
            right: '40px',
            bottom: '30px',
            top: 40,
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              //interval:'auto'
              //rotate:45
            },
            axisTick: {
              //show:false,
              //alignWithLabel:false
            },
            data: ['2017-2-1', '2017-2-2', '2017-2-3', '2017-2-4', '2017-2-5', '2017-2-6', '2017-2-7']
          },
          yAxis: {
            type: 'value'
          },
          color: ['#5a6580', '#1f95e7', '#57c7d3', '#74d3f3', '#aa7bff', '#f96768', '#f2a553', '#5ccc73'],
          series: [
            {
              name: '类目1',
              type: 'line',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '类目2',
              type: 'line',
              data: [320, 332, 601, 34, 190, 130, 410]
            },
          ]
        }
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs.chart)
        window.addEventListener("resize", this.chart.resize)
        this.drawChart()
      })
    },
    methods: {
      drawChart(){
        this.chart.setOption(this.chartData, true)
      }
    }
  }
</script>
