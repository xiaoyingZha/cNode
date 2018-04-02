<template>
  <el-card class="box-card" style="margin-bottom: 10px">
    <div slot="header" class="clearfix">
      <a href="#">积分榜   TOP 100 >></a>
    </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "aside_top"
    }
</script>

<style scoped>

</style>
