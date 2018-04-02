<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <a href="#" style="color: #80bd01;font-size: 14px;">主页</a>&nbsp;&nbsp;/&nbsp;&nbsp;
      <span style="font-size: 14px;color: #999;">关于</span>
    </div>
    <div class="markdown-body" v-html="aboutData.content"></div>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "about_content",
        computed:{
          ...mapState([
            'aboutData'
          ])
        }
    }
</script>

<style scoped>
  .markdown-body{
    padding: 0;
  }
</style>
