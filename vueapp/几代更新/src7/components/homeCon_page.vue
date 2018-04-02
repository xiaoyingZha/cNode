<template>
  <el-container>

    <el-main>

      <!--首页的内容 组件-->
      <el-card class="box-card" v-if="conPage">

        <!--头部-->
        <div slot="header" class="clearfix">
          <!--标题-->
          <h2>
            <el-tag size="mini" type="danger" v-if="conPage.top">置顶</el-tag>
            <el-tag size="mini" type="success" v-else-if="conPage.good">精华</el-tag>
            <el-tag size="mini" type="success" v-else-if="conPage.share">分享</el-tag>
            <el-tag size="mini" type="info" v-else-if="conPage.ask">问答</el-tag>
            <el-tag size="mini" type="info" v-else-if="conPage.job">招聘</el-tag>
            <span class="title">{{conPage.title}}</span>
          </h2>

          <div class="info">
            发布时间: <time>{{new Date(conPage.create_at).toLocaleString()}}</time>
            <span class="text-line">|</span>
        		作者: <a href="#">{{conPage.author.loginname}}</a>
            <span class="text-line">|</span>
            <span>{{conPage.visit_count}}</span>次浏览
            <span class="text-line">|</span>来自
            <!--<span v-if="conPage.top">置顶</span>-->
            <span v-if="conPage.tab=='good'">精华 </span>
            <span v-else-if="conPage.tab=='share'">分享</span>
            <span v-else-if="conPage.tab=='ask'">问答</span>
            <span v-else-if="conPage.tab=='job'">招聘</span>

            <div style="padding-top: 10px">

            	<!--作者是我就显示-->
            	<span v-if="showState">
                <!--编辑按钮:去到编辑主题的页面-->
                <el-button plain @click="toMyTopic"><i class="el-icon-edit"></i></el-button>
                <!--删除按钮-->
                 <el-button plain><i class="el-icon-delete del-ico"></i></el-button>
            	</span>

            	&nbsp;&nbsp;
              <!--收藏按钮-->
            	<el-button size="medium" type="success">收藏</el-button>
            </div>

          </div>
        </div>

        <!--内容-->
        <div  v-if="conPage" class="markdown-body" v-html="conPage.content">

        </div>

      </el-card>

      <!--replies-->
      <el-card class="box-card"  v-if="conPage" style="margin: 10px 0;">
        <div>
          <div slot="header" class="clearfix">
            <p>评论({{conPage.replies.length}})</p>
          </div>

            <el-table
              :data="conPage.replies"
              :show-header="false"
              style="width: 100%">
              <el-table-column
                label="用户"
                width="50">
                <template slot-scope="scope">
                  <a href="#">
                    <img width="30" :src="scope.row.author.avatar_url" :alt="scope.row.author.loginname">
                  </a>
                </template>
              </el-table-column>
              <el-table-column
                  label="信息"
              >
                <template slot-scope="scope">
                  <div>
                    <div>
                      <a class="loginname" href="#">{{scope.row.author.loginname}}</a>
                      <a class="create-at" href="#">{{commentTime(scope.row.create_at)}}</a>
                    </div>
                    <p v-html="scope.row.content"></p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="点赞"
                width="60">
                <template slot-scope="scope">
                  <a href="#" style="font-size: 18px"><i class="el-icon-upload2"></i></a>
                  <span>{{scope.row.ups.length}}</span>
                </template>
              </el-table-column>

            </el-table>

        </div>
      </el-card>

    </el-main>

    <!--侧边栏广告组件-->
    <el-aside width="350px" style="margin-top: 20px">
      <!--作者信息组件-->
      <AsideWriter></AsideWriter>
      <!--广告-->
      <AsideAd></AsideAd>
      <!--作者其他话题组件-->
      <AsideOtherTopic></AsideOtherTopic>
      <!--nobody无人回复组件-->
      <AsideNobody></AsideNobody>
    </el-aside>
  </el-container>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    import AsideWriter from './aside/aside_writer'
    import AsideAd from './aside/aside_ad'
    import AsideOtherTopic from './aside/aside_othertopic'
    import AsideNobody from './aside/aside_nobody'

    export default {
        name: "home-con_page",
        components:{//组件注入
          AsideWriter,
          AsideAd,
          AsideOtherTopic,
          AsideNobody
        },
        computed:{//计算属性
          ...mapState([//结构
            'conPage',//详情页的内容
            'userInfoMock'//登陆用户的信息：名、密码
          ]),
          showState(){
          	//判断 ：详情页作者名是不是登陆者的名，返回值可用于判断操作文本的显示
          	return this.conPage.author.loginname.toLowerCase()==this.userInfoMock.username;
          }
        },
        methods:{
          ...mapActions([
            'getConPage',//获取详情页数据的方法
          ]),
          commentTime(t){//评论时间
            let now = new Date().getTime();
            let cTime = new Date(t).getTime();
            let time = now - cTime;
            let m = parseInt(time/(30*24*60*60*1000));
            let d = parseInt(time%(30*24*60*60*1000)/(24*60*60*1000));
            let tt = m?m+'个月前':d?d+'天前':'今天';
            return tt;

          },
          toMyTopic(){//在我的主题下点击 编辑按钮 去到修改主题的页面
            this.$router.push({
              path:'/topic/'+this.$route.params.id+'/edit'
            });
          }
        },
        beforeMount(){//挂载之前请求详情页的数据
          let id = this.$route.params.id;
          this.getConPage(id);//请求详情页的内容
        }
    }
</script>

<style scoped>
  .title{
    font-size: 20px;
    line-height: 30px;
  }
  .info{
    color: #666;
  }
  .info a:hover{
    text-decoration: #666;
  }
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
  .loginname{
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }
  .create-at{
    font-size: 12px;
    color: #08c;
  }
  .text-line{
  	padding: 0 5px;
  }
  .del-ico{
  	font-size: 16px;
  }
</style>
