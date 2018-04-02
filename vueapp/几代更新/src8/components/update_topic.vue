<template>

	<el-container>
	  <el-main>

	  	<el-card class="box-card">
		  <div slot="header" class="clearfix">
		  	<a href="#" style="color: #80bd01;font-size: 14px;">主页</a>&nbsp;&nbsp;/&nbsp;&nbsp;
		    <span style="font-size: 14px;color: #999;">发布话题</span>
		  </div>
		  <div>
		  	<span>选择版块</span>
		  	<el-select v-model="tab" placeholder="请选择">
			    <el-option
			      v-for="item in createTopicList"
			      :key="item.name"
			      :value="item.title">
			    </el-option>
			  </el-select>

			  <el-input style="margin-top: 10px;" v-model="title" placeholder="标题内容10字以上"></el-input>

				<!--富文本编辑器-->
        <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>

				<div id="">
					<!--点击提交按钮，修改主题-->
					<el-button @click="send" style="margin-top: 20px;" type="primary">提交</el-button>
				</div>


		  </div>
		</el-card>
	  </el-main>
	  <el-aside width="350px" style="margin-top: 20px;">
      Markdown 语法参考
      这里是编辑修改我的主题
	  </el-aside>
	</el-container>

</template>

<script>
  //组件引入编辑器
  import markdownEditor from 'vue-simplemde/src/markdown-editor'

	import {mapState,mapMutations,mapActions} from 'vuex'
	export default {
	    name: "update_topic",
	    data(){
	    	return{
	    		title:'',
	    		tab:'',
	    		content:''
	    	};
	    },
	    components:{
        markdownEditor
	    },
	    computed:{
	    	...mapState([
	    		'createTopicList',
          'conPage'//详情页的数据
	    	])
	    },
	    methods:{
	    	...mapMutations([
	    		'editTopics',//修改请求数据
          'editConPage'//修改详情页数据

	    	]),
	    	...mapActions([
	    		'topicsUpdate'//编辑我的主题的请求
	    	]),
	    	clearParams(){//清空输入框
	    		this.title = '';
	    		this.tab = '';
	    		this.content = '';
	    	},
	    	send(){
	    		//请求创建前先验证一次
	    		if(this.tab==''){
	    			this.$message.error('必须选择一个版块!');
	    		}else if(this.title.trim()==''){
	    			this.$message.error('标题不能为空!');
	    		}else if(this.title.trim().length<10){
	    			this.$message.error('标题内容太短!');
	    		}else if(this.content==''){
	    			this.$message.error('请输入一些内容吧!');
	    		}else{

	    			let tab = this.createTopicList.filter(v=>{
	    				return v.title == this.tab;
	    			})[0].name;

	    			//验证成功：发送请求

            //请求要带入的数据
	    			let obj = {
		    			"title":this.title,
			    		"tab":tab,
			    		"content":this.content,
			    		"accesstoken":this.$cookie.get('loginId')
		    		};

		    		this.editTopics(obj);//同步修改store数据

            //加载中...
            const loading = this.$loading({
              lock: true,
              text: '数据发送中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })

		    		this.topicsUpdate({//修改我的主题的请求
              "accesstoken":this.$cookie.get('loginId'),
              "topic_id":this.$route.params.id,

            }).then((data)=>{
              //关闭加载...效果
              loading.close();

              //跳出弹框提示修改成功
              this.$message({
                message: '修改主题成功！！！',
                type: 'success',
                duration:1000//持续一秒
              });

              this.clearParams();//清空输入框

              //修改成功 返回到被修改完的主题的详情页
              this.$router.push({
                path:'/topic/'+data.data.topic_id
              });

            });


	    		}

	    	},
        editMyTopic(params){
	    	  this.title = params.title;
	    	  this.tab = params.tab;
	    	  this.content = params.content;
        }
	    },
      beforeMount(){//挂载之前，默认显示的内容：title，tab，content
	      console.log(this.conPage);

	      let {title,tab,content} = this.conPage;

        tab = this.createTopicList.filter(v=>{
          return v.name == tab;
        })[0].title;

	      let params = {
	        "title":title,
          "tab":tab,
          "content":content
        }

        this.editMyTopic(params);
      }

	}
</script>

<style>


	.quill-editor{
		margin-top: 10px;
		height: 400px;
		overflow: hidden;
	}
	.ql-toolbar.ql-snow, .ql-container.ql-snow{
		border-color: #dcdfe6;
	}

</style>
