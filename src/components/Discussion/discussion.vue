<template>
  <div style="margin-top: 10%;position: absolute;width: 100%">
    <div class="discussionBackground">
      <el-row v-for="(item,index) in commentSet" :key="index">
        <el-col style="margin-bottom: 20px">
          <discussion-card :comment="item"></discussion-card>
        </el-col>
      </el-row>
    </div>
    <logo></logo>
  </div>
</template>

<script>
  import discussionCard from "./discussionCard";
  import logo from "../Other/logo";
  export default {
    name: "discussion",
    components:{ discussionCard, logo },
    data(){
      return{
        commentSet:[]
      }
    },
    async created() {
      if (sessionStorage.getItem("userId") ) { var userId = sessionStorage.getItem('userId'); }
      var res = await this.axios.get('/pro/comment/user',{
        params:{
          passerId:userId
        }
      });
      this.commentSet = res.data
    }
  }
</script>

<style scoped>
  .discussionBackground{
    width: 70%;
    margin-left: 15%;
  }
</style>
