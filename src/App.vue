<template>
  <div id="app">
    <div class="menu">
    <el-row :style="{ background:'white' }">
      <div class="link-background"></div>
      <el-col :span="3">
        <span class="log">Watermelon</span>
      </el-col>
      <el-col :span="2.5">
        <div @click="now=1" @mouseenter="moveMenu(0)" @mouseleave="backMenu">
          <router-link to="/home" style="text-decoration-line: none;"><MenuButton :msg="'Home'" :num="1" :now="now"></MenuButton></router-link>
        </div>
      </el-col>
      <el-col :span="2.5">
        <div @click="now=2" @mouseenter="moveMenu(1)" @mouseleave="backMenu">
          <router-link to="/problemset" style="text-decoration-line: none;"><MenuButton :msg="'ProblemSet'" :num="2" :now="now"></MenuButton></router-link>
        </div>
      </el-col>
      <el-col :span="2.5">
        <div @click="now=3" @mouseenter="moveMenu(2)" @mouseleave="backMenu">
          <router-link to="/contest" style="text-decoration-line: none;"><MenuButton :msg="'Contest'" :num="3" :now="now"></MenuButton></router-link>
        </div>
      </el-col>
      <el-col :span="2.5">
        <div @click="now=4" @mouseenter="moveMenu(3)" @mouseleave="backMenu">
          <router-link to="/status" style="text-decoration-line: none;"><MenuButton :msg="'Status'" :num="4" :now="now"></MenuButton></router-link>
        </div>
      </el-col>
      <el-col :span="2.5">
        <div @click="now=5" @mouseenter="moveMenu(4)" @mouseleave="backMenu">
          <router-link to="/discussion" style="text-decoration-line: none;"><MenuButton :msg="'Discussion'" :num="5" :now="now"></MenuButton></router-link>
        </div>
      </el-col>
      <el-col :span="1" :offset="4">
        <div :style="{ padding:'18px 0' }"><icon name="cog" scale="1.4" class="icon"></icon></div>
      </el-col>
      <el-col :span="1">
        <div :style="{ padding:'18px 0' }"><icon name="bell" scale="1.4" class="icon"></icon></div>
      </el-col>
      <el-col :span="1">
        <div :style="{ padding: '10px 0' }"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></div>
      </el-col>
      <el-col :span="2">
        <div :style="{ padding: '22px 0' }">
          <el-dropdown>
            <span class="el-dropdown-link">
              UserName<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toUserHome"><i class="el-icon-user"></i>Profile</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-switch-button"></i>Log Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <transition><router-view></router-view></transition>
    </div>
  </div>
</template>

<script>
  import MenuButton from "./components/Menu/menuButton";
  let background = document.querySelector('.link-background');
  export default {
    components: {MenuButton,},
    data(){
      return{now:1}
    },
    created() {
      if (sessionStorage.getItem("now") ) {
        var userJsonStr = sessionStorage.getItem('now');
        this.now = JSON.parse(userJsonStr);
      }
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("now",JSON.stringify(this.now))
      })
    },
    methods:{
      moveMenu(index){
        document.getElementsByClassName('link-background')[0].style.transform = `translateX(${111.5 * index}%)`
      },
      backMenu(){
        document.getElementsByClassName('link-background')[0].style.transform = `translateX(${111.5 * (this.now-1)}%)`
      },
      toUserHome(){
        this.$router.push({
          name:'UserHome'
        })
      }
    }
  }
</script>

<style>
  .menu{
    height: 55px;
    width: 100%;
    background: white;
    box-shadow: 0px 1px 5px #DCDCDC;
    position: absolute;
  }
  .log{
    font-family: WebFontName;
    font-size: 30px ;
    color: #4F4F4F;
    line-height: 60px;
    margin-left: 30px;
    margin-right: 30px;
    float: left;
  }
  @font-face {
    font-family: 'WebFontName';
    src:url(../../../webstormproject/myproject/src/Font.otf) format('opentype');
  }
  .v-enter{
    opacity: 0;
    transform: translateY(80px);
  }
  .v-enter-active{
    transition: all 0.4s ease;
  }
  .link-background {
    position: absolute;
    background: #9caad8;
    border-radius: 18px;
    top: 9px;
    left: 196px;
    width: 130px;
    height: 45px;
    z-index: 0;
    transition: 0.4s cubic-bezier(0.7, 0, 0.38, 0.86) all;
  }
  .icon{
    color: #98a0a3;
    transition: 0.4s all;
  }
  .icon:hover{
    color: #4f4f4f;
  }
  .el-dropdown-link{
    cursor: pointer;
    font-size: 16px;
  }
</style>
