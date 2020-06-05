<template>
  <div style="margin-top: 10%;position: absolute;width: 100%">
  <el-card class="statusBack">
    <div style="margin-left: 50px;margin-top: 20px;font-size: 30px;"><span>Status</span></div>
    <table style="text-align: center" class="tableBg" v-loading="loading">
      <tr class="firstTr">
        <td width="15%">Submit Time</td>
        <td width="15%">Author</td>
        <td width="15%">Problem</td>
        <td width="15%">Result</td>
        <td width="15%">Time</td>
        <td width="15%">Memory</td>
        <td width="10%">Language</td>
      </tr>
      <tr v-for="item in data" :key="item.subId">
        <td>{{ item.subTime }}</td>
        <td><el-link :underline="false" @click.native="toUserHome(item.username,item.userId)">{{ item.username }}</el-link></td>
        <td>{{ item.problemId }}</td>
        <td><el-tag effect="dark" style="border: 0;height: 30px" :color="resultColor(item.result)" >{{ item.result }}</el-tag></td>
        <td>{{ item.runTime }} MS</td>
        <td>{{ item.runMemory }} KB</td>
        <td><router-link :to="{
              name:'code',
              params: {
                name:'code',
                dataObj: item
              }
            }" style="text-decoration-line: none;">
          <el-link :underline="false">{{ item.language }}</el-link></router-link></td>
      </tr>
    </table>
    <div style="width: 100%;text-align: center;margin-bottom: 50px;margin-top: 50px">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :pager-count="5"
        :page-count="totalPage"
        @current-change="updatePage">
      </el-pagination>
    </div>
  </el-card>
    <logo></logo>
  </div>
</template>

<script>
  import logo from "../Other/logo";
    export default {
      name: "status",
      data(){
          return{
            loading: true,
            data:'',
            currentPage:1,
            totalPage:0
          }
      },
      components:{ logo },
      async created() {
        this.data = (await this.axios.get('/api/submission/all', {
          params: {
            page: 1
          }
        })).data;
        this.totalPage = (await this.axios.get('/api/submission/count')).data;
        this.loading = false;
      },
      mounted() {
        if (sessionStorage.getItem("userId") ) { var userId = sessionStorage.getItem('userId'); }
        this.websocket = new WebSocket("ws://39.106.167.190:8080/judgeHandler/ID="+userId)
        this.initWebSocket()
      },
      beforeDestroy () {
        this.onbeforeunload()
      },
      methods: {
        async update(){
          var res = await this.axios.get('/api/submission/all',{
            params:{
              page:this.currentPage
            }
          });
          this.data = res.data;
        },
        async updatePage(val){
          this.currentPage = val;
          var res = await this.axios.get('/api/submission/all',{
            params:{
              page:this.currentPage
            }
          });
          this.data = res.data;
        },
        toUserHome(username,userId){
          this.$router.push({
            name:'UserHome',
            params:{
              username:username,
              userId:userId
            }
          })
        },
        resultColor(res){
          var col='';
          if (res == 'Accept') { col = '#32CD32' }
          else if (res == 'Compile_Error'){ col = '#FFC125' }
          else if (res == 'Judging' || res == 'Queuing' || res == 'Compiling'){ col = '#00BFFF' }
          else { col = '#FF4500' }
          return col;
        },
        initWebSocket () {
          this.websocket.onerror = this.setErrorMessage
          this.websocket.onmessage = this.setOnmessageMessage
          window.onbeforeunload = this.onbeforeunload
        },
        setOnmessageMessage (event) {
          if(event.data == 'submission'){
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

<style scoped>
  .statusBack{
    width: 94%;
    background: white;
    margin-left: 3%;
  }
  table{
    width: 94%;
    margin-left: 3%;
    margin-top: 1%;
    border-collapse:collapse;
    border: 0px solid #999;
  }
  table td {
    border-top: 1px solid rgb(238 238 238);
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
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
  .tableBg tr:nth-child(even){
    background:rgb(248,248,250);
  }
</style>
