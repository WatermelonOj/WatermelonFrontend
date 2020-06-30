<template>
  <div>
    <el-row :style="{ padding: '0 6px 0 0' }">
      <el-col :span="23">
        <el-link :underline="false" target="_blank" style="font-size: 25px" @click.native="toComment">{{ comment.title }}</el-link>
      </el-col>
      <el-col :span="1">
        <el-popconfirm title="确定删除这篇文章吗" @onConfirm="this.delete">
          <icon slot="reference" scale="1.5" name="backspace" class="delete"></icon>
        </el-popconfirm>
      </el-col>
    </el-row>
    <el-row :style="{ padding: '6px 0' ,color:'#98a0a3' }">
      <el-col :span="24">
        <span style="font-size: 15px">{{ comment.content | ellipsis }}</span>
      </el-col>
    </el-row>
    <el-row type="flex" :style="{ padding: '6px 0 0 0' ,fontSize: '12px' ,color: '#98a0a3' }">
      <el-col :span="3"><span>{{ comment.createTime }}</span></el-col>
      <el-col :span="1" :offset="18">
        <icon scale="0.9" name="thumbs-up" @click.native="admire" v-if="!comment.admired" :style="{ cursor: 'pointer' }"></icon>
        <icon scale="0.9" name="thumbs-up" @click.native="cancelAdmire" v-if="comment.admired" :style="{ color:'#0092ee',cursor: 'pointer' }"></icon>
        <span>{{ comment.admireNum }}</span>
      </el-col>
      <el-col :span="1"><icon scale="1" name="eye"></icon>  <span>{{ comment.browseNum }}</span></el-col>
      <el-col :span="1"><icon scale="0.9" name="comment-dots"></icon>  <span>{{ comment.followNum }}</span></el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>

<script>
    export default {
        name: "disListItem",
      props:['comment'],
      data(){
        return{

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
      },
      methods:{
          delete(){
            this.axios.delete('/pro/comment',{
              params:{
                commentId: this.comment.commentId
              }
            });
          },
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
      }
    }
</script>

<style scoped>
  .delete{
    marginLeft: 10px;
    color: #6f7a7f;
    cursor: pointer;
  }
  .delete:hover{ color: #46545a }
</style>
