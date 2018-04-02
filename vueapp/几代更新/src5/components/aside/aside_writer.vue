<template>
  <el-card v-if="conPage" class="box-card" style="margin-bottom: 10px">
    <div slot="header" class="clearfix">
      <span>作者</span>
    </div>
    <div>
      <img style="height: 50px" :src="conPage.author.avatar_url" alt=""/>
      <span class="login-user-name" >{{conPage.author.loginname}}</span>
      <p>
        积分：<span>***</span>
      </p>
      <div class="writer-signer"><em>“ 这家伙很懒，什么个性签名都没有留下。 ”</em></div>
    </div>
  </el-card>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "aside_writer",//作者信息
        computed:{
          ...mapState([
            'conPage'//详情页数据
          ])
        }
    }
</script>

<style scoped>
  .writer-signer{
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
