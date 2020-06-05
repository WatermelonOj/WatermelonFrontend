<template>
  <el-card :style="{ borderRadius:'10px' }">
    <div class="triangleContent">
      <div class="triangle" :style="{ borderBottomColor:judgeColor(contest.startTime,contest.endTime) }"></div>
      <div class="title">{{ judgeTime(contest.startTime,contest.endTime) }}</div>
    </div>
    <el-row :style="{ padding:'10px' }">
      <el-col :span="24">
        <div style="float:left;"><el-link style="font-size: 25px;" @click.native="enterContest">{{ contest.title }}</el-link></div>
        <div style="float:left;padding: 5px 15px">
          <el-tag v-for="(item,index) in contest.tags" :key="index"
                  effect="dark" size="mini" :color="tagsColor(item)" :style="{ borderColor: tagsColor(item) }">{{ item }}</el-tag>
        </div>
      </el-col>
    </el-row>
    <el-row :style="{ padding:'10px' }">
      <span style="color: #848d91">{{ contest.description }}</span>
    </el-row>
    <el-row :style="{ padding:'10px' }">
      <el-col :span="15">
        <icon name="stopwatch" scale="1.2" class="icon"></icon>
        <span class="span">比赛时间：{{ contest.startTime }} - {{ contest.endTime }}</span>
      </el-col>
      <el-col :span="7">
        <icon name="award" scale="1.3" class="icon"></icon>
        <span class="span">主办方：{{ contest.hostname }}</span>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
    export default {
      name: "contestCard",
      props:[ 'contest' ],
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
      async created(){
        var res = await this.axios.get('/pro/contest/tag',{
          params:{
            contestId:this.contest.contestId
          }
        });
        this.$set(this.contest, 'tags', res.data)
      },
      methods:{
        enterContest(){
          this.$router.push({
            name:'contestProblem',
            params: {
              name:'problem',
              dataObj: this.contest
            } });
        },
        tagsColor(obj){
          if(obj == '个人公开赛') return '#ff9528'
          else if(obj == '团队公开赛') return '#009b84'
          else if(obj == 'ACM赛制') return '#ff6028'
          else if(obj == 'O/I赛制') return '#1ebccd'
          else if(obj == '面试考题') return '#6640b2'
        },
        judgeColor(startTime,endTime){
          var res = this.judgeTime(startTime,endTime)
          if(res == '未开始'){
            return '#02729a'
          }
          else if(res == '已结束'){
            return '#a6a9ad'
          }
          else {
            return '#52bbac'
          }
        },
        judgeTime(startTime,endTime){
          var date=new Date();
          var year=date.getFullYear();
          var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
          var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
          var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
          var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
          var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
          var now = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
          if(startTime>now){
            return '未开始'
          }
          else if(endTime<now){
            return '已结束'
          }
          else{
            return '进行中'
          }
        }
      }
    }
</script>

<style scoped>
  .icon{
    float: left;
    margin-left: 5px;
    margin-right: 5px;
  }
  .span{
    float: left;
    margin-left: 5px;
    margin-right: 5px;
    color: #a6a9ad;
  }
  .triangleContent {
    position: relative;
  }
  .triangle {
    position: absolute;
    right: -100px;
    top: -100px;
    transform: rotate(45deg);
    border: 70px solid transparent;
  }
  .title {
    position: absolute;
    right: -17px;
    top: -4px;
    transform: rotate(45deg);
    font-size: 16px;
    color: #fff;
  }
</style>
