<template>
  <div class="back">
    <div style="margin-left: 50px;margin-top: 20px;font-size: 30px;"><span>Problem List</span></div>
    <div style="text-align: center;margin-top: 50px;margin-bottom: 30px">
        <span style="font-size: 20px;margin-top: 30px">Search Problem&nbsp&nbsp</span>
        <el-input placeholder="请输入题目或者标签" v-model="keywords" clearable style="width: 300px"></el-input>
        <el-button type="primary" icon="el-icon-search" circle></el-button>
    </div>

    <table v-loading="loading">
      <tr class="firstTr">
        <td width="10%">#</td>
        <td width="50%">Problem Name</td>
        <td style="text-align: center;" width="25%">Tag</td>
        <td style="text-align: center;" width="15%">AC Rate</td>
      </tr>
      <!--  :bgcolor="item.color"-->
      <tr class="all" v-for="item in search(keywords)" :key="item.id">
        <td>{{ item.problemId }}</td>
        <td><router-link
          :to="{
              name:'problem',
              params: {
                name:'problem',
                dataObj: item
              }
          }" style="text-decoration-line: none;">
            <span style="color: rgb(65 105 225);cursor:pointer;">{{ item.title }}</span>
        </router-link></td>
        <!--<td style="text-align: center;">
          <el-tag v-for="items in item.tag" :key="index" type="danger" effect="dark" style="margin-left: 3px">标签{{ items }}</el-tag>
        </td>-->
        <td style="text-align: center;">
          <el-tag type="danger" effect="dark" style="margin-left: 3px">标签</el-tag>
        </td>
        <td style="text-align: center;"><el-progress :text-inside="true" :stroke-width="20" :percentage="50"></el-progress></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        keywords:'',
        data:[],
        loading:true
      }
    },
    async created() {
      var res = await this.axios.get('/pro/problem/all')
      this.data = res.data;
      this.loading = false;
    },
    methods:{
      search(keywords){
        /*this.data = (await this.axios.get('/pro/problem/name', {
          params: {
            name: this.keywords
          }
        })).data;*/
        var newList = this.data.filter(item => {
          if(item.title.includes(keywords)){
            return item
          }
        })
        return newList
      }
    }
  }
</script>

<style>
  .back{
    width: 80%;
    background: white;
    position: absolute;
    margin-left: 10%;
    margin-top: 70px;
  }
  table{
    width: 94%;
    margin-left: 3%;
    margin-top: 1%;
    margin-bottom: 80px;
    border-collapse:collapse;
    border: 0px solid #999;
  }
  table td{
    border-top: 1px solid rgb(238 238 238);
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
  }
  table tr{
    height: 50px;
  }
  .firstTr{
    font-weight: bold;
    border-top: 0;
    border-bottom: 2px solid #999;
  }
  table tr.firstTr td{
    border-top: 0;border-bottom: 2px solid #999;
  }
  .all:hover{
    background: rgb(250,250,252);
  }
  .el-progress{
    margin-left: 10px;
    margin-right: 10px;
  }
</style>


