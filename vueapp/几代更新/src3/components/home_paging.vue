<template>
  <el-button-group>
    <el-button type="success" icon="el-icon-arrow-left">
      <a  href="javascript:;">上一页</a>
    </el-button>
    <el-button type="success">
      <a href="javascript:;">下一页</a>
      <i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </el-button-group>
</template>

<script>
    export default {
        name: "home_paging",
        methods:{
            prevPage(){
              //this.$router.push({path:`/${this.$route.name}/${this.$route.params.page-1}`})
            },
            nextPage(){

            }
        }
    }
</script>

<style scoped>

</style>
