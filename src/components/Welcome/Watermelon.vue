<template>
  <div class="img">
    <div class="shadow">
      <el-row :style="{ padding:'30px' }">
        <el-col :span="1">
          <span class="log">Watermelon</span>
        </el-col>
        <el-col :span="2" :offset="21">
          <Button :col="'43,56,62'" :context="'Sign In'" @click.native="toLogin"></Button>
        </el-col>
      </el-row>
      <el-row :style="{ marginTop:'120px' }">
        <el-col :span="6" :offset="6">
          <span style="font-size: 60px;color: white;">About us</span>
          <div style="background: white;width: 650px;height: 5px;border-radius: 10px"></div>
        </el-col>
      </el-row>
      <el-row :style="{ marginTop:'20px' }">
        <el-col :span="8" :offset="8">
          <span style="font-size: 18px;color: white;line-height: 1.7">&#12288&#12288{{ this.about }}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Button from "../Other/Button";
    export default {
        name: "Watermelon",
      components:{Button},
      data(){
          return{
            about:'“Watermelon”作为一个教育学习性平台，主要面向学生、求职者、算法爱好者等人群，为其提供所需要的算法或程序语言类题目的练习、同行者之间切磋的算法比赛以及对于自己的问题或看法进行发表的讨论区，不同许多其他的同类产品，本平台还向用户提供个人能力分析、题目推荐以及其他优秀算法平台比赛日历功能。'
          }
      },
      methods:{
        toLogin(){
          this.$router.push({
            name:'login'
          })
        }
      }
    }
</script>

<style scoped>
  .img{
    height: 100vh;
    background-image:url(../../../static/background.jpg);
    background-repeat:no-repeat;
    background-size:cover;
    background-attachment:fixed;
    background-position: center center;
  }
  .shadow{
    width: 100%;
    height: 100%;
    background-color: rgba(79,79,79,0.6);
  }
  .log{
    font-family: WebFontName;
    font-size: 30px ;
    color: white;
    margin-left: 30px;
    margin-right: 30px;
    float: left;
  }
  @font-face {
    font-family: 'WebFontName';
    src:url(../../Font.otf) format('opentype');
  }
</style>
