<template>

  <el-row :gutter="10">
    <el-col :span="4">
      <side_nav></side_nav>
    </el-col>
    <el-col :span="20">
      <list pagenum="30"></list>
    </el-col>
  </el-row>


</template>


<script>
  import side_nav from './side_nav'
  import list from './list'
  export default{
      name:'job',
      components:{
          side_nav,
          list
      }
  }
</script>

