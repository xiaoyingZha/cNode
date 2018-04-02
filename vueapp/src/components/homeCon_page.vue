<template>
  <el-container>

    <el-main>
      <div v-if="conPage" v-loading="loading">
        <!--首页的内容 组件-->
        <el-card class="box-card">

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
                <el-button v-if="!collectState" size="medium" type="success" @click="collect">收藏</el-button>
                <el-button v-else type="info" size="medium" @click="OutCollect">取消收藏</el-button>
              </div>

            </div>
          </div>

          <!--内容-->
          <div  v-if="conPage" class="markdown-body" v-html="conPage.content">

          </div>

        </el-card>

        <!--评论-->
        <el-card class="box-card" style="margin: 10px 0;">
          <div>
            <div slot="header" class="clearfix">
              <p>评论({{conPage.replies.length}})</p>
            </div>

            <el-table
              :data="conPageReplies"
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

                      <span class="create-at">
                        <!--楼层-->
                        {{scope.row.lou}}楼*
                        <!--创建时间-->
                        {{commentTime(scope.row.create_at)}}
                        <!--这里**************************-->
                        <span v-if="scope.row.author.loginname==userInfoMock.username" class="ico-author">作者</span>

                      </span>

                    </div>
                    <p v-html="scope.row.content"></p>
                    <!--富文本编辑器-->
                    <div v-if="currentReplyId==scope.row.id">
                      <markdown-editor v-model="currentReplyContent" ref="markdownEditor"></markdown-editor>
                      <el-button type="primary" size="mini" @click="currentReply(scope.row.reply_id)">回复</el-button>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="点赞"
                width="120">
                <template slot-scope="scope">
                  <!--点赞-->
                  <el-button type="text" icon="el-icon-upload2" @click="up(scope.row)">{{scope.row.ups.length}}</el-button>

                  <!--回复当前评论-->
                  <el-button @click="editCurrentReplyId(scope.row.author.loginname,scope.row.id)" type="text" icon="el-icon-edit"></el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
        </el-card>

        <!--回复-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加回复</span>
          </div>
          <!--富文本编辑器-->
          <markdown-editor v-model="replyContent" ref="markdownEditor"></markdown-editor>
          <!--回复按钮-->
          <el-button type="primary" @click="sendReply">回复</el-button>
        </el-card>
      </div>

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
        data(){
            return{
              collectState:false,
              currentId:null,
              replyContent:'',//回复内容
              currentReplyContent:'',//当前回复内容
              currentReplyId:1,//当前回复的id
              loading:true
            }
        },
        components:{//组件注入
          AsideWriter,
          AsideAd,
          AsideOtherTopic,
          AsideNobody
        },
        computed:{//计算属性
          ...mapState([//结构
            'conPage',//详情页的内容
            'conPageReplies',//详情页的评论
            'userInfoMock',//登陆用户的信息：名、密码
            'userCollect'//用户收藏的主题
          ]),
          showState(){
          	//判断 ：详情页作者名是不是登陆者的名，返回值可用于判断操作文本的显示
          	return this.conPage.author.loginname.toLowerCase()==this.userInfoMock.username;
          }
        },
        methods:{
          ...mapActions([
            'getConPage',//获取详情页数据的方法
            'topicCollect',//请求收藏
            'callCollect',//取消收藏
            'getUserCollect',//用户收藏的主题
            'createReplies',//新建评论
            'replyUp'//为评论点赞
          ]),
          editCollectState(bool){//修改收藏状态
            this.collectState = bool;
          },
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
          },
          collect(){//点击收藏要做的事
            this.topicCollect({//点击 收藏
              "accesstoken":this.$cookie.get('loginId'),
              "topic_id":this.conPage.id
            }).then(data=>{
              this.editCollectState(data.data.success);
            });
          },
          OutCollect(){//点击 取消收藏
            this.callCollect({
              "accesstoken":this.$cookie.get('loginId'),
              "topic_id":this.conPage.id
            }).then(data=>{
              //切换状态
              this.editCollectState(!data.data.success);
            })
          },
          sendReply(){//发送回复
            this.createReplies({
              accesstoken:this.$cookie.get('loginId'),//用户的accesstoken
              content:this.replyContent,//回复内容
              topic_id:this.conPage.id
            }).then(()=>{
              //清空输入框
              this.replyContent = '';
            });
          },
          editCurrentReplyId(name,id){//修改当前回复的id

            this.currentReplyContent = `@${name} `;
            this.currentReplyId = id;
          },
          currentReply(id){
              this.createReplies({
                accesstoken:this.$cookie.get('loginId'),
                content:this.currentReplyContent,
                reply_id:id,
                topic_id:this.conPage.id
              }).then(()=>{
                this.currentReplyContent = '';
                this.editCurrentReplyId(0);
              })
          },
          up(data){
            //点击的是自己的赞，则不执行
            if(this.userInfoMock.username==data.author.loginname.toLowerCase()){
              this.$message('呵呵，不能为自己点赞哦...');
              return;
            }

            this.replyUp({
              "accesstoken":this.$cookie.get('loginId'),
              "id":data.id,
              "topic_id":this.$route.params.id
            });
          }
        },
        beforeMount(){//挂载之前请求详情页的数据
          let id = this.$route.params.id;
          this.getConPage(id).then(()=>{
            this.currentId = this.conPage.id;
          });//请求详情页的内容

          //获取用户的收藏主题
          this.getUserCollect().then(()=>{
            //收藏的主题中是否存在与当前详情页的ID一样的，如果已经收藏就返回true，否则false
            this.collectState = this.userCollect.some(v=>{
              return v.id == this.currentId;
            });
          });
          this.loading = false;
        },

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
  .loginname:hover{
    color: #385f8a;
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
  .ico-author{
    color: #fff;
    background-color: #6ba44e;
  }
</style>
