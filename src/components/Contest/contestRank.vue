<template>
  <el-card class="rankBack">
    <el-row :style="{ padding:'20px 30px' }">
      <span style="font-size: 35px">{{ this.title }}</span>
    </el-row>
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
      <tr v-for="item in rank" :key="item.rankId">
        <td>{{ item.rank }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.solve }}</td>
        <td>{{ item.time }}</td>
        <td v-for="items in item.problem" :bgcolor="resultColor(items.status)" style="line-height: 25px">
          <span v-show="items.status==-1">0<br>--</span>
          <span v-show="items.status==1">{{ items.tries }}<br>{{ items.time }}</span>
          <span v-show="items.status==0">{{ items.tries }}<br>--</span>
          <span v-show="items.status==3" style="color: white">{{ items.tries }}<br>{{ items.time }}</span>
        </td>
      </tr>
    </table>
  </el-card>
</template>

<script>
  export default {
    data(){
      return {
        data: [],
        rank: [],
        problemSet: [],
        title:''
      }
    },
    async created() {
      let routerParams = this.$route.params.problemSet;
      let contestId = this.$route.params.contestId;
      if(routerParams){ this.problemSet = routerParams; }
      let title = this.$route.params.title;
      if(title){ this.title = title; }
      var res = await this.axios.get('/api/submission/rank',{
        params:{
          contestId: contestId
        }
      });
      this.data = res.data
      console.log(this.data)
      this.data.forEach((item,i) => {
        var user = { rank: item.rankId, username: item.username, solve: item.solveNum, time:0,
          problem:[{ status:-1, time:0, tries:0 }, { status:-1, time:0, tries:0 }, { status:-1, time:0, tries:0 },
            { status:-1, time:0, tries:0 }, { status:-1, time:0, tries:0 } ] }
        item.problem.forEach((items,j) => {
          this.problemSet.forEach((ite,k) => {
            if(ite.problemId == items.problemId ){
              user.problem[k].status = items.status;
              user.problem[k].time = items.time;
              user.problem[k].tries = items.tries;
              user.time += items.time + (items.tries - 1)*20;
            }
          });
        });
        this.rank.push(user)
      });
    },
    mounted() {
      if (sessionStorage.getItem("userId") ) { var userId = sessionStorage.getItem('userId'); }
      this.websocket = new WebSocket("ws://39.106.167.190:8080/judgeHandler/ID="+userId)
      this.initWebSocket()
    },
    beforeDestroy () {
      this.onbeforeunload()
    },
    methods:{
      resultColor(res){
        if(res == -1){ return '#FFFFFF' }
        else if(res == 1){ return '#AAE6AA' }
        else if(res==0){ return '#FF7256' }
        else{ return '#3CB371' }
      },
      initWebSocket () {
        this.websocket.onerror = this.setErrorMessage
        this.websocket.onmessage = this.setOnmessageMessage
        window.onbeforeunload = this.onbeforeunload
      },
      setOnmessageMessage (event) {
        if(event.data == 'rank'){
          this.update();
        }
        console.log('服务端返回：' + event.data)
      },
      setErrorMessage () {
        console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
      },
      onbeforeunload () {
        this.websocket.close();
      }
    }
  }
</script>

<style>
  .rankBack{
    width: 80%;
    background: white;
    margin-left: 10%;
    margin-top: 10%;
    position: absolute;
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
