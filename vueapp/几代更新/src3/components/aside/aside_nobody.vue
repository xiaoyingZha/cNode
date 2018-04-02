<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>无人回复的话题</span>
    </div>
    <div v-for="v in asideNobody" :key="v" class="text item">
      {{v}}
    </div>
  </el-card>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "aside_nobody",
        computed:{//.asideNobody
          ...mapState([
            'asideContent'
          ]),
          asideNobody(){
            return this.asideContent.asideNobody;
          }
        }
    }
</script>

<style>
  .box-card .item{
    font-size: 14px;
    line-height: 24px;
  }
</style>
