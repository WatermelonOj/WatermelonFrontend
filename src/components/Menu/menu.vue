<template>
  <div>
    <div>
      <el-row :style="{ background:'white', position:'fixed', width:'100%', zIndex:99, boxShadow: '0px 1px 5px #DCDCDC' }">
        <div class="link-background"></div>
        <el-col :span="3">
          <el-avatar style="float: left;margin-top: 12px;margin-left: 20px" :size="30" src="../../../static/watermelon.png"></el-avatar>
          <span class="log">Watermelon</span>
        </el-col>
        <el-col :span="2" id="aaa">
          <div @click="now=1" @mouseenter="moveMenu(0)" @mouseleave="backMenu">
            <router-link :to="{name:'home'}" style="text-decoration-line: none;"><MenuButton :msg="'Home'" :num="1" :now="now" :width="this.fullWidth/12"></MenuButton></router-link>
          </div>
        </el-col>
        <el-col :span="2">
          <div @click="now=2" @mouseenter="moveMenu(1)" @mouseleave="backMenu">
            <router-link :to="{name:'problemset'}" style="text-decoration-line: none;"><MenuButton :msg="'ProblemSet'" :num="2" :now="now" :width="this.fullWidth/12"></MenuButton></router-link>
          </div>
        </el-col>
        <el-col :span="2">
          <div @click="now=3" @mouseenter="moveMenu(2)" @mouseleave="backMenu">
            <router-link :to="{name:'contest'}" style="text-decoration-line: none;"><MenuButton :msg="'Contest'" :num="3" :now="now" :width="this.fullWidth/12"></MenuButton></router-link>
          </div>
        </el-col>
        <el-col :span="2">
          <div @click="now=4" @mouseenter="moveMenu(3)" @mouseleave="backMenu">
            <router-link :to="{name:'status'}" style="text-decoration-line: none;"><MenuButton :msg="'Status'" :num="4" :now="now" :width="this.fullWidth/12"></MenuButton></router-link>
          </div>
        </el-col>
        <el-col :span="2">
          <div @click="now=5" @mouseenter="moveMenu(4)" @mouseleave="backMenu">
            <router-link :to="{name:'discussion'}" style="text-decoration-line: none;"><MenuButton :msg="'Discussion'" :num="5" :now="now" :width="this.fullWidth/12"></MenuButton></router-link>
          </div>
        </el-col>
        <el-col :span="1" :offset="6">
          <div :style="{ padding:'18px 0' }"><icon name="pencil-alt" scale="1.4" class="icon" @click.native="toDisHome"></icon></div>
        </el-col>
        <el-col :span="1">
          <div :style="{ padding:'18px 0' }"><icon name="question-circle" scale="1.4" class="icon" @click.native="toAbout"></icon></div>
        </el-col>
        <el-col :span="1">
          <div :style="{ padding: '10px 0' }"><el-avatar :src="this.src"></el-avatar></div>
        </el-col>
        <el-col :span="2">
          <div :style="{ padding: '22px 0' }">
            <el-dropdown>
            <span class="el-dropdown-link">
              {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toUserHome"><i class="el-icon-user"></i>Profile</el-dropdown-item>
                <el-dropdown-item @click.native="toWatermelon"><i class="el-icon-switch-button"></i>Log Out</el-dropdown-item>
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
  import MenuButton from "./menuButton";
  let background = document.querySelector('.link-background');
  export default {
    components: {MenuButton},
    data(){
      return{
        now:1,
        username:'',
        userId:0,
        linkBackground:{width:this.fullWidth/12, left:this.fullWidth/4},
        fullWidth:document.documentElement.clientWidth,
        src:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }
    },
    created() {
      if (sessionStorage.getItem("username") ) { this.username = sessionStorage.getItem('username'); }
      if (sessionStorage.getItem("userId") ) { this.userId = sessionStorage.getItem('userId'); }
      if (sessionStorage.getItem("now") ) {
        this.now = sessionStorage.getItem('now');
      }
      window.addEventListener('beforeunload',()=>{
        sessionStorage.setItem('now',this.now)
      });
      window.addEventListener('resize', this.handleResize)
      this.getAvatar()
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted() {
      this.handleResize();
    },
    methods:{
      handleResize (event) {
        this.fullWidth = document.documentElement.clientWidth
        document.getElementsByClassName('link-background')[0].style.left = `${this.fullWidth/8}px`
        document.getElementsByClassName('link-background')[0].style.width = `${this.fullWidth/12}px`
        this.backMenu()
      },
      moveMenu(index){
        document.getElementsByClassName('link-background')[0].style.transform = `translateX(${this.fullWidth/12 * index}px)`
      },
      backMenu(){
        document.getElementsByClassName('link-background')[0].style.transform = `translateX(${this.fullWidth/12 * (this.now-1)}px)`
      },
      toUserHome(){ this.$router.push({
        name:'UserHome',
        params:{
          username:this.username,
          userId:this.userId
        }
      }) },
      async getAvatar(){
        var res = await this.axios.get('/pro/image',{
          params:{ userId: this.userId }
        });
        if(res.data!=null&&res.data!=''){
          this.src = 'http://39.106.167.190:8081/images/' + res.data;
        }
      },
      toWatermelon(){ this.$router.push({ name:'Watermelon' }) },
      toDisHome(){ this.$router.push({ name:'disHome' }) },
      toAbout(){ this.$router.push({ name:'about' }) }
    }
  }
</script>

<style>
  .log{
    font-family: WebFontName;
    font-size: 30px ;
    color: #4F4F4F;
    line-height: 60px;
    margin-left: 10px;
    float: left;
  }
  @font-face {
    font-family: 'WebFontName';
    src:url(../../Font.otf) format('opentype');
  }
  .link-background {
    position: absolute;
    background: #9caad8;
    border-radius: 18px;
    top: 9px;
    height: 45px;
    z-index: 0;
    transition: 0.4s cubic-bezier(0.7, 0, 0.38, 0.86) all;
  }
  .icon{
    color: #98a0a3;
    transition: 0.4s all;
    cursor: pointer;
  }
  .icon:hover{
    color: #4f4f4f;
  }
  .el-dropdown-link{
    cursor: pointer;
    font-size: 16px;
  }
</style>
