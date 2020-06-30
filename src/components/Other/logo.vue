<template>
  <div style="width: 80%;margin-left: 10%;height: 135px;margin-top: 50px;">
    <el-divider></el-divider>
    <el-row>
      <el-col :span="15" :offset="9">
        <el-avatar style="float: left;margin-top: 4px;" :size="60" src="../../../static/watermelon.png"></el-avatar>
        <div style="float: left;margin-left: 15px">
          <span class="logBottom">Watermelon</span><br>
          <span class="logFont">帮助你提升能力，体验编程的魅力</span><br>
          <span class="logFont" style="font-size: 12px">2020.02 - 2020.06 by 中国石油大学(华东) 孙增奎 徐维彦 张愉飞</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "logo",
    }
</script>

<style scoped>
 .logBottom{
   font-family: WebFontName;
   font-size: 22px ;
   color: #4F4F4F;
 }
  .logFont{
    font-size: 15px ;
    color: #4F4F4F;
    font-weight: bolder;
  }
</style>
