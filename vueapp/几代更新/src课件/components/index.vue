<template>



  <el-container>

    <el-header class="my-header">

      <app-header></app-header>

    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>

  </el-container>

</template>


<script>
  import appHeader from './header'
  import all from './all'
  export default {
      name:'index',
      components:{
        appHeader,
        all
      }
  }

</script>

<style>


  .my-header{
    background-color: #444;
    width:100%;
    color:#fff;
    line-height:60px;
  }
  .logo{
    height:30px;
    margin-top:15px;
  }

</style>
