<template>
  <div class="userHome">
    <el-row :style="{padding: '80px 0',backgroundColor: '#46545a',backgroundImage: 'url('+this.background+')',
    backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundAttachment:'fixed',backgroundPosition: 'center center' }">
      <el-col :span="2" :offset="3">
        <el-upload v-if="userId==visitUserId" action="''" :show-file-list="false" :http-request="upload">
          <el-avatar :size="100" :src="this.src"></el-avatar>
        </el-upload>
        <el-avatar v-if="userId!=visitUserId" :size="100" :src="this.src"></el-avatar>
      </el-col>
      <el-col :span="6" style="padding: 15px 0">
        <div style="padding: 5px 0"><span style="font-size: 25px;color: white;">{{ visitUsername }}</span></div>
        <div style="padding: 5px 0"><span style="font-size: 16px;color: white;">粉丝/关注</span></div>
      </el-col>
      <el-col :span="6" style="padding: 30px 0" :offset="6">
        <span style="font-size: 20px;color: white;">这个人很懒，什么都没有留下~</span>
      </el-col>
    </el-row>
    <el-row style="background-color: white;box-shadow: 0px 1px 5px #DCDCDC;">
      <el-col :span="6" :offset="2">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">主页</el-menu-item>
          <el-menu-item index="2">近期数据</el-menu-item>
          <el-menu-item index="3">能力分析</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="1" :offset="15" :style="{ marginTop: '10px' }">
        <el-upload v-if="userId==visitUserId" action="''" :show-file-list="false" :http-request="uploadBackground">
          <el-button icon="el-icon-upload2" circle></el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row v-if="num==1" :style="{ marginTop: '50px' }">
      <el-col :span="12" :offset="2">
        <div style="text-align: center;font-size: 20px"><span v-if="commentSet.length == 0">这位用户还没有发过任何帖子~</span></div>
        <el-row v-for="item in commentSet" :key="item.commentId" :style="{ marginBottom: '30px' }">
          <el-col :span="24">
            <discussion-card :comment="item"></discussion-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <el-row style="margin-bottom: 20px">
            <el-col :span="3" :offset="1"><el-avatar :size="50" :src="this.src"></el-avatar></el-col>
            <el-col :span="3" :offset="1" style="font-size: 22px;margin-top: 13px;"><span>{{ visitUsername }}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :offset="7" style="font-size: 20px;text-align: center;line-height: 1.5;">
              <span>提交数</span><br><span>{{ this.subNum }}</span>
            </el-col>
            <div style="float: left;width: 1px;height: 55px;background: #d6d9da;margin-left: 20px;margin-right: 20px"></div>
            <el-col :span="4" style="font-size: 20px;text-align: center;line-height: 1.5;">
              <span>通过数</span><br><span>{{ this.acNum }}</span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <message v-if="num==2" :activity="activity"></message>
    <el-row :style="{ padding:'50px 0' }" v-if="num==3">
      <el-col :span="6" :offset="3">
        <ability :ability="ability"></ability>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import discussionCard from "../Discussion/discussionCard";
  import message from "../Other/message";
  import ability from "../Other/ability";
  export default {
    name: "UserHome",
    components:{ discussionCard, message, ability },
    data(){
      return{
        activeIndex: '1',
        num:1,
        visitUsername:'',
        visitUserId:'',
        userId:'',
        commentSet:[],
        activity:[],
        ability:[],
        problem:[],
        subNum:0,
        acNum:0,
        src:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        background:''
      }
    },
    async created() {
      if (sessionStorage.getItem('userId')){
        this.userId = sessionStorage.getItem('userId');
      }

      let userId = this.$route.params.userId;
      if(userId){
        this.visitUserId = userId;
      }
      else if (sessionStorage.getItem('visitUserId')){
        this.visitUserId = sessionStorage.getItem('visitUserId');
      }
      if(this.visitUserId) {
        sessionStorage.setItem('visitUserId',this.visitUserId)
      }

      let username = this.$route.params.username;
      if(username){
        this.visitUsername = username;
      }
      else if (sessionStorage.getItem('visitUsername')){
        this.visitUsername = sessionStorage.getItem('visitUsername');
      }
      if(this.visitUsername) {
        sessionStorage.setItem('visitUsername',this.visitUsername)
      }
      this.getUser();
      this.getActivity();
      this.getAbility();
      this.getAvatar();
      this.getBackground();
      this.getSubNum();
      this.getAcNum();
    },
    filters:{
      ellipsis (value) {
        if (value == null) return ''
        if (value.length > 50) {
          return value.slice(0,50) + '...'
        }
        return value
      }
    },
    methods:{
      async getAcNum(){
        var res = await this.axios.get('/api/user/acNum',{ params:{ userId: this.visitUserId } });
        this.acNum = res.data
      },
      async getSubNum(){
        var res = await this.axios.get('/api/user/subNum',{ params:{ userId: this.visitUserId }});
        this.subNum = res.data
      },
      handleSelect(key, keyPath) { this.num = key },
      uploadBackground(obj){
        let fd = new FormData();
        fd.append('userId',this.visitUserId);
        fd.append('file',obj.file);
        fd.append('imageType',1);
        this.axios({method:'post', url:'/pro/image', data:fd
        }).then((res)=>{
          console.log(res.data)
        });
      },
      upload(obj){
        let fd = new FormData();
        fd.append('userId',this.visitUserId);
        fd.append('file',obj.file);
        this.axios({method:'post', url:'/pro/image', data:fd
        }).then((res)=>{
          console.log(res.data)
        });
      },
      async getAvatar(){
        var res = await this.axios.get('/pro/image',{
          params:{ userId: this.visitUserId }
        });
        if(res.data!=null&&res.data!=''){
          this.src = 'http://39.106.167.190:8081/images/' + res.data;
        }
      },
      async getBackground(){
        var res = await this.axios.get('/pro/image',{
          params:{ userId: this.visitUserId, imageType: 1 }
        });
        if(res.data!=null&&res.data!=''){
          this.background = 'http://39.106.167.190:8081/images/' + res.data;
        }
      },
      async getUser(){
        var res = await this.axios.get('/pro/comment/user',{
          params:{
            userId: this.visitUserId,
            passerId: this.userId
          }
        });
        this.commentSet = res.data;
      },
      async getActivity(){
        var res = await this.axios.get('/api/user/activity',{
          params:{
            userId: this.visitUserId
          }
        });
        this.activity = res.data;
      },
      async getAbility(){
        var res = await this.axios.get('/api/user/ability',{
          params:{
            userId: this.visitUserId
          }
        });
        this.ability = res.data;
      },
    }
  }
</script>

<style scoped>
  .userHome{
    width: 100%;
    margin-top: 55px;
    position: absolute;
  }
</style>
