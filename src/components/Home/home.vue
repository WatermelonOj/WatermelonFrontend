<template>
  <div style="margin-top: 6%;position: absolute;width: 100%">
    <el-row :style="{ padding: '10px 0' }">
      <el-col :span="18" :offset="3">
        <el-card>
          <el-carousel :style="{ height: '300px', width: '61%',float:'left',marginBottom:'20px' }">
            <el-carousel-item v-for="item in 2" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          <div style="float: left;color: #6f7a7f;margin-left: 10%;margin-top: 5%;">
            <span style="font-size: 30px;padding: 10px;">Welcome Back</span><br>
            <el-row style="margin-top: 20px;margin-bottom: 20px">
              <el-col :span="6" :offset="5"><el-avatar :size="50" :src="this.src"></el-avatar></el-col>
              <el-col :span="6" :offset="1" style="font-size: 22px;margin-top: 14px"><span>{{ username }}</span></el-col>
            </el-row>
            <div style="float: left;text-align: center;line-height: 1.5;margin-left: 33px;font-size: 20px">
              <span>提交数</span><br><span>{{ this.subNum }}</span>
            </div>
            <div style="float: left;width: 1px;height: 30px;background: #d6d9da;margin-left: 20px;margin-right: 20px"></div>
            <div style="float: left;text-align: center;line-height: 1.5;font-size: 20px">
              <span>通过数</span><br><span>{{ this.acNum }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :style="{ padding: '10px 0' }">
      <el-col :span="9" :offset="3">
        <span style="font-size: 25px">近期赛事</span>
      </el-col>
    </el-row>
    <el-row :style="{ padding: '10px 0' }">
      <el-col :span="9" :offset="3" :style="{ padding: '0 10px 0 0' }">
        <el-card>
          <el-row :style="{ fontSize: '20px' }">本平台比赛</el-row>
          <div v-for="(item, index) in contestSet" :key="index">
            <template v-if="index<5">
              <div class="line"></div>
              <el-row :style="{ marginBottom: '5px' }">
                <el-link :underline="false" :style="{ fontSize: '18px' }" @click.native="enterContest(item)">{{ item.title }}</el-link>
              </el-row>
              <el-row :style="{ marginTop: '5px', fontSize: '13px' }">Time: {{ item.startTime }} - {{ item.endTime }}</el-row>
            </template>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9" :style="{ padding: '0 0 0 10px' }">
        <el-card>
          <el-row :style="{ fontSize: '20px' }">其他平台比赛</el-row>
          <div v-for="(item, index) in otherContestSet" :key="index">
            <template v-if="index<5">
              <div class="line"></div>
              <el-row :style="{ marginBottom: '5px' }">
                <el-link :underline="false" :style="{ fontSize: '18px' }" :href="item.link" target="_blank">{{ item.contestName }}</el-link>
              </el-row>
              <el-row :style="{ marginTop: '5px', fontSize: '13px' }">Time: {{ item.startTime }} - {{ item.endTime }}</el-row>
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :style="{ padding: '10px 0' }">
      <el-col :span="9" :offset="3">
        <span style="font-size: 25px">推荐题目</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card>
          <el-col :span="12" :style="{ padding: '15px' }">
            <div v-for="(item, index) in problem" :key="index">
              <template v-if="index<5">
                <el-row :style="{ marginBottom: '5px' }">
                  <el-link :underline="false" :style="{ fontSize: '15px' }" @click.native="toProblem(item)">{{ item.title }}</el-link>
                </el-row>
                <div class="line" v-if="index!=4"></div>
            </template>
            </div>
          </el-col>
          <el-col :span="12" :style="{ padding: '15px' }">
            <div v-for="(item, index) in problem" :key="index">
              <template v-if="index>=5">
                <el-row :style="{ marginBottom: '5px' }">
                  <el-link :underline="false" :style="{ fontSize: '15px' }" @click.native="toProblem(item)">{{ item.title }}</el-link>
                </el-row>
                <div class="line" v-if="index!=9"></div>
              </template>
            </div>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <logo></logo>
  </div>
</template>

<script>
  import logo from "../Other/logo";
  export default {
    data(){
      return{
        contestSet:[],
        otherContestSet:[],
        imageUrl: '',
        userId:'',
        username:'',
        acNum:'',
        subNum:'',
        src:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        problem:[]
      }
    },
    components:{ logo },
    async created() {
      if (sessionStorage.getItem('userId')){
        this.userId = sessionStorage.getItem('userId');
      }
      if (sessionStorage.getItem("username") ) { this.username = sessionStorage.getItem('username'); }
      var res = await this.axios.get('/pro/contest/all');
      this.contestSet = res.data;
      var res = await this.axios.get('/pro/spider');
      this.otherContestSet = res.data;
      this.getProblem();
      this.getAvatar();
      this.getAcNum();
      this.getSubNum();
    },
    methods:{
      async getAvatar(){
        var res = await this.axios.get('/pro/image',{
          params:{ userId: this.userId }
        });
        if(res.data!=null&&res.data!=''){
          this.src = 'http://39.106.167.190:8081/images/' + res.data;
        }
      },
      async getAcNum(){
        var res = await this.axios.get('/api/user/acNum',{ params:{ userId: this.userId } });
        this.acNum = res.data
      },
      async getSubNum(){
        var res = await this.axios.get('/api/user/subNum',{ params:{ userId: this.userId }});
        this.subNum = res.data
      },
      toProblem(obj){
        this.$router.push({
          name:'problem',
          params:{
            dataObj: obj
          }
        })
      },
      enterContest(obj){
        this.$router.push({
          name:'contestProblem',
          params: {
            name:'problem',
            dataObj: obj
          }
        });
      },
      async getProblem(){
        var res = await this.axios.get('/api/user/problem',{
          params:{
            userId: this.userId
          }
        });
        this.problem = res.data;
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .line{
    width: 100%;
    height: 1px;
    background: #eaecec;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
