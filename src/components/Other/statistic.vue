<template>
  <div id="statistic" style="height:400px;"></div>
</template>

<script>
    export default {
      name: "statistic",
      props:['problem'],
      data(){
        return{
          result:[],
          color:[]
        }
      },
      methods: {
        myEcharts() {
          var myChart = this.$echarts.init(document.getElementById('statistic'));
          var option = {
            title: {
              text: 'Statistic',
              left: 10
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {d}%'
            },
            legend: {
              data: []
            },
            color:this.color,
            series: [
              { name: 'Statistic',
                type: 'pie',
                radius: '50%',
                center: ['50%', '50%'],
                data: this.result,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          myChart.setOption(option);
        }
      },
      created() {
          if(this.problem.ceNum){
            this.result.push({ value:this.problem.ceNum, name:'编译错误' });
            this.color.push('#798cca');
          }
          if(this.problem.reNum){
            this.result.push({ value:this.problem.reNum, name:'运行错误' });
            this.color.push('#d0d962');
          }
          if(this.problem.waNum){
            this.result.push({ value:this.problem.waNum, name:'答案错误' });
            this.color.push('#f95851');
          }
          if(this.problem.acNum){
            this.result.push({ value:this.problem.acNum, name:'正确通过' });
            this.color.push('#21a894');
          }
          if(this.problem.tleNum){
            this.result.push({ value:this.problem.tleNum, name:'时间超限' });
            this.color.push('#c1993f');
          }
          if(this.problem.peNum){
            this.result.push({ value:this.problem.peNum, name:'格式错误' });
            this.color.push('#c66cc5');
          }
          if(this.problem.mleNum){
            this.result.push({ value:this.problem.mleNum, name:'内存超限' });
            this.color.push('#5e7d8a');
          }
          if(this.result.length == 0){
            this.result.push({ value:0, name:'无提交' });
            this.color.push('#e0e3e4');
          }
      },
      mounted() {
        this.myEcharts();
      }
    }
</script>

<style scoped>

</style>
