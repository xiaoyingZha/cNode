<template>
  <el-container>
    <!--首页的内容 组件-->
    <el-main>
      <!--主体内容组件创建-->
    </el-main>
    <!--侧边栏广告组件-->
    <el-aside width="350px" style="margin-top: 20px">
      <!--登录用户信息-->
      <AsideLoginUser v-if="loginState"></AsideLoginUser>
      <AsideIssue v-if="loginState"></AsideIssue>
      <AsideCnode v-else></AsideCnode>

      <AsideAd></AsideAd>
      <AsideLink></AsideLink>
      <AsideUser></AsideUser>
    </el-aside>
  </el-container>
</template>

<script>
    import {mapState} from 'vuex'
    import AsideLoginUser from './aside/aside_loginuser'
    import AsideIssue from './aside/aside_issue'
    import AsideCnode from './aside/aside_cnode'
    import AsideAd from './aside/aside_ad'
    import AsideLink from './aside/aside_link'
    import AsideUser from './aside/aside_user'
    export default {
        name: "body_about",
        components:{
          AsideLoginUser,
          AsideIssue,
          AsideCnode,
          AsideAd,
          AsideLink,
          AsideUser
        },
        computed:{
          ...mapState([
            'loginState'//登录状态
          ])
        }
    }
</script>

<style scoped>

</style>
