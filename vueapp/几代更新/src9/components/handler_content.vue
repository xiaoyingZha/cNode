<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <a href="#" style="color: #80bd01;font-size: 14px;">主页</a>&nbsp;&nbsp;/&nbsp;&nbsp;
      <span style="font-size: 14px;color: #999;">Node.js 新手入门</span>
    </div>
    <div class="handle-content">
      <ul>
        <li v-for="v in nodeData">
          <h3 class="item-title">{{v.title}}</h3>
          <ul>
            <li class="item-li" v-for="val in v.list">
              <h4>{{val.h4}}</h4>
              <div>{{val.text}}<a :href="val.link">{{val.link}}</a></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "handler_content",
        computed:{
          ...mapState([
            'nodeData'
          ])
        }
    }
</script>

<style scoped>
  .item-title{
    font-size: 28px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  .item-li{
    margin-bottom: 10px;
    line-height: 40px;
  }
  .item-li a{
    color: #08c;
  }
  .item-li a:hover{
    text-decoration: underline;
  }



</style>
