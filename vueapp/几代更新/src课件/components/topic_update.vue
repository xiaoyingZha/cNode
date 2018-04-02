<template>

  <el-row :gutter="20">
    <el-col :span="18" :offset="3">
        标题：<el-input v-model="title" placeholder="请输入内容" style="width:400px;"></el-input>
    </el-col>
    <el-col :span="18" :offset="3">
      类型：
      <el-select v-model="tab" placeholder="请选择">
        <el-option value="dev"></el-option>
        <el-option value="job"></el-option>
        <el-option value="share"></el-option>
        <el-option value="ask"></el-option>
      </el-select>
    </el-col>
    <el-col :span="18" :offset="3">
      内容：

      <markdown-editor v-model="content"></markdown-editor>


    </el-col>
    <el-col :span="18" :offset="3">
        <el-button @click="send" type="success" style="margin-left:70px;margin-top:20px;">提交主题</el-button>
    </el-col>
  </el-row>

</template>
<script>
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default{
      name:"topic_update",
      data(){
          return {
              title:"修改页面",
              content:"修改内容",
              tab:this.$route.params.name
          }
      },
      computed:{
        ...mapState([
            'pageContent',
            'pageData',
            'postContent'
        ])
      },
      methods:{
        ...mapActions([
            'getData',
            'updateData'
        ]),
        ...mapMutations([
            'editPostContent'
        ]),
        send(){

          //同步store数据
          this.editPostContent({
            title:this.title,
            content:this.content,
            tab:this.tab
          });

          //交互
          const loading = this.$loading({
            lock: true,
            text: '数据发送中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });

          //更新数据
          this.updateData({
            token_id:this.$cookie.get('token_id'),
            topic_id:this.$route.params.id
          })
            .then(()=>{
              loading.close();

              this.$message({
                type:'success',
                message:'发送成功！',
                duration:1000
              });
              this.$router.push({
                path:'/page/'+this.$route.params.id
              });
            })
            .catch(()=>{
              loading.close();
              this.$message({
                type:'error',
                message:'提交失败！',
                duration:1000
              });
            })
        }
      },
      beforeMount(){

          //更具id获取内容
          this.getData({id:this.$route.params.id,mdrender:"false"})
            .then(()=>{
                this.title = this.pageData.title;
                this.content = this.pageContent;
            });
      }
  }

</script>
<style scope>
  .el-col{
    margin-top:10px;
  }
  .editor-toolbar{
    background-color: #fff;
  }
</style>
