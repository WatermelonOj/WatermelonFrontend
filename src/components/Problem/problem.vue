<template>
  <div>
    <el-card class="problem">
      <div style="text-align: center;margin-top: 50px;">
        <h1>{{ this.data.title }}</h1>
      </div>
      <div style="margin-left: 25px;margin-bottom: 30px;margin-right: 25px">
        <h2>Description</h2><markdown-it-vue class="md-body" :content="this.data.description"/>
        <h2>Input</h2><markdown-it-vue :content="this.data.input"/>
        <h2>Output</h2><markdown-it-vue :content="this.data.output"/>
        <h2>Example</h2>
        <h3>Input</h3>
        <textarea class="sample" v-model="this.data.sampleInput" disabled :rows="getLine(this.data.sampleInput)"></textarea>
        <h3>Output</h3>
        <textarea class="sample" v-model="this.data.sampleOutput" disabled :rows="getLine(this.data.sampleOutput)"></textarea>
        <submit :problem-id="this.data.problemId" :contest-id="this.data.contestId"></submit>
      </div>
    </el-card>

    <el-card class="information">
      <el-row :style="{ fontSize: '25px', padding:'10px' }">
        <el-col :span="12">Information</el-col>
      </el-row>
      <el-row :style="{ padding:'10px' }">
        <el-col :span="14">Time Limit</el-col>
        <el-col :span="10" style="text-align: right">{{ this.data.tmLimit }} MS</el-col>
      </el-row>
      <el-row :style="{ padding:'10px' }">
        <el-col :span="14">Memory Limit</el-col>
        <el-col :span="10" style="text-align: right">{{ this.data.memLimit }} MB</el-col>
      </el-row>
      <el-row :style="{ padding:'10px' }">
        <el-col :span="14">Problem ID</el-col>
        <el-col :span="10" style="text-align: right">{{ this.data.problemId }}</el-col>
      </el-row>
      <el-row :style="{ padding:'10px', marginBottom:'10px' }">
        <el-col :span="14">AC Rate</el-col>
        <el-col :span="10" style="text-align: right">{{ this.data.acNum + ' / ' + this.data.subNum }}</el-col>
      </el-row>
    </el-card>

    <el-card class="information" style="margin-top: 400px;">
      <statistic :problem="data"></statistic>
    </el-card>

    <el-card class="information" style="margin-top: 880px;margin-bottom: 50px">
      <el-row :style="{ fontSize: '25px', padding:'10px 0 0 10px' }">Excellent code</el-row>
      <div v-for="(item, index) in codeList" :key="index"
           :style="{ marginTop: '15px', background: '#f1f3f9', cursor: 'pointer' }"
           v-if="index<5" @click="toCode(item)">
        <el-row :style="{ padding:'15px 15px 5px 15px', fontSize: '18px' }">
          Author: {{ item.username }}
        </el-row>
        <el-row :style="{ padding:'0 15px 5px 15px', fontSize: '14px' }">
          <el-col :span="12">Time: {{ item.runTime }}MS</el-col>
          <el-col :span="12" style="text-align: right">Memory: {{ item.runMemory }}MB</el-col>
        </el-row>
        <el-row :style="{ padding:'0 15px 15px 15px', fontSize: '14px' }">
          <el-col :span="12">Language: {{ item.language }}</el-col>
          <el-col :span="12" style="text-align: right">{{ item.subTime }}</el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Submit from "./submit";
  import MarkdownItVue from 'markdown-it-vue'
  import 'markdown-it-vue/dist/markdown-it-vue.css'
  import statistic from "../Other/statistic";
  export default {
    components: {Submit, MarkdownItVue, statistic},
    data(){
      return{
        data:'',
        codeList:[]
      }
    },
    directives:{
      focus: {
        inserted: function (el) {
          el.querySelector('input').focus()
        }
      }
    },
    created(){
      let routerParams = this.$route.params.dataObj
      if(routerParams){
        this.data = routerParams
      }
      else if (sessionStorage.getItem('store') ) {
        var userJsonStr = sessionStorage.getItem('store');
        this.data = JSON.parse(userJsonStr);
      }
      if(this.data) { sessionStorage.setItem("store",JSON.stringify(this.data)) }
      this.getGoodCode();
    },
    methods:{
      passRate(item){
        var acNum = Math.round(Number(item.acNum)/Math.max(1,Number(item.subNum))*100);
        return acNum
      },
      getLine(obj){
        if(obj == null || obj == '') return 1;
        var h = obj.split("\n").length;
        return h;
      },
      async getGoodCode() {
        var res = await this.axios.get('/api/submission/good',{
          params:{
            problemId:this.data.problemId
          }
        });
        this.codeList = res.data
      },
      toCode(obj){
        this.$router.push({
          name:'code',
          params:{
            dataObj: obj
          }
        })
      }
    }
  }
</script>

<style scoped>
  span{
    font-size: 18px;
  }
  .problem{
    width: 65%;
    background: white;
    position: absolute;
    margin-left: 3%;
    margin-top: 105px;
    margin-bottom: 50px;
  }
  .information{
    width: 26%;
    background: white;
    position: absolute;
    margin-left: 71%;
    margin-top: 105px;
  }
  h1{ font-weight: normal; }
  h2{ font-weight: normal; }
  h3{ font-weight: normal; }
  table{
    width: 90%;
    margin-left: 5%;
    margin-top: 3%;
    margin-bottom: 100px;
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
  .sample{
    border:1px solid #d6d9da;
    resize : none;
    border-radius: 5px;
    padding: 5px 15px;
    width: 400px;
    line-height: 1.5;
    font-size: 15px;
    overflow-y: hidden;
    overflow-x: hidden;
    background: #f5f5f6;
  }
</style>
