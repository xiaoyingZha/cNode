<template>
  <el-card class="box-card" style="margin-bottom: 10px">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>
    <div v-if="loginState">
      <a href="">
        <img style="height: 50px" :src="loginInfo.avatar_url" alt=""/>
        <span class="login-user-name" >{{loginInfo.loginname}}</span>
      </a>
      <p>
        积分：<span>{{loginInfo.score}}</span>
      </p>
      <div class="login-signer"><em>“ {{settingFormAlign.signature?settingFormAlign.signature:'这家伙很懒，什么个性签名都没有留下。'}} ”</em></div>
    </div>
  </el-card>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "aside_loginuser",//登录用户
        data(){
            return{
              signature:''
            }
        },
        computed:{
          ...mapState([
            'loginInfo',//登录信息
            'loginState',//登录状态
            'settingFormAlign'
          ])
        }
    }
</script>

<style>
  .login-user-name{
    line-height: 50px;
    padding-left: 5px;
    font-size: 16px;
    color: #778087;
  }
  .login-signer{
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
