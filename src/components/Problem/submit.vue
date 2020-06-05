<template>
  <div style="margin-top: 50px;">
    <h2>Submit Code</h2>
    <table>
      <tr style="height: 60px">
        <td width="10%"><span>Language:</span></td>
        <td><el-select v-model="value" placeholder="请选择语言">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select></td>
      </tr>
      <tr>
        <td><span>Code:</span></td>
        <td><textarea id="num" class="num" v-model="num" disabled rows="20" style="text-align: center"></textarea>
          <textarea id="code" class="code" v-model="code" rows="20"
                    onscroll="document.getElementById('num').scrollTop = this.scrollTop;"></textarea></td>
      </tr>
    </table>
    <div style="text-align: center;width: 100%;margin-top: 30px">
      <el-button type="primary" round @click="submit" v-if="this.flag">Submit</el-button>
      <el-button type="primary" round @click="submit" disabled v-if="!this.flag">Submit</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          options: [{value: 'C', label: 'C'},
            {value: 'CPP', label: 'CPP'},
            {value: 'Java8', label: 'Java8'},
            {value: 'Python2', label: 'Python2'},
            {value: 'Python3', label: 'Python3'}],
          value: 'C',
          num:'1',
          code:'',
          flag:true
        }
      },
      props:['problemId','contestId'],
      mounted() {
        this.$nextTick(() => {
          setInterval(this.judgeSubmit, 1000);
        })
      },
      methods:{
        submit(){
          var h = this.code.split("\n").length;
          if(h>=1000){
            this.$message('代码长度太长')
            return;
          }
          else if(h<2){
            this.$message('代码长度太短')
            return;
          }
          if (sessionStorage.getItem("userId") ) {
            var userId = sessionStorage.getItem('userId');
          }
          var params = new URLSearchParams();
          params.append('pid',this.problemId);
          params.append('uid',userId);
          params.append('code',this.code);
          params.append('language',this.value);
          params.append('contestId',this.contestId);
          this.axios({
            method:'post',
            url:'/api/submission/submit',
            data:params
          })
          this.$router.push({path:'/status'});
          var now = new Date();
          sessionStorage.setItem('submitTime',JSON.stringify(now));
        },
        judgeSubmit(){
          var now=new Date();
          if (sessionStorage.getItem('submitTime') ) {
            var date = new Date(JSON.parse(sessionStorage.getItem('submitTime')));
            var total = (now.getTime() - date.getTime())/1000;
            if(total<=10){
              this.flag = false;
              return;
            }
          }
          this.flag = true;
        }
      },
      watch:{
        code:function () {
          var h = this.code.split("\n").length;
          this.num = '';
          for(var i=1;i<=h;i++){
            this.num = this.num + i + '\n';
          }
        }
      },
    }
</script>

<style scoped>
  h2{ font-weight: normal; }
  table{
    border: 0px;
    width: 95%;
    margin-left: 0px;
  }
  tr{border: 0px;}
  td{border: 0px;}
  .num{
    border:none;
    display: block;
    float: left;
    resize : none;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    padding: 10px 10px 10px 10px;
    width: 30px;
    ine-height: 2;
    font-size: 15px;
    overflow-y: hidden;
    overflow-x: hidden;
    background: #ced8dc;
  }
  .code{
    border:none;
    display: block;
    float: left;
    resize : none;
    overflow: scroll;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px 5px;
    ine-height: 2;
    font-size: 15px;
    outline: none;
    overflow-x: hidden;
    background: #fafafa;
    width:700px;
  }
</style>
