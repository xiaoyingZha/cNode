<template>
  <div>
    <el-container>
      <!--首页的内容 组件-->
      <el-main>
        <!--新消息-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <a href="#" style="color: #80bd01">主页</a>
            /
            <span style="color: #999">新消息</span>
          </div>

          <ul class="messages-list" v-if="messagesRead.length>0">
            <li v-for="v in messagesRead" :key="v.id" class="text item">
              <a :href="v.author.avatar_url">{{'列表内容 ' + v.author.loginname }}</a>
              回复了你的话题
              <a :href="`/topic/${v.topic.id}`">{{v.topic.title}}</a>
            </li>
          </ul>
          <div v-else>无新消息</div>

        </el-card>
        <!--过往消息-->
        <el-card class="box-card" style="margin-top: 10px">
          <div slot="header" class="clearfix">
            <span>过往消息</span>
          </div>
          <ul class="messages-list" v-if="messagesUnread.length>0">
            <li v-for="v in messagesUnread" :key="v.id" class="text item">
              <router-link :to="`/user/${v.author.loginname}`">{{'列表内容 ' + v.author.loginname }}</router-link>
              回复了你的话题
              <router-link :to="`/topic/${v.topic.id}`">{{v.topic.title}}</router-link>
            </li>
          </ul>
          <div v-else>无过往消息</div>
        </el-card>
      </el-main>
      <!--侧边栏广告组件-->
      <el-aside width="350px" style="margin-top: 20px">
        <AsideLoginUser v-if="loginState"></AsideLoginUser>
        <AsideIssue v-if="loginState"></AsideIssue>
        <AsideCnode v-else></AsideCnode>
        <AsideAd></AsideAd>
        <AsideNobody></AsideNobody>
        <AsideTop></AsideTop>
        <AsideLink></AsideLink>
        <AsideUser></AsideUser>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  //首页的侧边栏组件
  import AsideLoginUser from './aside/aside_loginuser'
  import AsideIssue from './aside/aside_issue'
  import AsideCnode from './aside/aside_cnode'
  import AsideAd from './aside/aside_ad'
  import AsideLink from './aside/aside_link'
  import AsideNobody from './aside/aside_nobody'
  import AsideTop from './aside/aside_top'
  import AsideUser from './aside/aside_user'
    export default {
        name: "body_messages",
        components:{
          AsideLoginUser,
          AsideIssue,
          AsideCnode,
          AsideAd,
          AsideNobody,
          AsideTop,
          AsideLink,
          AsideUser
        },
        computed:{
          ...mapState([
            'loginState',//登录状态
            'messagesRead',//已读消息
            'messagesUnread'//未读消息
          ])
        },
        methods:{
          ...mapActions([
            'getMessages'
          ])
        },
        beforeMount(){
          this.getMessages(this.$cookie.get('loginId'));
        }
    }
</script>

<style>
  .messages-list li{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
  .messages-list li a{
    color: #08c;
  }

</style>
