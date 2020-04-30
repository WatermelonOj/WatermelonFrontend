<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-card :style="{padding:'30px'}">
          <div :style="{padding: '15px'}"><el-input prefix-icon="el-icon-message" placeholder="Email"></el-input></div>
          <div :style="{padding: '15px'}"><el-input prefix-icon="el-icon-lock" placeholder="Password"></el-input></div>
          <div :style="{padding: '15px',textAlign:'right'}">
            <el-button type="primary" round>Login</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-card :style="{padding:'30px'}">
          <div :style="{padding: '15px'}"><el-input prefix-icon="el-icon-user-solid" placeholder="Your Name"></el-input></div>
          <div :style="{padding: '15px'}"><el-input prefix-icon="el-icon-message" placeholder="Your Email"></el-input></div>
          <div :style="{padding: '15px'}"><el-input prefix-icon="el-icon-lock" placeholder="Password"></el-input></div>
          <div :style="{padding: '15px'}"><el-input prefix-icon="el-icon-lock" placeholder="Confirm Password"></el-input></div>
          <div :style="{padding: '15px',textAlign:'right'}">
            <el-button type="primary" round>Sign up</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>

  export default {
    name: "home",
    data(){
      return{
      }
    },
    methods:{

    }
  }
</script>

<style>
  .pic{
    width: 100%;
  }
  img{
    height: auto;
    width: 100%;
  }
</style>
