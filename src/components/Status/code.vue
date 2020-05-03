<template>
  <div class="codeDiv">
    <div style="margin-top: 40px;margin-left: 40px;">
      <h1 style="font-weight: normal;">Code</h1>
    </div>
    <div class="code">
      <h4 style="font-weight: normal;color: #3a8ee6">Author : 100</h4>
      <h4 style="font-weight: normal;color: #3a8ee6">Problem : {{ data.problemId }}</h4>
      <h4 style="font-weight: normal;color: #3a8ee6">Result : {{ data.result }}</h4>
      <markdown-it-vue :content="data.code" style="font-size: 20px"/>
    </div>
  </div>
</template>

<script>
  import MarkdownItVue from 'markdown-it-vue'
  import 'markdown-it-vue/dist/markdown-it-vue.css'
  export default {
    components:{ MarkdownItVue },
    data(){
      return{
        data:''
      }
    },
    created() {
      let routerParams = this.$route.params.dataObj;
      console.log(routerParams);
      if(routerParams){
        this.data = routerParams;
        this.data.code = '```\n' + this.data.code + '\n' + '```'
      }

      if (sessionStorage.getItem("code") ) {
        var userJsonStr = sessionStorage.getItem('code');
        this.data = JSON.parse(userJsonStr);
      }
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("code",JSON.stringify(this.data))
      })
    },
    methods:{
      result(res){
        if (res == 'Accept') { return '#32CD32' }
        else if (res == 'Compile_Error'){ return '#FFC125' }
        else if (res == 'Judging' || res == 'Queuing' || res == 'Compiling'){ return '#00BFFF' }
        else { return '#FF4500' }
      }
    }
  }
</script>

<style scoped>
  .codeDiv{
    width: 70%;
    background: white;
    position: absolute;
    margin-left: 15%;
    margin-top: 100px;
    margin-bottom: 50px;
  }
  .code{
    width: 90%;
    margin-left: 5%;
    margin-bottom: 60px;
  }
</style>
