<template>
  <div>
    <div style="padding: 20px;position: absolute;margin-top: 6%;margin-left: 5%;">
      <span style="font-size: 40px;font-weight: bold;color: #72767b;float: left;margin-left: 15px">{{ contest.title }}</span>
    </div>
    <el-card class="problemBackground">
      <router-link
        :to="{
              name:'contestRank',
              params: {
                name:'contestRank',
                problemSet:this.problemSet,
                contestId:this.contest.contestId,
                title:this.contest.title
              }
          }"><el-button type="warning" class="stand">
        <icon name="chart-bar" style="float: left;margin-right: 6px"></icon>Standing</el-button></router-link>
      <table style="text-align: center">
        <tr class="firstTr">
          <td width="5%"></td>
          <td width="8%">#</td>
          <td width="60%" style="text-align: left">Problem Name</td>
          <td >AC Rate</td>
        </tr>
        <tr class="all" v-for="(item,index) in problemSet" :key="index">
          <td>
            <icon v-show="judge(item.status) == 1" name="check" style="margin-left: 10px;color: #67C23A"></icon>
            <icon v-show="judge(item.status) == 2" name="times" style="margin-left: 10px;color: #f83f37"></icon>
            <icon v-show="judge(item.status) == 3" name="minus" style="margin-left: 10px;color: #98a0a3"></icon>
          </td>
          <td><span>{{ String.fromCharCode(65+index) }}</span></td>
          <td style="text-align: left"><el-link type="primary" @click.native="toProblem(item)">{{ item.title }}</el-link></td>
          <td>{{item.acNum}} / {{item.subNum}}</td>
        </tr>
      </table>
    </el-card>
    <el-card class="problemFormation">
      <el-row :style="{ fontSize: '25px', padding:'10px' }">
        <el-col :span="12">Information</el-col>
      </el-row>
      <el-row :style="{ padding:'10px' }">
        <el-col :span="24">主办方：{{ contest.hostname }}</el-col>
      </el-row>
      <el-row :style="{ padding:'10px' }">
        <el-col :span="24">比赛时间：{{ contest.startTime }} - {{ contest.endTime }}</el-col>
      </el-row>
      <el-row :style="{ padding:'10px' }">
        <el-col :span="24">比赛描述：</el-col>
      </el-row>
      <el-row :style="{ padding:'0px 10px' }">
        <el-col :span="24" v-if="contest.description != null && contest.description != ''">&#12288&#12288{{ contest.description }}</el-col>
        <el-col :span="24" v-if="contest.description == null || contest.description == ''">&#12288&#12288比赛的作者没有留下任何描述</el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
    export default {
      name: "contestProblem",
      data(){
        return{
          contest:{},
          problemSet:[]
        }
      },
      async created() {
        if (sessionStorage.getItem("userId") ) {
          var userId = sessionStorage.getItem('userId');
        }

        let routerParams = this.$route.params.dataObj;
        if(routerParams){ this.contest = routerParams; }
        else if (sessionStorage.getItem('contest') ) {
          var userJsonStr = sessionStorage.getItem('contest');
          this.contest = JSON.parse(userJsonStr);
        }
        console.log(this.contest)
        if(this.contest) { sessionStorage.setItem('contest',JSON.stringify(this.contest)) }

        var res = await this.axios.get('/pro/contest/problem',{
          params:{
            contestId: this.contest.contestId,
            userId: userId
          }
        });
        this.problemSet = res.data
      },
      methods:{
        toProblem(obj){
          obj.contestId = this.contest.contestId;
          console.log(obj.contestId)
          this.$router.push({
            name:'problem',
            params: {
              name:'problem',
              dataObj: obj
            } });
        },
        judge(obj){
          if(obj == 'Accepted'){ return 1 }
          else if(obj == 'Expectant'){ return 2 }
          else { return 3 }
        }
      }
    }
</script>

<style scoped>
  .problemBackground{
    width: 55%;
    background: white;
    position: absolute;
    margin-left: 5%;
    margin-top: 12%;
  }
  .problemFormation{
    width: 30%;
    background: white;
    position: absolute;
    margin-left: 65%;
    margin-top: 12%;
  }
  .stand{
    background-color: #FF6347;
    font-size: 16px;
    float: right;
    margin: 20px;
  }
  table{
    width: 94%;
    margin-left: 3%;
    margin-top: 1%;
    margin-bottom: 50px;
    border-collapse:collapse;
    border: 0px solid #999;
  }
  table td{
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
  .all:hover{
    background: rgb(250,250,252);
  }
</style>
