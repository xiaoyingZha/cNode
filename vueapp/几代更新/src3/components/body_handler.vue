<template>
  <div>
    <el-container>
      <!--首页的内容 组件-->
      <el-main>
        <HandlerContent></HandlerContent>
      </el-main>
      <!--侧边栏广告组件-->
      <el-aside width="350px">
        <BodyAside></BodyAside>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import HandlerContent from './handler_content'
  import BodyAside from './body_aside'
  export default {
    name: "body_handler",
    components:{
      HandlerContent,
      BodyAside
    }
  }
</script>

<style scoped>

</style>
