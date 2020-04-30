<template>
  <div class="back">
    <div style="float: left;margin-top: 10px;margin-left: 10px;">
      <el-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
    <div style="float: left;margin-left: 20px">
      <h3>admin</h3>
      <span style="font-size: 13px;color: #a6a9ad">
        2020-4-20
        <i style="margin-left: 15px" class="el-icon-view"></i>
        13244
      </span>
    </div>

    <div style="font-size: 25px;float: right;color: #B4BCCC;margin-top: 60px">
      <div style="float: left;margin-top: 5px;margin-right: 5px"><i class="el-icon-s-comment"></i></div>
      <div style="float: left;margin-right: 30px"><span style="font-size: 15px">评论</span></div>
      <div style="float: left;margin-top: 5px;margin-right: 5px"><i class="el-icon-s-flag"></i></div>
      <div style="float: left;margin-right: 30px"><span style="font-size: 15px">举报</span></div>
    </div>

    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: "discussionCard",
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
  .back{
    width: 70%;
    background: white;
    position: absolute;
    margin-left: 15%;
    margin-top: 70px;
    height: 600px;
  }
  .line{
    width: 96%;
    margin-left: 2%;
    margin-top: 100px;
    background-color: rgb(240,240,242);
    height: 1px;
  }
</style>
