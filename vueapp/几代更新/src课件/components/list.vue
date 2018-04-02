<template>

  <el-card
    :body-style="{padding:0}"
  >

    <h3 slot="header">
      <el-row>
        <el-col :span="6">
          <i class="el-icon-tickets"></i>列表
        </el-col>
        <el-col :span="3" :offset="15">
          <el-button v-if="$cookie.get('token_id')" @click="to_topic" size="mini" type="success">发布主题</el-button>
        </el-col>
      </el-row>

    </h3>

    <el-table
      :data="list"
      :show-header="false"
      style="width: 100%;">
      <el-table-column
        label="头像"
        width="40">
        <template slot-scope="scope">
          <img class="ava" :src="scope.row.author.avatar_url" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="访问数"
        width="100"
      >
        <template slot-scope="scope">
          <strong>{{scope.row.reply_count}}</strong>/ <small>{{scope.row.visit_count}}</small>
        </template>
      </el-table-column>
      <el-table-column
        label="标题">
        <template slot-scope="scope">
          <el-tag size="mini" type="danger" v-if="scope.row.top">置顶</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.good">精华</el-tag>
          <el-tag size="mini" type="info" v-else-if="scope.row.tab=='share'">分享</el-tag>
          <el-tag size="mini" type="info" v-else-if="scope.row.tab=='ask'">问答</el-tag>
          <el-tag size="mini" type="info" v-else-if="scope.row.tab=='job'">招聘</el-tag>
          <router-link :to="{path:'/page/'+scope.row.id}">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="最后回复"
        width="100"
      >
        <template slot-scope="scope">
          {{countTime(scope.row.last_reply_at)}}
        </template>

      </el-table-column>
    </el-table>


    <page_btn :pagenum="pagenum"></page_btn>

  </el-card>


</template>


<script>

  import {mapState,mapActions,mapMutations} from 'vuex'
  import page_btn from './page_btn'

  export default{
      props:['pagenum'],
      name:'list',
      components:{
        page_btn
      },
      computed:{
        ...mapState([
            'list'
        ])
      },
      methods:{
        ...mapActions([
            'getList'
        ]),
        ...mapMutations([
            'editListOf',
            'editPage'
        ]),
        to_topic(){
            this.$router.push({
              path:"/topic/"+this.$route.name
            });
        },
        countTime(t){

            var now = new Date().getTime();
            var last = new Date(t).getTime();

            var time = now -last;

            //天
            var d = Math.floor(time/(24*60*60*1000));
            //时
            var h = Math.floor(time%(24*60*60*1000)/(60*60*1000));
            //分
            var m = Math.floor(time%(60*60*1000)/(60*1000));


            var data = d>0?d+' 天前':h>0?h+' 小时前':m>0?m+' 分钟前':'刚刚';

          return data;
        }
      },
      beforeMount(){

          this.editPage(this.$route.params.page);
          //修改store中的list_of
          this.editListOf(this.$route.name);
          this.getList();
      }
  }
</script>

<style>
.ava{
  height:30px;
}
</style>
