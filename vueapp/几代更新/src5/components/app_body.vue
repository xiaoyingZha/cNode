<template>
  <el-row :gutter="20">
    <el-col :span="22" :offset="1">
      <div class="grid-content bg-purple">

        <!--使用路由显示其一-->
        <BodyHome></BodyHome>
        <!--<BodyHandler></BodyHandler>-->
        <!--<BodyApi></BodyApi>-->
        <!--<BodyAbout></BodyAbout>-->

      </div>
    </el-col>
  </el-row>
</template>

<script>
    import BodyHome from './body_home'
    import BodyHandler from './body_handler'
    import BodyApi from './body_api'
    import BodyAbout from './body_about'
    export default {
        name: "app_body",
        components:{
          BodyHome,
          BodyHandler,
          BodyApi,
          BodyAbout
        }
    }
</script>

<style scoped>

</style>
