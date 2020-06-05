<template>
    <div>
      <el-row type="flex" justify="center" :style="{ marginTop:'120px' }">
        <el-col :span="10">
          <el-card :style="{padding:'30px' ,borderRadius:'15px' ,textAlign: 'center'}">
            <el-row  :style="{padding: '15px'}">
              <span style="font-size: 30px;color: #009b84;font-weight: bolder">Join us now !</span>
            </el-row>
            <div :style="{padding: '15px'}">
              <el-input prefix-icon="el-icon-user-solid" placeholder="Your Name" v-model="username"></el-input>
            </div>
            <div :style="{padding: '15px'}">
              <el-input prefix-icon="el-icon-message" placeholder="Your Email" v-model="email"></el-input>
            </div>
            <div :style="{padding: '15px'}">
              <el-input prefix-icon="el-icon-lock" placeholder="Password" v-model="password" type="password"></el-input>
            </div>
            <div :style="{padding: '15px'}">
              <el-input prefix-icon="el-icon-lock" placeholder="Confirm Password" v-model="confirm" type="password" @input="confirmPassword"></el-input>
              <span v-if="err" style="font-size: 12px;color: #f83f37;float: left;margin-top: 5px">两次密码不一致！</span>
            </div>
            <div :style="{padding: '15px',textAlign:'right'}">
              <Button :col="'0,159,132'" :context="'Sign up'" @click.native="toLogin"></Button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import Button from "../Other/Button";
    export default {
        name: "register",
      components:{ Button },
      data(){
        return{
          username:'',
          email:'',
          password:'',
          confirm:'',
          err: false
        }
      },
      methods:{
        toLogin(){
          if(this.confirm != this.password){
            return
          }
          var params = new URLSearchParams();
          params.append('username',this.username);
          params.append('password',this.password);
          params.append('email',this.email);
          params.append('nick','');
          this.axios({
            method:'post',
            url:'/pro/user/register',
            data:params
          }).then((res)=>{
            if(res.data == null || res.data == ''){
              this.$message('注册失败！')
            }
            else{
              this.$router.push({ name:'login' })
            }
          });
        },
        confirmPassword(){
          if(this.confirm != this.password){
            this.err = true
          }
          else this.err = false
        }
      }
    }
</script>

<style scoped>

</style>
