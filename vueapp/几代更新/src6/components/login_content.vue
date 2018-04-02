<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix login-title">
      <a href="#" class="login-title-a">首页</a>&nbsp;&nbsp;
      <span style="color: #ccc">/</span>&nbsp;&nbsp;
      <span>登录</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <p>用户名</p>
          <el-input v-model="username" placeholder="手机号/邮箱/账号"></el-input>
          <p>密码</p>
          <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
          <div class="login-btn-box">
            <el-button type="primary" @click="userLogin">登录</el-button>
            <el-button type="success">通过GitHub登录</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#">忘记密码了？</a>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
    //loginInfo
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "login_content",
        data(){
          return{
            username:'',
            password:''
          }
        },
        computed:{
          ...mapState([
            'userInfoMock',//模拟发送用户名及密码信息
            'loginInfo',//返回的登录用户的信息
            'accessToken'//模拟存储cookie
          ])
        },
        methods:{
          ...mapActions([
            'getLoginInfo'
          ]),
          userLogin(){//点击登录按钮：提交用户名及密码，返回用户信息，存储cookie
            if(this.username.toLowerCase()==this.userInfoMock.username){
              //用户名存储的都是小写字母，验证时转小写
                  if(this.password==this.userInfoMock.password){
                      //模拟存储cookie值：用于记录用户登录状态
                      this.$cookie.set('loginId',this.accessToken,7);

                      //请求用户数据
                      this.getLoginInfo();

                      //跳回之前页面
                      this.$router.go(-1);

                  }else{
                    this.$message.error('密码输入错误！');
                  }
            }else{
              this.$message.error('用户名不存在！');
            }

          }
        }
    }
</script>

<style>
  /*<!--style="color:#80bd01"-->*/
  .login-title{
    font-size: 14px;
  }
  .login-title-a{
    color:#80bd01;
  }
  .login-btn-box{
    margin: 20px 0;
    text-align: center;
  }
  .login-btn-box a{
    color: #778087;
  }
</style>
