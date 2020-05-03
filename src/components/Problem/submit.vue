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
        <td><el-input
          style="width: 95%;"
          type="textarea"
          :autosize="{ minRows: 20, maxRows: 100}"
          placeholder="请输入代码"
          v-model="code">
          </el-input></td>
      </tr>
    </table>
    <div style="text-align: center;width: 100%;margin-top: 30px"><el-button type="primary" round @click="submit">Submit</el-button></div>
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
          code:'',
        }
      },
      props:['problemId'],
      methods:{
        submit(){
          var params = new URLSearchParams();
          params.append('pid',this.problemId);
          params.append('uid',100);
          params.append('code',this.code);
          params.append('language',this.value);
          this.axios({
            method:'post',
            url:'/api/submission/submit',
            data:params
          })
          this.$router.push({path:'/status'})
        }
      }
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
</style>
