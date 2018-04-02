<template>
    <div class="body-aside-box">
      <AsideCnode></AsideCnode>
      <hr>
      <AsideAd></AsideAd>
      <hr>
      <AsideNobody></AsideNobody>
      <hr>
      <AsideLink></AsideLink>
      <hr>
      <AsideTop></AsideTop>
      <hr>
      <AsideUser></AsideUser>
    </div>
</template>

<script>
  import AsideAd from './aside/aside_ad'
  import AsideCnode from './aside/aside_cnode'
  import AsideLink from './aside/aside_link'
  import AsideNobody from './aside/aside_nobody'
  import AsideTop from './aside/aside_top'
  import AsideUser from './aside/aside_user'
    export default {
        name: "body_aside",//侧边栏广告组件
        components:{
          AsideAd,
          AsideCnode,
          AsideLink,
          AsideNobody,
          AsideTop,
          AsideUser
        }
    }
</script>

<style scoped>
  .body-aside-box{
    margin-top: 20px;
    padding-right: 10px;
  }

</style>
