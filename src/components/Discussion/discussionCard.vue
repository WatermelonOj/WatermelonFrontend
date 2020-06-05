<template>
  <el-card :style="{ borderRadius:'8px' }">
    <el-row>
      <el-col :span="2">
        <el-avatar :size="50" :src="this.comment.userImageUrl"></el-avatar>
      </el-col>
      <el-col :span="6" style="padding: 5px 0">
        <span style="font-size: 15px;">{{ comment.username }}</span><br>
        <span style="font-size: 13px;color: #6f7a7f;">{{ comment.createTime }}</span>
      </el-col>
    </el-row>
    <el-row style="padding: 12px 0"><div class="disLine"></div></el-row>
    <el-row :style="{ cursor:'pointer' }" @click.native="toComment">
      <el-col :style="{ padding: '10px 15px' }">
        <span style="font-size: 20px">{{ comment.title }}</span>
      </el-col>
      <el-col :style="{ padding: '5px 15px' ,color:'#98a0a3' }">
        <markdown-it-vue :content="comment.content | ellipsis"/>
      </el-col>
    </el-row>
    <el-row style="padding: 12px 0"><div class="disLine"></div></el-row>
    <el-row type="flex" justify="end" :style="{ fontSize: '12px' ,color: '#98a0a3' }">
      <el-col :span="0.5">
        <icon scale="0.9" name="thumbs-up" @click.native="admire" v-if="!comment.admired" :style="{ cursor: 'pointer' }"></icon>
        <icon scale="0.9" name="thumbs-up" @click.native="cancelAdmire" v-if="comment.admired" :style="{ color:'#0092ee',cursor: 'pointer' }"></icon>
      </el-col>
      <el-col :span="0.5" :style="{ padding:'2px 5px' }"><span>{{ comment.admireNum }}</span></el-col>
      <el-col :span="0.5"><el-divider direction="vertical"></el-divider></el-col>
      <el-col :span="0.5" :style="{ padding:'1px 0' }"><icon name="eye"></icon></el-col>
      <el-col :span="0.5" :style="{ padding:'2px 5px' }"><span>{{ comment.browseNum }}</span></el-col>
      <el-col :span="0.5"> <el-divider direction="vertical"></el-divider></el-col>
      <el-col :span="0.5"><icon name="comment-dots"></icon></el-col>
      <el-col :span="0.5" :style="{ padding:'2px 5px' }"><span>{{ comment.followNum }}</span></el-col>
    </el-row>
  </el-card>
</template>

<script>
  import MarkdownItVue from 'markdown-it-vue'
  import 'markdown-it-vue/dist/markdown-it-vue.css'
  export default {
    name: "discussionCard",
    components:{ MarkdownItVue },
    props:['comment'],
    created() {
      if(this.comment.userImageUrl) this.comment.userImageUrl = 'http://39.106.167.190:8081/images/' + this.comment.userImageUrl
      else this.comment.userImageUrl = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    methods:{
      toComment(){
        this.$router.push({
          name:'comment',
          params:{
            comment:this.comment
          }
        })
      },
      admire(){
        if (sessionStorage.getItem("userId") ) { var userId = sessionStorage.getItem('userId'); }
        var params = new URLSearchParams();
        params.append('commentId',this.comment.commentId);
        params.append('userId',userId);
        this.axios({
          method:'post',
          url:'/pro/comment/admire',
          data:params
        }).then((res)=>{
          if(res.data){
            this.comment.admireNum++;
            this.comment.admired = !this.comment.admired;
          }
        })
      },
      cancelAdmire(){
        if (sessionStorage.getItem("userId") ) { var userId = sessionStorage.getItem('userId'); }
        this.axios.delete('/pro/comment/admire',{
          params:{
            commentId: this.comment.commentId,
            userId:userId
          }
        }).then((res)=>{
          if(res.data){
            this.comment.admireNum--;
            this.comment.admired = !this.comment.admired;
          }
        });
      }
    },
    filters:{
      ellipsis (value) {
        if (value == null) return ''
        if (value.length > 50) {
          return value.slice(0,50) + '...'
        }
        return value
      }
    }
  }
</script>

<style scoped>
  .disLine{
    width: 100%;
    height: 1px;
    background-color: rgb(240,240,242);
  }
</style>
