<template>

  <el-row>
    <el-col :span="6">
      <img class="logo" src="../assets/cnodejs_light.svg" alt="">
    </el-col>
    <el-col v-if="!logined" class="hidden-xs-only" :span="4" :offset="14">
      <el-button class="my-btn" type="text">注册</el-button>
      <el-button class="my-btn" @click="login"  type="text">登录</el-button>
    </el-col>
    <el-col v-if="logined" class="hidden-xs-only" :span="6" :offset="12">
      <img style="vertical-align: middle;" :src="userInfos&&userInfos.avatar_url" height="30" alt=""> <a href="#" style="color:#fff;">{{userInfos&&userInfos.loginname}}</a> <a href="javascript:;" @click="logout" style="color:red;">退出</a>
    </el-col>
  </el-row>

</template>


<script>
  import {mapState} from 'vuex'
  export default {
    name:'app-header',
    computed:{
      ...mapState([
          'logined',
          'userInfos'
      ])
    },
    methods:{
      login(){
          this.$router.push({
            path:'/login'
          });
      },
      logout(){
          this.$cookie.delete('token_id');
          window.location.reload();
      }
    }
  }

</script>

<style>


  .my-btn{
    color:#eee;
  }
  .my-btn:hover{
    color:#ccc;
  }


</style>
