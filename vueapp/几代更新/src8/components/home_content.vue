<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <nav class="home-content-nav">
            <router-link
              v-for="v in homeNav"
              :key="v.id"
              :to="v.path"
              :class="{active:v.name==(classify?classify:'all')}"
            ><span @click="classify=v.name">{{v.title}}</span></router-link>
          </nav>
        </div>
        <el-table
          :data="homeContent"
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
            label="评论"
            width="90">
            <template slot-scope="scope">
              <strong>{{scope.row.reply_count}}</strong>/<small>{{scope.row.visit_count}}</small>
            </template>
          </el-table-column>
          <el-table-column
            label="标签"
            width="70">
            <template slot-scope="scope">
              <el-tag size="mini" type="danger" v-if="scope.row.top">置顶</el-tag>
              <el-tag size="mini" type="success" v-else-if="scope.row.good">精华</el-tag>
              <el-tag size="mini" type="success" v-else-if="scope.row.tab=='share'">分享</el-tag>
              <el-tag size="mini" type="info" v-else-if="scope.row.tab=='ask'">问答</el-tag>
              <el-tag size="mini" type="info" v-else-if="scope.row.tab=='job'">招聘</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="标题">
            <template slot-scope="scope">
              <!--链接到详情页码-->
              <router-link class="home-content-title" :to="{path:'/topic/'+scope.row.id}">
                {{scope.row.title}}
              </router-link>
              <!--<a href="">{{scope.row.title}}</a>-->
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
        <div class="content-page-box">
          <!--关于页码的组件-->
          <HomePaging></HomePaging>
        </div>
      </el-card>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapActions} from 'vuex'
    import HomePaging from './home_paging'
    export default {
        name: "home_content",
        components:{//组件注入
          HomePaging
        },
        data(){//当前组件数据
          return{
            classify:'',//标记当前，默认为全部
          }
        },
        computed:{
          ...mapState([
            'homeNav',
            'homeContent',
          ])
        },
        methods:{
            ...mapMutations([
              'editHomeTab'
            ]),
            ...mapActions([
              'getHomeContent',
              ' getConPage'
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
        watch:{
          classify(){
            let tab = this.$router.currentRoute.query.tab;
            // console.log(tab);
            this.editHomeTab(tab);
            this.getHomeContent();
          }
        },
        beforeMount(){//首次刷新页面挂载之前请求数据
          this.getHomeContent({tab:'all'});
        }
    }
</script>

<style>
  .box-card > div:first-of-type{
    background-color: #f6f6f6;
  }
  .home-content-nav a{
    font-size: 14px;
    padding: 4px;
    color: #80bd01;
    margin: 0 5px;
  }
  /*当前的标记*/
  .home-content-nav a.active{
    background-color: #80bd01;
    color: #fff;
    border-radius: 4px;
  }
  .content-page-box{
    padding: 10px 0;
    display: flex;
    justify-content: center;
  }
  .content-page-box a{
    color: #fff;
  }
  .home-content-title{
    color: #444;
  }
  .home-content-title:hover{
    text-decoration: #444;
  }


</style>
