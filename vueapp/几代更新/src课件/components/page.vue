<template>

  <el-row :gutter="10">
    <el-col :span="4">
      <side_nav></side_nav>
    </el-col>
    <el-col :span="20">
      <el-card>

        <h3 slot="header"><i class="el-icon-setting"></i>内容详情</h3>

        <div v-if="loading">
          加载中...
        </div>
        <div v-else>
          <h3 style="margin: 15px auto">{{pageData&&pageData.title}}</h3>
          <small>创建于：{{pageData&&new Date(pageData.create_at).toLocaleString()}}</small>
          &nbsp;
          <el-button v-if="userInfo.username==pageData.author.loginname" @click="to_topic" type="text"><i class="el-icon-edit-outline"></i></el-button>

          <hr>

          <div class="markdown-body" v-html="pageContent"></div>
        </div>
      </el-card>

      <el-card>
        <h5 slot="header">评论内容 ({{pageReplies&&pageReplies.length}})</h5>
        <el-table
          :data="pageReplies"
          style="width:100%"
          :show-header="false"
        >
          <el-table-column>

            <template slot-scope="scope">

              <h5>
                <img width="30px" :src="scope.row.author.avatar_url" alt="">
                <strong>{{scope.row.author.loginname}}</strong>
              </h5>
              <div class="markdown-body" v-html="scope.row.content"></div>
              <hr style="margin-top:10px;">
              <small>评论时间：{{new Date(scope.row.create_at).toLocaleString()}}</small>
            </template>

          </el-table-column>
        </el-table>
      </el-card>

      <el-card v-if="$cookie.get('token_id')">
        <h3 slot="header">发布评论：</h3>
        <markdown-editor v-model="content"></markdown-editor>
        <el-button @click="send" type="success">提交评论</el-button>
      </el-card>
    </el-col>
  </el-row>

</template>
<script>
  import {mapState,mapActions} from 'vuex'
  import axios from 'axios'
  import side_nav from './side_nav'
  export default {
      name:"page",
      data(){
          return {
              loading:false,
              content:""
          }
      },
      components:{
        side_nav
      },
      computed:{
        ...mapState([
          'pageData',
          'pageContent',
          'pageReplies',
          'userInfo'
        ])
      },
      methods:{
        ...mapActions([
            'getData'
        ]),
        to_topic(){
            this.$router.push({
              path:'/topic/'+this.pageData.tab+'/'+this.pageData.id
            });
        },
        send(){
           axios.post(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}/replies`,{
               "content":this.content,
             "accesstoken":this.$cookie.get('token_id')
           })
             .then(data=>{
                 this.getData({id:this.$route.params.id})
                   .then(()=>{
                     this.$message('发送成功');
                     this.content = '';
                   });
             })
             .catch(err=>{
                 console.log(err);
             });
        }
      },
      beforeMount(){
          this.loading = true;
          this.getData({id:this.$route.params.id})
            .then(()=>{
              this.loading = false;
              console.log(this.pageReplies);
            });
      }
  }

</script>

<style>
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px 0;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }

</style>
