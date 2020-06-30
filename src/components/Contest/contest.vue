<template>
  <div style="margin-top: 6%;position: absolute;width: 100%">
    <div class="contestBackground">
      <el-row style="padding: 30px 15px">
        <div>
          <icon name="trophy" scale="2.4" style="color: #72767b;float: left"></icon>
          <span style="font-size: 30px;font-weight: bold;color: #72767b;float: left;margin-left: 15px">Contest</span>
          <!--<div style="float: left;margin-left: 100px">
            <el-input placeholder="请输入比赛标题或者关键字……" v-model="keywords" clearable style="width: 300px"></el-input>
            <el-button type="primary" icon="el-icon-search" circle></el-button>
          </div>-->
        </div>
      </el-row>
      <el-row v-for="item in contestSet" :key="item.contestId">
        <el-col style="margin-bottom: 20px">
          <ContestCard :contest="item"></ContestCard>
        </el-col>
      </el-row>
    </div>
    <logo></logo>
  </div>
</template>

<script>
  import ContestCard from "./contestCard";
  import logo from "../Other/logo";
  export default {
    components: { ContestCard,logo },
    data(){
      return{
        keywords:'',
        contestSet:[]
      }
    },
    async created() {
      var res = await this.axios.get('/pro/contest/all');
      this.contestSet = res.data;
    }
  }
</script>

<style>
  .contestBackground{
    width: 60%;
    background: rgba(255,255,255,0);
    margin-left: 20%;
  }
</style>
