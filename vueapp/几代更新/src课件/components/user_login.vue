<template>

  <el-row style="margin-top:50px;">
    <el-col :span="8" :offset="8">
      <el-card>
        <h2 style="text-align: center;" slot="header">登录</h2>
        <el-row>
          <el-col :span="24">
            <el-input ref="user" class="login_input" v-model="username" placeholder="邮箱/手机号/账号"></el-input>
          </el-col>
          <el-col :span="24">
            <el-input ref="pwd" class="login_input"  type="password" v-model="password" placeholder="登录密码"></el-input>
          </el-col>
          <el-col :span="24">
            <el-button @click="loginMethod" type="primary">登录、登入、登陆</el-button>
            <el-button type="warning">取消</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>


</template>

<script>
  import {mapState,mapMutations,mapActions} from "vuex"
  export default{
      name:"user_login",
      data(){
          return {
              username:"",
              password:""
          }
      },
      computed:{
        ...mapState([
            'userInfo',
            'accessToken'
        ])
      },
      methods:{
        ...mapMutations([
            'editLogined'
        ]),
        ...mapActions([
            'getUserInfos'
        ]),
        loginMethod(){

            //验证用户是否正常
            if(this.username==this.userInfo.username){
                if(this.password==this.userInfo.password){

                    //登入成功
                  /*
                  * 存 cookie
                  * 安装cookie
                  * npm v-cookie
                  * */
                  console.log(this.$cookie);
                  var date = new Date();
                  date.setDate(date.getDate()+7);
                  this.$cookie.set('token_id',this.accessToken,{ expires: date.toGMTString() });

                  this.editLogined(true);

                  this.getUserInfos();


                  /*
                  * 跳转到之前的页面
                  *
                  * */

                  this.$router.go(-1);



                }else{
                  this.$message({
                    type:"error",
                    message:"密码不正确",
                    showClose:true,
                    duration:1000
                  });
                  this.$refs.pwd.focus();
                }
            }else{
                this.$message({
                  type:"error",
                  message:"用户名不存在",
                  showClose:true,
                  duration:1000
                });
                this.$refs.user.focus();
            }
        }
      }
  }
</script>

<style>
  .login_input{
    margin:10px 0;
  }
</style>
