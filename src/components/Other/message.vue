<template>
  <el-card :style="{ marginTop:'50px', width:'70%', marginLeft:'15%' }">
    <div id="message" style="height:400px;"></div>
  </el-card>
</template>

<script>
  export default {
    props:['activity'],
    methods: {
      myEcharts() {
        var myChart = this.$echarts.init(document.getElementById('message'));
        console.log(this.activity)
        var option = {
          title: {
            text: '近30天做题情况'
          },
          tooltip: {},
          legend: {
            data:['提交代码','通过题目'],
          },
          xAxis: {
            data: this.activity.dates
          },
          yAxis: {},
          color:['#fdc5c3', '#bce7c7'],
          series: [
            {
              name: '提交代码',
              type: 'bar',
              data: this.activity.subNums
            },
            {
              name: '通过题目',
              type: 'bar',
              data: this.activity.acNums,
              barGap:'-100%'
            }
          ]
        };
        myChart.setOption(option);
      }
    },
    mounted() {
      this.myEcharts();
    }
  }
</script>

<style>

</style>
