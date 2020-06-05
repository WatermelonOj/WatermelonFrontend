<template>
    <div class="menuButton">
      <el-row :style="{ padding:'18px'}" type="flex" justify="center">
        <span class="menuFont" v-show="num==now" style="color: white">{{msg}}</span>
        <span class="menuFont" v-show="num!=now">{{msg}}</span>
      </el-row>
    </div>
</template>

<script>
    export default {
      name: "menuButton",
      props:['msg', 'num', 'now', 'width'],
      data(){
        return{
          name:'clock',
          menuButton:{width: this.width}
        }
      },
      created() {
        //console.log(this.width)
      }
    }
</script>

<style>
  .menuButton{
    height: 55px;
    text-align: center;
    color: #98a0a3;
  }
  .menuFont{
    font-size: 20px;
    transition: 0.4s;
  }
  .menuButton:hover{
    color: white;
  }
</style>
