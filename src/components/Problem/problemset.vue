<template>
  <div style="margin-top: 10%;position: absolute;width: 100%">
    <el-card class="setBack" v-if="flag">
      <div style="margin-left: 50px;margin-top: 20px;font-size: 30px;"><span>Problem List</span></div>
      <div style="text-align: center;margin-top: 50px;margin-bottom: 30px">
          <span style="font-size: 20px;margin-top: 30px">Search Problem</span>
          <el-input placeholder="请输入题目或者标签" v-model="keywords" clearable style="width: 300px"></el-input>
          <el-button type="primary" icon="el-icon-search" circle></el-button>
      </div>
      <el-row>
        <el-col :span="3" :offset="21">
            <el-button type="danger" size="mini" @click="showChart">算法标签分类</el-button>
        </el-col>
      </el-row>
      <table v-loading="loading">
        <tr class="firstTr">
          <td width="5%"></td>
          <td width="10%">#</td>
          <td width="45%">Problem Name</td>
          <td style="text-align: center;" width="25%">Tag</td>
          <td style="text-align: center;" width="15%">AC Rate</td>
        </tr>
        <tr class="all" v-for="item in search(keywords)" :key="item.id">
          <td>
            <icon v-show="judge(item.status) == 1" name="check" style="margin-left: 10px;color: #67C23A"></icon>
            <icon v-show="judge(item.status) == 2" name="times" style="margin-left: 10px;color: #f83f37"></icon>
            <icon v-show="judge(item.status) == 3" name="minus" style="margin-left: 10px;color: #98a0a3"></icon>
          </td>
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
          <td style="text-align: center;">
            <el-tag :style="{ marginBottom: '5px', marginRight: '5px', cursor:'pointer', borderColor: tagsColor(items) }"
                    v-for="(items,index) in item.problemTags" :key="index" type="danger"
                    effect="dark" size="small" @click="tagSearch(items)" :color="tagsColor(items)">{{ items }}</el-tag>
          </td>
          <td style="text-align: center;"><el-progress :text-inside="true" :stroke-width="20" :percentage="passRate(item)"></el-progress></td>
        </tr>
      </table>
    </el-card>
    <div class="setBack" v-if="!flag" style="background: rgba(0,0,0,0);">
      <el-row :style="{ padding:'0 0 20px 0' }">
        <el-col :span="1" :offset="1">
          <el-button type="info" icon="el-icon-back" circle @click="flag=!flag"></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-card><chart @event1="tagSearch($event)"></chart></el-card>
      </el-row>
    </div>
    <logo></logo>
  </div>
</template>

<script>
  import chart from "../Other/chart";
  import logo from "../Other/logo";
  export default {
    data(){
      return{
        keywords:'',
        flag: true,
        userId:'',
        data:[],
        tagList:["枚举", "模拟", "递归&分治", "贪心", "排序", "二分", "倍增", "构造", "前缀和&差分", "DFS(搜索)", "BFS(搜索)", "双向搜索", "启发式搜索",
                "A*", "迭代加深搜索", "IDA*", "回溯法", "Dancing_Links", "记忆化搜索", "背包DP", "区间DP", "DAG 上的 DP", "树形DP", "状压DP", "数位DP",
                "插头DP", "计数DP", "动态DP", "DP优化", "字符串匹配", "字符串哈希", "字典树(Trie)", "前缀函数与KMP算法", "Z函数(扩展KMP)", "自动机",
                "AC自动机", "后缀数组(SA)", "后缀自动机(SAM)", "广义后缀自动机", "后缀树", "Manacher", "回文树", "序列自动机", "最小表示法",
                "Lyndon分解", "复数", "位运算", "快速幂", "进位制", "高精度计算", "数论", "多项式", "线性代数", "线性规划", "组合数学", "概率&期望",
                "置换群", "斐波那契数列", "博弈论", "牛顿迭代法", "数值积分", "分段打表", "栈", "队列", "链表", "哈希表", "并查集", "并查集时间复杂度证明",
                "堆", "块状数据结构", "单调栈", "单调队列", "ST表", "树状数组", "线段树", "区间最值操作&区间历史最值", "划分树", "二叉搜索树&平衡树",
                "可持久化数据结构", "树套树", "K-D Tree", "珂朵莉树", "动态树", "析合树", "图的存储", "DFS(图论)", "BFS(图论)", "树上问题", "矩阵树定理",
                "有向无环图", "拓扑排序", "最小生成树", "最小树形图", "最短路", "拆点", "差分约束", "k短路", "连通性相关", "2-SAT", "欧拉图", "哈密顿图",
                "二分图", "最小环", "平面图", "网络流", "Prufer序列", "LGV引理", "弦图", "二维计算几何基础", "极坐标系", "距离", "Pick定理", "三角剖分",
                "凸包", "扫描线", "旋转卡壳", "半平面交", "平面最近点对", "随机增量法", "反演变换", "计算几何杂项", "读入、输出优化", "复杂度", "离散化",
                "离线算法", "分数规划", "随机化", "悬线法", "计算理论基础", "字节顺序", "约瑟夫问题", "Stern-Brocot树与Farey序列", "格雷码", "表达式求值"],
        loading:true,
        color:['#f83f37','#ed1b60','#ab26aa','#6640b2','#3a55b1','#1ebccd','#009b84','#ff9528','#ff6028','#5e7d8a','#ffbf36','#22af47']
      }
    },
    components:{ chart, logo },
    async created() {
      if (sessionStorage.getItem("userId") ) {
        this.userId = sessionStorage.getItem('userId');
      }
      var res = await this.axios.get('/pro/problem/all',{
        params:{
          userId: this.userId
        }
      });
      this.data = res.data;
      //console.log(this.data)
      this.loading = false;
    },
    methods:{
      tagsColor(obj){
        for(var i=0;i<this.tagList.length;i++){
          if(obj == this.tagList[i]){
            return this.color[i%12]
          }
        }
        return ''
      },
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
      },
      passRate(item){
        var acNum = Math.round(Number(item.acNum)/Math.max(1,Number(item.subNum))*100);
        return acNum
      },
      async tagSearch(data){
        this.loading = true;
        this.flag = true
        var res = await this.axios.get('/pro/problem/sort',{
          params:{
            tag: data,
            userId:this.userId
          }
        });
        this.data = res.data;
        this.loading = false;
      },
      showChart(){ this.flag = !this.flag },
      judge(obj){
        if(obj == 'Accepted'){ return 1 }
        else if(obj == 'Expectant'){ return 2 }
        else { return 3 }
      }
    }
  }
</script>

<style>
  .setBack{
    width: 80%;
    background: white;
    margin-left: 10%;
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


