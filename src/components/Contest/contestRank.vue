<template>
  <div class="back">
    <table style="text-align: center;font-weight: bold;">
      <tr class="firstTr">
        <td width="8%">Rank</td>
        <td width="15%">UserName</td>
        <td width="8%">Solve</td>
        <td width="9%">Time</td>
        <td width="12%">A</td>
        <td width="12%">B</td>
        <td width="12%">C</td>
        <td width="12%">D</td>
        <td width="12%">E</td>
      </tr>
      <tr v-for="item in list" :key="item.rank">
        <td>{{ item.rank }}</td>
        <td>{{ item.userName }}</td>
        <td>{{ item.solve }}</td>
        <td>{{ item.time }}</td>
        <td v-for="items in item.problem" :bgcolor="resultColor(items.result)" style="line-height: 25px">
          <span v-show="items.result==0">0<br>--</span>
          <span v-show="items.result==1">{{ items.num }}<br>{{ items.time }}</span>
          <span v-show="items.result==2">{{ items.num }}<br>--</span>
          <span v-show="items.result==3" style="color: white">{{ items.num }}<br>{{ items.time }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        list:[{ rank:1, userName:'admin', solve:4, time:1235,
          problem:[{ result:1, time:15, num:3 },
            { result:3, time:6, num:1 },
            { result:1, time:37, num:2 },
            { result:2, time:0, num:7 },
            { result:1, time:156, num:6 } ]},
          { rank:2, userName:'UPC', solve:3, time:456,
            problem:[{ result:3, time:7, num:2 },
              { result:1, time:26, num:1 },
              { result:2, time:0, num:3 },
              { result:0, time:0, num:0 },
              { result:3, time:78, num:3 } ]},
          { rank:3, userName:'UPC1', solve:3, time:564,
            problem:[{ result:1, time:30, num:3 },
              { result:1, time:45, num:1 },
              { result:2, time:0, num:3 },
              { result:3, time:178, num:5 },
              { result:0, time:0, num:0 } ]},
          { rank:4, userName:'UPC2', solve:3, time:1235,
            problem:[{ result:1, time:45, num:9 },
              { result:1, time:26, num:4 },
              { result:1, time:76, num:6 },
              { result:0, time:0, num:0 },
              { result:0, time:0, num:0 } ]},
        ]
      }
    },
    methods:{
      resultColor(res){
        if(res == 0){
          return '#FFFFFF'
        }
        else if(res == 1){
          return '#AAE6AA'
        }
        else if(res==2){
          return '#FF7256'
        }
        else{
          return '#3CB371'
        }
      }
    }
  }
</script>

<style>
  .back{
    width: 80%;
    background: white;
    position: absolute;
    margin-left: 10%;
    margin-top: 70px;
  }
  table{
    width: 94%;
    margin-left: 3%;
    margin-top: 1%;
    margin-bottom: 80px;
    border-collapse:collapse;
    border: 0px solid #999;
  }
  table td{
    border-top: 1px solid rgb(238 238 238);
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    border-left: 1px solid white;
  }
  table tr{
    height: 50px;
  }
  .firstTr{
    font-weight: bold;
    border-top: 0;
    border-bottom: 2px solid #999;
  }
  table tr.firstTr td{
    border-top: 0;border-bottom: 2px solid #999;
  }
</style>
