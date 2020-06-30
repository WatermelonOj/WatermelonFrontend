<template>
  <el-card style="width: 630px;height:500px;">
    <div id="ability" style="width: 600px;height:500px;"></div>
  </el-card>
</template>

<script>
    export default {
      name: "ability",
      props:['ability'],
      methods: {
        getLevel(){
          var level = [];
          this.ability.forEach((item) => {
            console.log(item)
            level.push(item.level)
          })
          console.log(level)
          return level
        },
        myEcharts() {
          var myChart = this.$echarts.init(document.getElementById('ability'));
          var option = {
            title: {
              text: '能力分析图'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              left: 'center',
              data: ['能力分析值']
            },
            radar: [
              {
                indicator: [
                  {text: '思维', max: 6},
                  {text: '基础', max: 6},
                  {text: '搜索', max: 6},
                  {text: '动态规划', max: 6},
                  {text: '字符串', max: 6},
                  {text: '数学', max: 6},
                  {text: '数据结构', max: 6},
                  {text: '图论', max: 6},
                  {text: '计算几何', max: 6},
                  {text: '其他', max: 6}
                ],
                radius: 150,
                center: ['50%', '50%'],
              }
            ],
            series: [
              {
                type: 'radar',
                tooltip: {
                  trigger: 'item'
                },
                areaStyle: {},
                data: [
                  {
                    value: this.getLevel(),
                    name: '能力分析值'
                  }
                ]
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

<style scoped>

</style>
