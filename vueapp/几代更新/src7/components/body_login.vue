<template>
  <el-container>
    <!--首页的内容 组件-->
    <el-main>
      <!--创建用户登录组件-->
      <LoginContent></LoginContent>
    </el-main>

    <el-aside width="350px" style="margin-top: 20px">
      <!--侧边栏广告组件:AsideAbout-->
      <AsideAbout></AsideAbout>
    </el-aside>
  </el-container>
</template>

<script>
    import AsideAbout from './aside/aside_about'
    import LoginContent from './login_content'
    export default {
        name: "body_login",
        components:{
          AsideAbout,
          LoginContent
        }
    }
</script>

<style scoped>

</style>
