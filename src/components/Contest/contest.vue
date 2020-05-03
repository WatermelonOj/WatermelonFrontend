<template>
  <div class="contestBackground">
    <el-row style="padding: 30px 15px">
      <div>
        <icon name="trophy" scale="2.4" style="color: #72767b;float: left"></icon>
        <span style="font-size: 30px;font-weight: bold;color: #72767b;float: left;margin-left: 15px">Contest</span>
        <div style="float: left;margin-left: 100px">
          <el-input placeholder="请输入比赛标题或者关键字……" v-model="keywords" clearable style="width: 300px"></el-input>
          <el-button type="primary" icon="el-icon-search" circle></el-button>
        </div>
      </div>
    </el-row>
    <el-row v-for="o in 4" :key="o">
      <el-col style="margin-bottom: 20px">
        <ContestCard
          :contextName="'训练赛'"
          :signUpTime="'2020-4-20'"
          :runTime="'2020-4-21'"
          :author="'2020-4-21'"
          :enterNumber="900"></ContestCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ContestCard from "./contestCard";
  export default {
    components: {ContestCard},
    data(){
      return{
        keywords:''
      }
    }
  }
</script>

<style>
  .contestBackground{
    width: 60%;
    background: rgba(255,255,255,0);
    position: absolute;
    margin-left: 20%;
    margin-top: 30px;
  }
</style>
