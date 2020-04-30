<template>
  <!-- -->
  <div class="back">
    <div style="margin-left: 50px;margin-top: 20px;font-size: 30px;"><span>Status</span></div>
    <table style="text-align: center" class="tableBg" v-loading="loading">
      <tr class="firstTr">
        <td width="15%">Submit Time</td>
        <td width="15%">Author</td>
        <td width="15%">Problem</td>
        <td width="15%">Result</td>
        <td width="15%">Time</td>
        <td width="15%">Memory</td>
        <td width="10%">Language</td>
      </tr>
      <tr v-for="item in data" :key="item.subId">
        <td>{{ item.subTime }}</td>
        <td>{{ item.userId }}</td>
        <td><router-link :to="{
              name:'problem',
              query: {
                name:'problem',
                dataObj: item
              }
            }" style="text-decoration-line: none;">
          <el-link :underline="false">{{ item.problemId }}</el-link></router-link></td>
        <td><el-tag effect="dark" style="border: 0;height: 30px" :color="resultColor(item.result)" >{{ item.result }}</el-tag></td>
        <td>{{ item.runTime }} MS</td>
        <td>{{ item.runMemory }} KB</td>
        <td><router-link :to="{
              name:'code',
              params: {
                name:'code',
                dataObj: item
              }
            }" style="text-decoration-line: none;">
          <el-link :underline="false">{{ item.language }}</el-link></router-link></td>
      </tr>
    </table>
    <div style="width: 100%;text-align: center;margin-bottom: 50px;margin-top: 50px">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :pager-count="5"
        :page-count="totalPage"
        @current-change="updatePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      name: "status",
      data(){
          return{
            loading: true,
            data:'',
            currentPage:1,
            totalPage:0
          }
      },
      async created() {
        this.data = (await this.axios.get('/api/submission/all', {
          params: {
            page: 1
          }
        })).data;
        this.totalPage = (await this.axios.get('/api/submission/count')).data;
        setInterval(this.update,3000);
        this.loading = false;
      },
      methods: {
        async update(){
          var res = await this.axios.get('/api/submission/all',{
            params:{
              page:this.currentPage
            }
          });
          this.data = res.data;
        },
        async updatePage(val){
          this.currentPage = val;
          var res = await this.axios.get('/api/submission/all',{
            params:{
              page:this.currentPage
            }
          });
          this.data = res.data;
        },
        resultColor(res){
          var col='';
          if (res == 'Accept') { col = '#32CD32' }
          else if (res == 'Compile_Error'){ col = '#FFC125' }
          else if (res == 'Judging' || res == 'Queuing' || res == 'Compiling'){ col = '#00BFFF' }
          else { col = '#FF4500' }
          return col;
        }
      }
    }
</script>

<style scoped>
  .back{
    width: 94%;
    background: white;
    position: absolute;
    margin-left: 3%;
    margin-top: 70px;
    margin-bottom: 100px;
  }
  table{
    width: 94%;
    margin-left: 3%;
    margin-top: 1%;
    border-collapse:collapse;
    border: 0px solid #999;
  }
  table td {
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
  .tableBg tr:nth-child(even){
    background:rgb(248,248,250);
  }
</style>
