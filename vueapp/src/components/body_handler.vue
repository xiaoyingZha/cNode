<template>
  <div>
    <el-container>
      <!--首页的内容 组件-->
      <el-main>
        <HandlerContent></HandlerContent>
      </el-main>
      <!--侧边栏广告组件-->
      <el-aside width="350px" style="margin-top: 20px">
        <AsideLoginUser v-if="loginState"></AsideLoginUser>
        <AsideIssue v-if="loginState"></AsideIssue>
        <AsideCnode v-else></AsideCnode>
        <AsideAd></AsideAd>
        <AsideLink></AsideLink>
        <AsideUser></AsideUser>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import HandlerContent from './handler_content'
  //新手入门页面的侧边栏组件
  import AsideLoginUser from './aside/aside_loginuser'
  import AsideIssue from './aside/aside_issue'
  import AsideCnode from './aside/aside_cnode'
  import AsideAd from './aside/aside_ad'
  import AsideLink from './aside/aside_link'
  import AsideUser from './aside/aside_user'

  export default {
    name: "body_handler",
    components:{
      HandlerContent,
      AsideLoginUser,
      AsideIssue,
      AsideCnode,
      AsideAd,
      AsideLink,
      AsideUser
    },
    computed:{
      ...mapState([
        'loginState'
      ])
    }
  }
</script>

<style scoped>

</style>
