<template>
  <el-button-group>
    <el-button type="success" icon="el-icon-arrow-left">
      <a href="javascript:;" @click="prevPage">上一页</a>
    </el-button>
    <el-button type="success">
      <a href="javascript:;" @click="nextPage">下一页</a>
      <i class="el-icon-arrow-right el-icon--right"></i></el-button>
  </el-button-group>
</template>

<script>
    import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        name: "home_paging",
        computed:{
          ...mapState([
            'homePageNum'//首页内容页码
          ])
        },
        methods:{
          ...mapMutations([
            'editHomePageNum'//修改首页内容页码
          ]),
          ...mapActions([
            'getHomeContent'//请求首页内容数据
          ]),
            prevPage(){
              if(this.homePageNum==1) return;
              this.editHomePageNum(this.homePageNum-1);//上一页
              this.getHomeContent();//请求数据
            },
            nextPage(){
              this.editHomePageNum(this.homePageNum-(-1));//上一页
              this.getHomeContent();//请求数据
            }
        }
    }
</script>

<style scoped>

</style>
