<template>
  <div class="disHome">
    <el-row :style="{ padding: '25px 0 0 30px' }">
      <el-col :span="2">
        <el-avatar :size="80" :src="this.src"></el-avatar>
      </el-col>
      <el-col :span="2" :style="{ padding:'25px 10px' }">
        <span style="font-size: 25px;">{{username}}</span>
      </el-col>
      <el-col :span="3" :style="{ padding:'20px 0' }" :offset="17">
        <el-button type="danger" icon="el-icon-edit" @click.native="toWrite">写文章</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row v-for="item in data" :key="item.commentId">
       <el-col :style="{ padding: '0 30px' }">
         <dis-list-item :comment="item"></dis-list-item>
       </el-col>
    </el-row>
    <div style="width: 100%;height: 50px"></div>
  </div>
</template>

<script>
  import disListItem from "./disListItem";
    export default {
        name: "disHome",
      components:{ disListItem },
      data(){
          return{
            data:[],
            username:'',
            userTd:'',
            src:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
          }
      },
      async created() {
        if (sessionStorage.getItem("userId") ) { this.userId = sessionStorage.getItem('userId'); }
        if (sessionStorage.getItem("username") ) { this.username = sessionStorage.getItem('username'); }
        this.getOwnConment();
        this.getAvatar();
      },
      mounted() {
        this.websocket = new WebSocket("ws://39.106.167.190:8081/commentHandler/ID="+this.userId)
        this.initWebSocket()
      },
      beforeDestroy () {
        this.onbeforeunload()
      },
      methods:{
        toWrite(){ this.$router.push({ name:'write' }) },
        async getAvatar(){
          var res = await this.axios.get('/pro/image',{
            params:{ userId: this.userId }
          });
          if(res.data!=null&&res.data!=''){
            this.src = 'http://39.106.167.190:8081/images/' + res.data;
          }
        },
        async getOwnConment(){
          var res = await this.axios.get('/pro/comment/user',{
            params:{
              userId: this.userId,
              passerId: this.userId
            }
          });
          this.data = res.data;
        },
        initWebSocket () {
          this.websocket.onerror = this.setErrorMessage
          this.websocket.onmessage = this.setOnmessageMessage
          window.onbeforeunload = this.onbeforeunload
        },
        setErrorMessage () {
          console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
        },
        setOnmessageMessage (event) {
          console.log(event.data)
          if(event.data == 'comment_delete'){
            this.getOwnConment();
          }
        },
        onbeforeunload () {
          this.websocket.close();
        }
      }
    }
</script>

<style scoped>
  .disHome{
    width: 80%;
    margin-left: 10%;
    background: white;
    margin-top: 125px;
    position: absolute;
  }
  .line{
    width: 100%;
    height: 1px;
    background-color: rgb(240,240,242);
  }
</style>
