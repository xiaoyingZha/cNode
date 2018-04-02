<template>

  <el-row class="login-btn-group hidden-sm-and-up">
    <el-col :span="24">
      <el-button class="w-btn" type="danger">注册</el-button>
    </el-col>
    <el-col :span="24">
      <el-button class="w-btn" type="primary">登录</el-button>
    </el-col>
  </el-row>

</template>

<script>

  export default {
      name:'login'
  }

</script>

<style>

  .w-btn{
    width:100%;
    border-radius: 0;
    margin:5px auto;
  }
  .login-btn-group{
    position: absolute;
    bottom:0;
    width:100%;
  }

</style>
