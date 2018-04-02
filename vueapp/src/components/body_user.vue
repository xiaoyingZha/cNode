<template>
  <el-container>
    <!--首页的内容 组件-->
    <el-main>
      <!--用户信息-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <a href="#" style="color: #80bd01">主页</a>
          /
        </div>
        <div>
          <img style="width: 40px" :src="userIndexInfo.avatar_url" alt="userIndexInfo.githubUsername">
          <span class="name">{{userIndexInfo.githubUsername}}</span>
        </div>
        <ul class="info-list">
          <li>{{userIndexInfo.score}} 积分</li>
          <li><i class="el-icon-location"></i> {{'北京'}}</li>
          <li>GitHub： @<a href="#">{{userIndexInfo.githubUsername}}</a></li>
        </ul>
      </el-card>
      <!--最近创建的话题-->
      <el-card class="box-card" style="margin: 10px 0">
        <div slot="header" class="clearfix">
          <span>最近创建的主题</span>
        </div>
        <!--内容列表-->
        <el-table
          :data="userIndexInfo.recent_topics"
          :show-header="false"
          style="width: 100%">
          <el-table-column
            label="作者"
            width="40">
            <template slot-scope="scope">
              <img
                style="height:30px"
                :src="scope.row.author.avatar_url"
                :alt="scope.row.author.loginname"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="标题">
            <template slot-scope="scope">
              <!--链接到详情页码-->
              <router-link class="title" :to="{path:'/topic/'+scope.row.id}">
                {{scope.row.title}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            label="最后评论"
            width="100">
            <template slot-scope="scope" style="text-align: center">
              <time>{{lastTime(scope.row.last_reply_at)}}</time>
            </template>
          </el-table-column>
        </el-table>
        <!---->
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>最近参与的话题</span>
        </div>
        <el-table
          :data="userIndexInfo.recent_replies"
          :show-header="false"
          style="width: 100%">
          <el-table-column
            label="作者"
            width="40">
            <template slot-scope="scope">
              <img
                style="height:30px"
                :src="scope.row.author.avatar_url"
                :alt="scope.row.author.loginname"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="标题">
            <template slot-scope="scope">
              <!--链接到详情页码-->
              <router-link class="title" :to="{path:'/topic/'+scope.row.id}">
                {{scope.row.title}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            label="最后评论"
            width="100">
            <template slot-scope="scope" style="text-align: center">
              <time>{{lastTime(scope.row.last_reply_at)}}</time>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-main>
    <!--侧边栏广告组件-->
    <el-aside width="350px" style="margin-top: 20px">

      <el-card class="box-card" style="margin-bottom: 10px">
        <div slot="header" class="clearfix">
          <span>作者</span>
        </div>
        <div>
          <a href="javascript:;" @click="userIndex(userIndexInfo.loginname)">
            <img style="height: 50px" :src="userIndexInfo.avatar_url" alt=""/>
            <span class="login-user-name" >{{userIndexInfo.loginname}}</span>
          </a>
          <p>
            积分：<span>{{userIndexInfo.score}}</span>
          </p>
          <div class="writer-signer"><em>“ 这家伙很懒，什么个性签名都没有留下。 ”</em></div>
        </div>
      </el-card>

      <!--<AsideLoginUser v-if="loginState"></AsideLoginUser>-->
      <AsideIssue v-if="loginState"></AsideIssue>
      <AsideCnode v-else></AsideCnode>
      <AsideAd></AsideAd>
      <AsideNobody></AsideNobody>
      <AsideTop></AsideTop>
      <AsideLink></AsideLink>
      <AsideUser></AsideUser>
    </el-aside>
  </el-container>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import AsideLoginUser from './aside/aside_loginuser'
  import AsideIssue from './aside/aside_issue'
  import AsideCnode from './aside/aside_cnode'
  import AsideAd from './aside/aside_ad'
  import AsideLink from './aside/aside_link'
  import AsideNobody from './aside/aside_nobody'
  import AsideTop from './aside/aside_top'
  import AsideUser from './aside/aside_user'
    export default {
      name: "body_user",
      data(){
        return{
        }
      },
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
          'loginState',
          'userIndexInfo'
        ])
      },
      methods:{
        ...mapActions([
          'getUserIndexInfo'
        ]),
        lastTime(t){

          let now = new Date().getTime();//当前时间
          let last = new Date(t).getTime();//最后评论时间
          let time = now -last;//获取时间差

          //天数
          let d = parseInt(time/(24*60*60*1000));
          //时
          let h = parseInt(time%(24*60*60*1000)/(60*60*1000));
          //分
          let m = parseInt(time%(60*60*1000)/(60*1000));

          //设置显示
          let showTime = d?d+'天前':h?h+'小时前':m?m+'分钟前':'刚刚';
          return showTime;
        },
      },
      beforeMount(){
        this.getUserIndexInfo(this.$route.params.id).then(()=>{

        });

      }
    }
</script>

<style scoped>
  .cell .title{
    color: #333;
    font-size: 14px;
  }
  .cell .title:hover{
    color: #08c;
  }
  .name{
    color: #778087;
  }
  .info-list{
    margin: 10px 0;
    line-height: 26px;
  }
</style>
