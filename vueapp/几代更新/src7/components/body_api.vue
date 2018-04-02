<template>
  <el-container>
    <!--首页的内容 组件-->
    <el-main>
      <ApiContent></ApiContent>
    </el-main>
    <!--侧边栏广告组件-->
    <el-aside width="350px">
      <!--暂无组件显示-->
    </el-aside>
  </el-container>
</template>

<script>
    import ApiContent from './api_content'
    export default {
        name: "body_api",
        components:{
          ApiContent
        }
    }
</script>

<style scoped>

</style>
