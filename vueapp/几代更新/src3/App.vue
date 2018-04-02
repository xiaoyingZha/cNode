<template>

  <el-container>
    <!--头部-->
    <el-header class="app-head" style="height: 50px">
      <AppHead></AppHead>
    </el-header>
    <!--主体-->
    <el-main>
      <!--这个组件使用路由-->
      <!--<AppBody></AppBody>-->
      <router-view></router-view>
    </el-main>
    <!--底部-->
    <el-footer>
      <AppFoot></AppFoot>
    </el-footer>
  </el-container>

</template>

<script>
  import AppHead from './components/app_head'
  import AppBody from './components/app_body'
  import AppFoot from './components/app_foot'
  export default {
    name:'App',
    components:{
      AppHead,
      AppBody,
      AppFoot
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
