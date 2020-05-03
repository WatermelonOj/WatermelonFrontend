<template>
  <div>
    <div style="padding: 50px 60px">
      <div>
        <span style="font-size: 40px;font-weight: bold;color: #72767b;float: left;margin-left: 15px">ContestName</span>
      </div>
    </div>
    <div class="problemBackground">
      <router-link
        :to="{
              name:'contestRank',
              params: {
                name:'contestRank',
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
        <tr class="all" v-for="item in 4" :key="item">
          <td><icon name="check" style="margin-left: 10px;color: #67C23A"></icon></td>
          <td>{{ String.fromCharCode(64+item) }}</td>
          <td style="text-align: left"><span style="color: rgb(65 105 225);cursor:pointer;">Problem</span></td>
          <td>123/2153</td>
        </tr>
      </table>
    </div>
    <div class="problemFormation">
      <span>Author</span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "contestProblem",
      data(){
        return{

        }
      },
      methods:{

      }
    }
</script>

<style scoped>
  .problemBackground{
    width: 60%;
    background: white;
    position: absolute;
    margin-left: 5%;
    margin-top: 30px;
  }
  .problemFormation{
    width: 21%;
    background: white;
    position: absolute;
    margin-left: 70%;
    margin-top: 30px;
    padding: 30px;
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
    margin-bottom: 80px;
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
