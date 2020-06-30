<template>
  <div class="writeBackground">
    <el-row :style="{ padding: '20px' }">
      <el-input placeholder="请输入标题" v-model="title"></el-input>
    </el-row>
    <el-row :style="{ padding: '20px' }">
      <mavon-editor v-model="content" @change="change"></mavon-editor>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="3" :style="{ padding:'20px 0' }">
        <el-button type="danger" icon="el-icon-finished" @click.native="submit">发布</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
    export default {
        name: "write",
      components:{ mavonEditor },
      data(){
          return{
            content:'',
            title:''
          }
      },
      methods:{
          change(markdown,html){
            this.content = markdown;
          },
          submit(){
            var params = new URLSearchParams();
            if (sessionStorage.getItem("userId") ) { var userId = sessionStorage.getItem('userId'); }
            if (sessionStorage.getItem("userId") ) { var username = sessionStorage.getItem('username'); }
            params.append('username',username);
            params.append('userId',userId);
            params.append('title',this.title);
            params.append('content',this.content);
            params.append('followId','');
            this.axios({
              method:'post',
              url:'/pro/comment',
              data:params
            }).then((res)=>{
              this.$router.push({ name:'disHome' })
            });
          }
      }
    }
</script>

<style scoped>
  .writeBackground{
    width: 80%;
    margin-left: 10%;
    margin-top: 150px;
    position: absolute;
  }
</style>
