<template>
  <div>
    <el-row type="flex" justify="center" :style="{ marginTop:'150px' }">
      <el-col :span="10">
        <el-card :style="{padding:'30px' ,borderRadius:'15px' ,textAlign: 'center'}">
          <el-row  :style="{padding: '15px'}">
            <span style="font-size: 30px;color: #009b84;font-weight: bolder">Welcome to Watermelon</span>
          </el-row>
          <el-row :style="{padding: '15px'}">
            <el-input prefix-icon="el-icon-user-solid" placeholder="Username" v-model="Username"></el-input>
          </el-row>
          <el-row :style="{padding: '15px'}">
            <el-input prefix-icon="el-icon-lock" placeholder="Password" v-model="password" type="password"></el-input>
          </el-row>
          <el-row>
            <el-link type="primary" @click="toRegister">Don't have an account?</el-link>
          </el-row>
          <el-row :style="{padding: '15px',textAlign:'right'}">
            <Button :col="'0,159,132'" :context="'Login'" @click.native="toHome"></Button>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Button from "../Other/Button";
    export default {
        name: "login",
      components:{ Button },
      data(){
          return{
            Username:'',
            password:'',
            userId:''
          }
      },
      methods:{
        async toHome(){
          var res = await this.axios.get('/pro/user/login',{
            params:{
              username: this.Username,
              password: this.password
            }
          });
          if(res.data == null || res.data == ''){
            this.$message('用户名或者密码错误！')
          }
          else{
            sessionStorage.setItem("username",this.Username)
            sessionStorage.setItem("userId",res.data.userId)
            this.$router.push({ name:'menu' })
          }
        },
        toRegister(){
          this.$router.push({ name:'register' })
        }
      }
    }
</script>

<style scoped>

</style>
