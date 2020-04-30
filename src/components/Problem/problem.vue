<template>
  <div>
    <div class="problem">
      <div style="text-align: center;margin-top: 50px;">
        <h1>{{ this.data.title }}</h1>
      </div>
      <div style="margin-left: 50px;margin-bottom: 30px;margin-right: 50px">
        <h2>Description</h2><markdown-it-vue class="md-body" :content="this.data.description"/>
        <h2>Input</h2><markdown-it-vue :content="this.data.input"/>
        <h2>Output</h2><markdown-it-vue :content="this.data.output"/>
        <h2>Example</h2>
        <h3>Input</h3><el-input :value="this.data.sampleInput" readonly style="width: 400px"></el-input>
        <h3>Output</h3><el-input :value="this.data.sampleOutput" readonly style="width: 400px"></el-input>
        <submit :problem-id="this.data.problemId"></submit>
      </div>
    </div>

    <div class="information">
      <table>
        <tr><td style="border-top: 0px;font-size: 25px;">Information</td>
        <tr><td style="border-top: 0px;">Time Limit</td><td style="text-align: right;border-top: 0px;">{{ this.data.tmLimit }} MS</td></tr>
        <tr><td>Memory Limit</td><td style="text-align: right">{{ this.data.memLimit }} MB</td></tr>
        <tr><td>Problem ID</td><td style="text-align: right">{{ this.data.problemId }}</td></tr>
        <tr><td>AC Rate</td><td style="text-align: right">
          <el-progress :text-inside="true" :stroke-width="20" :percentage="70"></el-progress>
        </td></tr>
      </table>
    </div>

    <div class="information" style="margin-top: 500px;height: 400px">
      <table style="color: #4F4F4F;">
        <tr><td style="border-top: 0px;font-size: 25px;height: 50px">Statistic</td></tr>
      </table>
    </div>
  </div>
</template>

<script>
  import Submit from "./submit";
  import MarkdownItVue from 'markdown-it-vue'
  import 'markdown-it-vue/dist/markdown-it-vue.css'
  export default {
    components: {Submit, MarkdownItVue},
    data(){
      return{
        data:''
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

      if (sessionStorage.getItem("store") ) {
        var userJsonStr = sessionStorage.getItem('store');
        this.data = JSON.parse(userJsonStr);
      }
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.data))
      })
    }
  }
</script>

<style scoped>
  .name{
    font-size: 27px;
    margin-top: 10px;
  }
  span{
    font-size: 18px;
  }
  .problem{
    width: 70%;
    background: white;
    position: absolute;
    margin-left: 3%;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .information{
    width: 21%;
    background: white;
    position: absolute;
    margin-left: 76%;
    margin-top: 50px;
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
</style>
