import Vue from 'vue'
import Vuex from 'vuex'
//请求数据
import axios from 'axios'

Vue.use(Vuex)

const config ={
  rootUrl:'https://cnodejs.org/api/v1',
  topics:'/topics', //请求首页
  topic:'/topic',   //请求详情页
  loginName:'/user', //请求登陆信息：'/user/:loginname'
  update:'/topics/update',//编辑自己的主题内容
  collect:'/topic_collect/collect',//收藏主题
  deCollect:'/topic_collect/de_collect',//取消收藏
  userCollect:'/topic_collect/',//用户所收藏的主题  /topic_collect/:loginname
  replies:'/replies',//新建评论  '/topic/:topic_id/replies'
  messageCount:'/message/count',//获取未读取消息数
  messages:'/messages'//获取已读和未读消息
}
//227835ca-b29f-49e4-85f3-4b734d139647我的Access Token
export default new Vuex.Store({
  state:{
    headNav:[
      {
        title:'首页',
        path:'/',
        id:Date.now()+Math.random()
      },
      {
        title:'新手入门',
        path:'/handler',
        id:Date.now()+Math.random()
      },
      {
        title:'API',
        path:'/api',
        id:Date.now()+Math.random()
      },
      {
        title:'关于',
        path:'/about',
        id:Date.now()+Math.random()
      },
      {
        title:'注册',
        path:'/sign',
        id:Date.now()+Math.random()
      },
      {
        title:'登录',
        path:'/login',
        id:Date.now()+Math.random()
      }
    ],//页面头部未登录状态显示的导航
    loginHeadNav:[//页面头部登录状态显示的导航
      {
        title:'首页',
        path:'/',
        id:Date.now()+Math.random()
      },
      {
        title:'未读消息',
        path:'/my/messages',
        id:Date.now()+Math.random()
      },
      {
        title:'新手入门',
        path:'/handler',
        id:Date.now()+Math.random()
      },
      {
        title:'API',
        path:'/api',
        id:Date.now()+Math.random()
      },
      {
        title:'关于',
        path:'/about',
        id:Date.now()+Math.random()
      },
      {
        title:'设置',
        path:'/setting',
        id:Date.now()+Math.random()
      },
      {
        title:'退出',
        path:'/out',
        id:Date.now()+Math.random()
      }
    ],
    homeNav:[
      {
        title:'全部',
        path:'?tab=all',
        id:Date.now()+Math.random(),
        name:'all'
      },
      {
        title:'精华',
        path:'/?tab=good',
        id:Date.now()+Math.random(),
        name:'good'
      },
      {
        title:'分享',
        path:'/?tab=share',
        id:Date.now()+Math.random(),
        name:'share'
      },
      {
        title:'问答',
        path:'/?tab=ask',
        id:Date.now()+Math.random(),
        name:'ask'
      },
      {
        title:'招聘',
        path:'/?tab=job',
        id:Date.now()+Math.random(),
        name:'job'
      },
      {
        title:'客户端测试',
        path:'/?tab=dev',
        id:Date.now()+Math.random(),
        name:'dev'
      },
    ],//首页的导航
    homeContent:[],//首页内容：axiox请求
    homeTab:'all',
    homePageNum:1,//首页请求的页码
    asideContent:{//侧边栏的内容
        asideCnode:{
          title:'CNode：Node.js专业中文社区'
        },//1、cnode
        asideAd:[],//2、广告
        asideNobody:[//3、无人回复
          'later定时任务失败',
          'guagua',
          '用 express，在 chrome 开发者工具',
          '使用eoLinker进行API接口自动化测试——高级模式（代码',
          '一个支持两种代理的单服务器机场前端'
        ],
        asideTop:[],//4、积分榜
        asideLink:[],//5、友情链接
        asideUser:[],//6、客户端
        asideAbout:{//7、关于
          title:'关于',
          text:'CNode：Node.js专业中文社区',
          list:['向别人提出你遇到的问题',
                '帮助遇到问题的人',
                '分享自己的知识',
                '和其它人一起进步'
          ]
        },
    },//侧边栏的内容数据
    conPage:null,//详情页数据
    conPageReplies:null,//详情页的评论
    userInfoMock:{//模拟发送用户名及密码查对信息
      username:'xiaoyingzha',//存储的都是小写字母，验证时转小写
      password:'zxy371122'
    },
    loginInfo:null,//请求返回的用户信息
    loginState:false,//登录状态
    createTopicList:[//创建话题时的选择话题项
    	{
    		title:'分享',
    		name:'share'
    	},
    	{
    		title:'问答',
    		name:'ask'
    	},
    	{
    		title:'招聘',
    		name:'job'
    	},
    	{
    		title:'客户端测试',
    		name:'dev'
    	},
    ],
		topics:{//存储新建主体接收的参数：标题、类型、内容、及accessToken
			"title":"",
			"tab":"dev",//创建话题的类型，默认为dev
			"content":"",
			"accesstoken":""
		},
    userCollect:null,// 用户所收藏的主题
    messageCount:0,//未读取消息的数量
    messagesRead:null,//已读消息
    messagesUnread:null,//未读消息
    accessToken:'227835ca-b29f-49e4-85f3-4b734d139647',//cookie值
  },
  getters:{//呀。。。没有用到呀

  },
  mutations:{//修改state的属性的方法（同步）
    editHomeTab(state,tab){//修改首页请求的页码
      state.homeTab = tab;
    },
    editHomePageNum(state,num){//修改首页请求的页码
      state.homePageNum = num;
    },
    editHomeContent(state,list){//修改首页的内容
      state.homeContent = list;
    },
    editConPage(state,list){//修改详情页内容
      state.conPage = list;
      state.conPageReplies = list.replies.map((v,i)=>{
        v.lou = i+1;//创建楼层
        return v;
      });//详情页的评论
    },
    editLoginInfo(state,data){//修改用户信息
      state.loginInfo = data;
      state.loginState = true;//登录了就修改登录状态为true
    },
		editTopics(state,params){//修改创建的话题类型
			Object.assign(state.topics,params);
			/*params参数,是一个对象
			 * 属性包含:title、tab、content、accesstoken
			 * */
		},
    editUserCollect(state,data){
      state.userCollect = data;
    },
    editMessageCount(state,num){//修改未读取消息的数量
      state.messageCount = num;
    },
    editMessages(state,data){//修改 已读和未读消息
      // console.log(data);
      state.messagesRead = data.hasnot_read_messages;
      state.messagesUnread = data.has_read_messages;
    }
  },
  actions:{//异步请求，操作mutations里的方法，修改state里的属性
    getHomeContent(context){//请求首页的内容

      let {rootUrl,topics} = config;//获取请求地址

      axios.get(rootUrl+topics,{
        params:{//请求带入的数据
          tab:context.state.homeTab,
          page:context.state.homePageNum
        }
      }).then(data=>{//请求成功的回调
        context.commit('editHomeContent',data.data.data);
        // console.log(context.state.homeContent);
      })
    },
    getConPage(context,id){//请求详情页数据
      let {rootUrl,topic} = config;//获取请求地址

      return axios.get(rootUrl+topic+'/'+id).then(data=>{//请求成功的回调
        context.commit('editConPage',data.data.data);
           // console.log(context.state.conPage);
      });
    },
    getLoginInfo(context){//请求登陆信息
      let {rootUrl,loginName} = config;
      //请求用户信息axios.get(rootUrl+loginName+'/'+this.loginInfo.username)
      axios.get(rootUrl+loginName+'/'+context.state.userInfoMock.username).then(data=>{
        // console.log(data.data.data);
        context.commit('editLoginInfo',data.data.data);
      });
    },
    sendCreateTopic(context){//创建主题请求
    	let {rootUrl,topics} = config;

    	return axios.post(rootUrl+topics,context.state.topics);
    },
    topicsUpdate(context,params){//编辑主题(主题内容更新)
      let {rootUrl,update} = config;

      let paramsData = {//请求的带入数据
        "accesstoken":params.accesstoken,
        "topic_id":params.topic_id,
        "title":context.state.topics.title,//详情页的标题
        "content":context.state.topics.content,//详情页的内容
        "tab":context.state.topics.tab//详情页的分类标签
      }

      // 请求编辑详情页
      return axios.post(rootUrl+update,paramsData);

    },
    topicCollect(context,params){//请求收藏

      /*接收 post 参数
      * accesstoken String 用户的 accessToken
      * topic_id String 主题的id
      * */

      let {rootUrl,collect} = config;
      // console.log(params);
      return axios.post(rootUrl+collect,params);
    },
    callCollect(context,params){//取消收藏
      /*接收 post 参数
      * accesstoken String 用户的 accessToken
      * topic_id String 主题的id
      * */

      let {rootUrl,deCollect} = config;
      return axios.post(rootUrl+deCollect,params);
    },
    getUserCollect(context){//用户所收藏的主题
      let {rootUrl,userCollect} = config;
      //请求获取 用户所收藏的主题
      return axios.get(rootUrl+userCollect+context.state.userInfoMock.username).then(data=>{
        // console.log(data.data.data);
        context.commit('editUserCollect',data.data.data);
      });

    },
    createReplies(context,params){//创建评论
      let {rootUrl,topic,replies} = config;
      //参数：
      let paramsData ={
        accesstoken:params.accesstoken,//用户的accesstoken
        content:params.content,//回复内容
        reply_id:params.reply_id?params.reply_id:null//回复信息的id
      }
      let topic_id = params.topic_id;

      return axios.post(rootUrl+topic+'/'+topic_id+replies,paramsData).then(data=>{
        // 直接刷新当前详情页
        context.dispatch('getConPage',topic_id);
        // console.log(data);
      });


    },
    replyUp(context,params){//为评论点赞
      let {rootUrl} = config;
      let topic_id = params.topic_id;

      axios.post(`${rootUrl}/reply/${params.id}/ups`,{
        "accesstoken":params.accesstoken
      }).then(()=>{
        // 直接刷新当前详情页
        context.dispatch('getConPage',topic_id);
      });

    },
    getMessageCount(context,accesstoken){//获取未读消息数
      let {rootUrl,messageCount} = config;
      axios.get(rootUrl+messageCount,{
        params:{
          accesstoken:accesstoken
        }
      }).then(data=>{
        context.commit('editMessageCount',data.data.data);
        // console.log(context.state.messageCount)
      })
    },
    getMessages(context,accesstoken){//获取已读和未读消息
      let {rootUrl,messages} = config;
      axios.get(rootUrl+messages,{
        params:{
          "accesstoken":accesstoken,
          "mdrender":'true'
        }
      }).then(data=>{
        context.commit('editMessages',data.data.data);
      })
    }
  }
})
