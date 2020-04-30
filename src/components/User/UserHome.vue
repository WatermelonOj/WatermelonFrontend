<template>
  <div>
    <el-row style="padding: 80px 0;background-color: #46545a">
      <el-col :span="2" :offset="3">
        <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </el-col>
      <el-col :span="6" style="padding: 15px 0">
        <div style="padding: 5px 0"><span style="font-size: 25px;color: white;">UserName</span></div>
        <div style="padding: 5px 0"><span style="font-size: 16px;color: white;">粉丝/关注</span></div>
      </el-col>
      <el-col :span="6" style="padding: 30px 0" :offset="6">
        <span style="font-size: 20px;color: white;">XXXXXX</span>
      </el-col>
    </el-row>
    <el-row style="background-color: white;box-shadow: 0px 1px 5px #DCDCDC;">
      <el-col :span="6" :offset="2">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">主页</el-menu-item>
          <el-menu-item index="2">近期数据</el-menu-item>
          <el-menu-item index="3">能力分析</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center"  style="padding:50px 100px">
      <el-col :span="14" style="padding:0px 20px">
        <el-card>
          <el-row>
            <el-col :span="2">
              <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </el-col>
            <el-col :span="3" style="padding: 5px 0">
              <div style="padding: 0px 0"><span style="font-size: 15px;">UserName</span></div>
              <div style="padding: 0px 0"><span style="font-size: 13px;color: #6f7a7f;">time</span></div>
            </el-col>
          </el-row>
          <el-row style="padding: 12px 0"><div class="line"></div></el-row>
          <el-row>
            内容
          </el-row>
          <el-row style="padding: 12px 0"><div class="line"></div></el-row>
          <el-row>
            <el-col :span="1"><icon name="thumbs-up" class="icon"></icon></el-col>
            <span></span>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8" style="padding:0px 20px">
        <el-card>
          <div style="text-align: center">
            <span style="font-size: 25px">
              提交<el-divider direction="vertical"></el-divider>
              通过<el-divider direction="vertical"></el-divider>
              排名<el-divider direction="vertical"></el-divider>
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "UserHome",
    data(){
      return{
        activeIndex: '1',
      }
    }
  }
</script>

<style scoped>
  .line{
    width: 100%;
    height: 1px;
    background-color: rgb(240,240,242);
  }
  el-card{
    border-radius: 5px;
  }
</style>
