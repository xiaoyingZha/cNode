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
					<!--点击提交按钮，创建主题-->
					<el-button @click="send" style="margin-top: 20px;" type="primary">提交</el-button>
				</div>


		  </div>
		</el-card>
	  </el-main>
	  <el-aside width="350px" style="margin-top: 20px;">
      Markdown 语法参考
	  </el-aside>
	</el-container>

</template>

<script>
  //组件引入编辑器
  import markdownEditor from 'vue-simplemde/src/markdown-editor'

	import {mapState,mapMutations,mapActions} from 'vuex'
	export default {
	    name: "create_topic",
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
	    		'createTopicList'
	    	])
	    },
	    methods:{
	    	...mapMutations([
	    		'editTopics'//修改请求数据
	    	]),
	    	...mapActions([
	    		'sendCreateTopic'//创建主题的请求
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
	    			let obj = {
		    			"title":this.title,
			    		"tab":tab,
			    		"content":this.content,
			    		"accesstoken":this.$cookie.get('loginId')
		    		};

		    		this.editTopics(obj);//修改请求数据
		    		this.sendCreateTopic();//发送创建主题的请求
		    		this.$message({
		          message: '创建主题成功！！！',
		          type: 'success'
		        });
		    		this.clearParams();//清空输入框
	    		}

	    	}
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
