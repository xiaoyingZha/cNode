<template>

  <el-card
    :body-style="{padding:0,marginRight:'-1px'}"
  >

    <h3 slot="header"><i class="el-icon-menu"></i>导航菜单</h3>

    <el-menu
      :default-active="list_of"
      :router="true"
    >
      <el-menu-item route="/all/1" index="all">全部</el-menu-item>
      <el-menu-item route="/good/1" index="good">精华</el-menu-item>
      <el-menu-item route="/share/1" index="share">分享</el-menu-item>
      <el-menu-item route="/ask/1" index="ask">问答</el-menu-item>
      <el-menu-item route="/job/1" index="job">招聘</el-menu-item>
      <el-menu-item route="/dev/1" index="job">测试板块</el-menu-item>
    </el-menu>

  </el-card>


</template>


<script>
  import {mapState} from 'vuex'
  export default{
      name:'side_nav',
      computed:{
        ...mapState([
            'list_of'
        ])
      }
  }
</script>
