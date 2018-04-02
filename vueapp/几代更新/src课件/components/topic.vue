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
      name:"topic",
      data(){
          return {
              title:'',
              content:''
          }
      },
      computed:{
        ...mapState([
            'topic_id'
        ]),
          tab(){

              var tab = '';

              if(this.$route.params.name=='all'||this.$route.params.name=='good'){
                tab = 'dev';
              }else{
                tab = this.$route.params.name
              }

              return tab;
          }
      },
      methods:{
        ...mapMutations([
          'editPostContent',
          'editTopicId'
        ]),
        ...mapActions([
          'sendContent'
        ]),
          send(){
            //验证
            if(this.title==''){
                this.$message({
                  type:'error',
                  message:'标题不能为空'
                })
            }else if(this.title.length<10){
                this.$message({
                  type:'error',
                  message:'标题不能太短'
                })
            }else if(this.content==''){
              this.$message({
                type:'error',
                message:'内容不能为空'
              })
            }else{

                //成功后
                this.editPostContent({ //同步数据到store
                  title:this.title,
                tab:this.tab,
                content:this.content
            });

              const loading = this.$loading({
                lock: true,
                text: '数据发送中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });

                //发送内容到服务器
                this.sendContent(this.$cookie.get('token_id'))
                  .then((data)=>{
                    this.editTopicId(data.data.topic_id);
                    loading.close();
                    this.$message({
                      type:'success',
                      message:'发送成功！',
                      duration:1000
                    });
                    this.$router.push({
                      path:'/page/'+this.topic_id
                    });
                  })
                  .then(()=>{
                     console.log('上面的老兄已经成功了，所以我也嗷一嗓子。');
                  })
                  .catch(()=>{
                    loading.close();
                    this.$message({
                      type:'error',
                      message:'提交失败！',
                      duration:1000
                    });
                  });



            }
          }
      }
  }

</script>
<style>
  .el-col{
    margin-top:10px;
  }
  .editor-toolbar{
    background-color: #fff;
  }
</style>
