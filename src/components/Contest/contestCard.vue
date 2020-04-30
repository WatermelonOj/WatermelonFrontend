<template>
  <el-card :body-style="{ padding: '0px' }" shadow="hover">
    <div style="padding: 14px 14px 0 14px;">
      <span style="font-size: 24px;">{{ contextName }}</span>
    </div>
    <div style="float: left">
      <div style="padding: 20px 24px;">
        <icon name="clock" scale="1.2" class="icon"></icon>
        <span class="span">报名时间：{{ signUpTime }}</span>
      </div>
      <div style="padding: 20px 24px;">
        <icon name="stopwatch" scale="1.4" class="icon"></icon>
        <span class="span">比赛时间：{{ runTime }}</span>
      </div>
    </div>

    <div style="float: left;margin-bottom: 20px">
      <div style="padding: 20px 24px;">
        <icon name="award" scale="1.4" class="icon"></icon>
        <span class="span">主办方：{{ author }}</span>
      </div>
      <div style="padding: 20px 24px;">
        <icon name="user-friends" scale="1.4" class="icon"></icon>
        <span class="span">参与人数：{{ enterNumber }}</span>
      </div>
    </div>
    <router-link
      :to="{
              name:'contestProblem',
              params: {
                name:'contestProblem',
              }
          }"><el-button type="primary" class="button" round>报名</el-button></router-link>
  </el-card>
</template>

<script>
    export default {
      name: "contestCard",
      props:['contextName' , 'signUpTime' , 'runTime' , 'author' , 'enterNumber' ]
    }
</script>

<style scoped>
  .icon{
    float: left;
    margin-left: 5px;
    margin-right: 5px;
    color: #a6a9ad;
  }
  .span{
    float: left;
    margin-left: 5px;
    margin-right: 5px;
    color: #a6a9ad;
  }
  .button{
    margin-top: 10px;
    float: right;
    margin-right: 20px;
    width: 120px;
  }
</style>
