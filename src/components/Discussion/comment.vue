<template>
  <div class="commentBack">
    <el-card :style="{ borderRadius:'8px' }">
      <el-row :style="{ padding:'0 20px' }">
        <el-col :span="2">
          <el-avatar :size="80" :src="comment.userImageUrl"></el-avatar>
        </el-col>
        <el-col :span="6" style="padding: 15px 0">
          <el-link :underline="false" style="font-size: 25px;" @click.native="toUserHome">{{ comment.username }}</el-link><br>
          <span style="font-size: 15px;color: #6f7a7f;">{{ comment.createTime }}</span>
        </el-col>
      </el-row>
      <el-row style="padding: 12px 0"><div class="line"></div></el-row>
      <el-row>
        <el-col :style="{ padding: '30px 15px' }">
          <span style="font-size: 30px">{{ comment.title }}</span>
        </el-col>
        <el-col :style="{ padding: '10px 45px' }">
          <markdown-it-vue :content="comment.content"/>
        </el-col>
      </el-row>
      <el-row style="padding: 12px 0"><div class="line"></div></el-row>
      <el-row style="padding: 12px 20px">
        <el-col :span="20" :offset="1">
          <el-input placeholder="请写下你的评论吧" v-model="input" clearable></el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="success" icon="el-icon-edit" circle @click.native="add"></el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-row :style="{ padding: '30px 20px 20px 20px', fontSize: '30px' }">
      评论：
    </el-row>
    <el-card v-for="(item,index) in list" :key="index" style="margin-bottom: 20px">
      <el-row>
        <el-col :span="1">
          <el-avatar :size="50" :src="getAvatar(item)"></el-avatar>
        </el-col>
        <el-col :span="23" style="padding: 5px 20px">
          <el-row>
            <span style="font-size: 15px;">{{ item.username }}</span>
            <span style="font-size: 13px;color: #6f7a7f;margin-left: 10px">{{ dateFormat(item.createTime) }}</span>
          </el-row>
          <div class="line" style="margin-top: 5px;margin-bottom: 5px"></div>
          <el-row>
            <span style="font-size: 15px;">{{ item.content }}</span>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import MarkdownItVue from 'markdown-it-vue'
  import 'markdown-it-vue/dist/markdown-it-vue.css'
  export default {
    name: "comment",
    components:{ MarkdownItVue },
    data(){
      return{
        comment:{},
        input:'',
        userId:'',
        username:'',
        list:[]
      }
    },
    async created() {
      let routerParams = this.$route.params.comment;
      if(routerParams){
        this.comment = routerParams;
      }
      else if (sessionStorage.getItem('comment') ) {
        var userJsonStr = sessionStorage.getItem('comment');
        this.comment = JSON.parse(userJsonStr);
      }
      if(this.comment) { sessionStorage.setItem("comment",JSON.stringify(this.comment)) }

      if (sessionStorage.getItem("username") ) { this.username = sessionStorage.getItem('username'); }
      if (sessionStorage.getItem("userId") ) { this.userId = sessionStorage.getItem('userId'); }
      var res = await this.axios.get('/pro/comment/follow',{
        params:{
          passerId:this.userId,
          commentId:this.comment.commentId
        }
      });
      this.list = res.data
    },
    mounted() {
      this.websocket = new WebSocket("ws://39.106.167.190:8081/commentHandler/ID="+this.userId)
      this.initWebSocket()
    },
    beforeDestroy () {
      this.onbeforeunload()
    },
    methods:{
      getAvatar(obj){
        if(obj.userImageUrl) return 'http://39.106.167.190:8081/images/' + obj.userImageUrl
        else return 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },
      add(){
        var params = new URLSearchParams();
        params.append('username',this.username);
        params.append('userId',this.userId);
        params.append('title','');
        params.append('content',this.input);
        params.append('followId',this.comment.commentId);
        this.axios({
          method:'post',
          url:'/pro/comment',
          data:params
        });
        this.input = ''
      },
      toUserHome(){ this.$router.push({
        name:'UserHome',
        params:{
          username:this.comment.username,
          userId:this.comment.userId
        }
      }) },
      dateFormat(time) {
        var date=new Date(time);
        var year=date.getFullYear();
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      },
      initWebSocket () {
        this.websocket.onerror = this.setErrorMessage
        this.websocket.onmessage = this.setOnmessageMessage
        window.onbeforeunload = this.onbeforeunload
      },
      setErrorMessage () {
        console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
      },
      async setOnmessageMessage (event) {
        if(event.data == 'comment'){
          var res = await this.axios.get('/pro/comment/follow',{
            params:{
              passerId:this.userId,
              commentId:this.comment.commentId
            }
          });
          this.list = res.data
        }
        console.log('服务端返回：' + event.data)
      },
      onbeforeunload () {
        this.websocket.close();
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
  .commentBack{
    width:80%;
    margin-top:125px;
    margin-left:10%;
    position: absolute;
    margin-bottom: 100px;
  }
</style>
