<template>
  <el-card class="box-card" style="margin-bottom: 10px">
    <div slot="header" class="clearfix">
      <h4 class="aa-title">{{showData.title}}</h4>
    </div>
      <div>{{showData.text}}</div>
      <p>在这里你可以：</p>
    <div v-for="(v,i) in showData.list" :key="i" class="text item">
      {{v}}
    </div>
  </el-card>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "aside_about",
        computed:{
          ...mapState([
            'asideContent'//获取数据：asideContent.asideAbout
          ]),
          showData(){
            return this.asideContent.asideAbout;
          }
        }
    }
</script>

<style>
  .aa-title{
    font-weight: normal;
  }
</style>
