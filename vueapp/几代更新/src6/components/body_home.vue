<template>
    <div>
      <el-container>
        <!--首页的内容 组件-->
        <el-main>
          <HomeContent></HomeContent>
        </el-main>
        <!--侧边栏广告组件-->
        <el-aside width="350px" style="margin-top: 20px">
          <AsideLoginUser v-if="loginState"></AsideLoginUser>
          <AsideIssue v-if="loginState"></AsideIssue>
          <AsideCnode v-else></AsideCnode>
          <AsideAd></AsideAd>
          <AsideNobody></AsideNobody>
          <AsideTop></AsideTop>
          <AsideLink></AsideLink>
          <AsideUser></AsideUser>
        </el-aside>
      </el-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    //首页主体组价
    import HomeContent from './home_content'
    //首页的侧边栏组件
    import AsideLoginUser from './aside/aside_loginuser'
    import AsideIssue from './aside/aside_issue'
    import AsideCnode from './aside/aside_cnode'
    import AsideAd from './aside/aside_ad'
    import AsideLink from './aside/aside_link'
    import AsideNobody from './aside/aside_nobody'
    import AsideTop from './aside/aside_top'
    import AsideUser from './aside/aside_user'
    //  v-if="homeContent"
    export default {
        name: "body_home",
        components:{
          HomeContent,
          AsideLoginUser,
          AsideIssue,
          AsideCnode,
          AsideAd,
          AsideNobody,
          AsideTop,
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
