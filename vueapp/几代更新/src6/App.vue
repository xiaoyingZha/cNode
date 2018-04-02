<template>

  <el-container>
    <!--头部-->
    <el-header class="app-head" style="height: 50px">
      <AppHead></AppHead>
    </el-header>
    <!--主体-->
    <el-main>
      <!--这个组件使用路由-->
      <router-view></router-view>
    </el-main>
    <!--底部-->
    <el-footer style="background-color: #fff;height: auto">
      <AppFoot></AppFoot>
    </el-footer>
  </el-container>

</template>

<script>
  import AppHead from './components/app_head'
  import AppFoot from './components/app_foot'
  import {mapActions} from 'vuex'
  export default {
    name:'App',
    components:{
      AppHead,
      AppFoot
    },
    methods:{
      ...mapActions([
        'getLoginInfo'//获取用户登录信息
      ])
    },
    mounted(){
      //获取本地的cookie值
      let cookie = this.$cookie.get('loginId');
      if(cookie){//如果存在cookie就自动登录
        this.getLoginInfo();//获取用户登录信息
      }
    }
  }

</script>

<style>
  body{
    background-color: #e1e1e1;
  }
  .app-head{
    background-color: #444;
  }

</style>
