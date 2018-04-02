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
      // {
      //   title:'退出',
      //   path:'/out',
      //   id:Date.now()+Math.random()
      // }
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
      username:'xiaoyingZha',//存储的都是小写字母，验证时转小写
      password:'zxy371122'
    },
    loginInfo:null,//请求返回的登录用户信息
    userIndexInfo:{},//用户主页 信息
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
    //api数据
    apiData:{
      text:'以下 api 路径均以 <a href="#">https://cnodejs.org/api/v1</a> 为前缀',
      contentList:{
        topic:{
          title:'主题',
          list:[
            {
              subTitle:'get /topics 主题首页',
              type:'接收 get 参数',
              subList:[
                'page Number 页数',
                'tab String 主题分类。目前有 ask share job good',
                'limit Number 每一页的主题数量',
                'mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。'
              ],
              example:'示例：<a href="#">/api/v1/topics</a>'
            },
            {
              subTitle:'get /topic/:id 主题详情',
              type:'接收 get 参数',
              subList:[
                'mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。',
                'accesstoken String 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 is_collect 以及 replies 列表中的 is_uped 值。'
              ],
              example:'示例：<a href="#">/api/v1/topic/5433d5e4e737cbe96dcef312</a>'
            },
            {
              subTitle:'post /topics 新建主题',
              type:'接收 post 参数',
              subList:[
                'accesstoken String 用户的 accessToken',
                'title String 标题',
                'tab String 目前有 ask share job dev。开发新客户端的同学，请务必将你们的测试帖发在 dev 专区，以免污染日常的版面，否则会进行封号一周处理。',
                'content String 主体内容'
              ],
              example:'返回值示例<p>{success: true, topic_id: \'5433d5e4e737cbe96dcef312\'}</p>'
            },
            {
              subTitle:'post /topics/update 编辑主题',
              type:'接收 post 参数',
              subList:[
                'accesstoken String 用户的 accessToken',
                'topic_id String 主题id',
                'title String 标题',
                'tab String 目前有 ask share job ',
                'content String 主体内容'
              ],
              example:'返回值示例<p>{success: true, topic_id: \'5433d5e4e737cbe96dcef312\'}</p>'
            }
          ],

        },
        topicCollect:{
          title:'主题收藏',
          list:[
            {
              subTitle:'post /topic_collect/collect 收藏主题',
              type:'接收 post 参数',
              subList:[
                'accesstoken String 用户的 accessToken',
                'topic_id String 主题的id'
              ],
              example:'返回值示例：<p>{"success": true}</p>'
            },
            {
              subTitle:'post /topic_collect/de_collect 取消主题',
              type:'接收 post 参数',
              subList:[
                'accesstoken String 用户的 accessToken',
                'topic_id String 主题的id'
              ],
              example:'返回值示例：<p>{"success": true}</p>'
            },
            {
              subTitle:'get /topic_collect/:loginname 用户所收藏的主题',
              example:'示例：<a href="#">/api/v1/topic_collect/alsotang</a>'
            },
          ]
        },
        replies:{
          title:'评论',
          list:[
            {
              subTitle:'post /topic/:topic_id/replies 新建评论',
              type:'接收 post 参数',
              subList:[
                'accesstoken String 用户的 accessToken',
                'content String 评论的主体',
                'reply_id String 如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图。'
              ],
              example:'返回值示例：<p>{success: true, reply_id: \'5433d5e4e737cbe96dcef312\'}</p>'
            },
            {
              subTitle:'post /reply/:reply_id/ups 为评论点赞',
              type:'接收 post 参数',
              subList:[
                'accesstoken String '
              ],
              example:'<div>接口会自动判断用户是否已点赞，如果否，则点赞；如果是，则取消点赞。点赞的动作反应在返回数据的 action 字段中，up or down。</div>返回值示例：<p>{success: true, reply_id: \'5433d5e4e737cbe96dcef312\'}</p>'
            }
          ]
        },
        user:{
          title:'用户',
          list:[
            {
              subTitle:'get /user/:loginname 用户详情',
              example:'示例：<a href="#">/api/v1/user/alsotang</a>'
            },
            {
              subTitle:'post /accesstoken 验证 accessToken 的正确性',
              type:'接收 post 参数',
              subList:[
                'accesstoken String 用户的 accessToken'
              ],
              example:`<div>如果成功匹配上用户，返回成功信息。否则 403</div>
                      返回值示例：
                      <p>{success: true, loginname: req.user.loginname, id: req.user.id, avatar_url: req.user.avatar_url}</p>`
            },
          ]
        },
        message:{
          title:'消息通知',
          list:[
            {
              subTitle:'get /message/count 获取未读消息数',
              type:'接收 get 参数',
              subList:[
                'accesstoken String '
              ],
              example:`返回值示例：<p>{ data: 3 }</p>`
            },
            {
              subTitle:'get /messages 获取已读和未读消息',
              type:'接收 get 参数',
              subList:[
                'accesstoken String ',
                'mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。'
              ],
              example:`返回值示例：<p>
                                    {
                                      data: {
                                        has_read_messages: [],
                                        hasnot_read_messages: [
                                          {
                                            id: "543fb7abae523bbc80412b26",
                                            type: "at",
                                            has_read: false,
                                            author: {
                                              loginname: "alsotang",
                                              avatar_url: "https://avatars.githubusercontent.com/u/1147375?v=2"
                                            },
                                            topic: {
                                              id: "542d6ecb9ecb3db94b2b3d0f",
                                              title: "adfadfadfasdf",
                                              last_reply_at: "2014-10-18T07:47:22.563Z"
                                            },
                                            reply: {
                                              id: "543fb7abae523bbc80412b24",
                                              content: "[@alsotang](/user/alsotang) 哈哈",
                                              ups: [ ],
                                              create_at: "2014-10-16T12:18:51.566Z"
                                              }
                                            },
                                        ...
                                        ]
                                      }
                                    }
                                  </p>`
            },
            {
              subTitle:'post /message/mark_all 标记全部已读',
              type:'接收 post 参数',
              subList:[
                'accesstoken String '
              ],
              example:`返回值示例：<p>{ success: true,
                                     marked_msgs: [ { id: '544ce385aeaeb5931556c6f9' } ]
                                  }</p>`
            },
            {
              subTitle:'post /message/mark_one/:msg_id 标记单个消息为已读',
              type:'接收 post 参数',
              subList:[
                'accesstoken String '
              ],
              example:`返回值示例：<p>{
                                success: true,
                                marked_msg_id: "58ec7d39da8344a81eee0c14"
                              }</p>`
            },
          ]
        }
      },
      accesstoken:{
        title:'知识点',
        list:['如何获取 accessToken？ 用户登录后，在设置页面可以看到自己的 accessToken。 建议各移动端应用使用手机扫码的形式登录，验证使用 /accesstoken 接口，登录后长期保存 accessToken。']
      }
    },
    // node.js 数据
    nodeData:[
      {
        title:'Node.js 入门',
        list:[
          {
            h4:'《快速搭建 Node.js 开发环境以及加速 npm》',
            link:'http://fengmk2.com/blog/2014/03/node-env-and-faster-npm.html'
          },
          {
            h4:'《Node.js 包教不包会》',
            link:'https://github.com/alsotang/node-lessons'
          },
          {
            h4:'《ECMAScript 6入门》',
            link:'http://es6.ruanyifeng.com/'
          },
          {
            h4:'《七天学会NodeJS》',
            link:'https://github.com/nqdeng/7-days-nodejs'
          }
        ]
      },
      {
        title:'Node.js 资源',
        list:[
          {
            h4:'《前端资源教程》',
            link:'https://cnodejs.org/topic/56ef3edd532839c33a99d00e'
          },
          {
            h4:'《国内的 npm 镜像源》',
            link:'http://cnpmjs.org/'
          },
          {
            h4:'《node weekly》',
            link:'http://nodeweekly.com/issues'
          },
          {
            h4:'《node123-node.js中文资料导航》',
            link:'https://github.com/youyudehexie/node123'
          },
          {
            h4:'《A curated list of delightful Node.js packages and resources》',
            link:'https://github.com/sindresorhus/awesome-nodejs'
          },
          {
            h4:'《Node.js Books》',
            link:'https://github.com/pana/node-books'
          }
        ]
      },
      {
        title:'Node.js 名人',
        list:[
          {
            h4:'《名人堂》',
            link:'https://github.com/cnodejs/nodeclub/wiki/名人堂'
          }
        ]
      },
      {
        title:'Node.js 服务器',
        list:[
          {
            h4:'',
            text:'新手搭建 Node.js 服务器，推荐使用无需备案的',
            link:'DigitalOcean(https://www.digitalocean.com/)'
          }
        ]
      }
    ],
    //about 数据
    aboutData:{
      content:`<div class="markdown-text">
                  <h3>关于</h3>
                  <p>CNode 社区为国内最大最具影响力的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
                  <p>CNode 社区由一批热爱 Node.js 技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对 Node.js 感兴趣的朋友。</p>
                  <p>CNode 的 SLA 保证是，一个9，即 90.000000%。</p>
                  <p>社区目前由 <a href="http://cnodejs.org/user/alsotang" target="_blank">@alsotang</a> 在维护，有问题请联系：<a href="https://github.com/alsotang" target="_blank">https://github.com/alsotang</a></p>
                  <p>请关注我们的官方微博：<a href="http://weibo.com/cnodejs" target="_blank">http://weibo.com/cnodejs</a></p>
                  <h3>移动客户端</h3>
                  <p>客户端由 <a href="https://cnodejs.org/user/soliury" target="_blank">@soliury</a> 开发维护。</p>
                  <p>源码地址： <a href="https://github.com/soliury/noder-react-native" target="_blank">https://github.com/soliury/noder-react-native</a> 。</p>
                  <p>立即体验 CNode 客户端，直接扫描页面右侧二维码。</p>
                  <p>另，安卓用户同时可选择：<a href="https://github.com/TakWolf/CNode-Material-Design" target="_blank">https://github.com/TakWolf/CNode-Material-Design</a> ，这是 Java 原生开发的安卓客户端。</p>
                </div>
                <div class="about-friend-links">
                  <h3>友情链接</h3>
                  <a href="https://www.huoban.com/" target="_blank">
                    <img src="//dn-cnode.qbox.me/Ftmw28ed0I_rir7YYz3c_jVPkCGx">
                  </a>
                  <a href="http://100offer.com/" target="_blank">
                    <img src="//dn-cnode.qbox.me/FmU1Ik57z6wrl9JDTNdcYBTDetFq">
                  </a>
                  <a href="https://www.teambition.com/" target="_blank">
                    <img src="//dn-cnode.qbox.me/FkMR_SqpCp4Q0eDIaWrQlALiXdmP">
                  </a>
                  <a href="http://yunzhihui.com/" target="_blank">
                    <img src="//dn-cnode.qbox.me/Fq2cV_14IFHwelZ-6jey42Z0-eOR">
                  </a>
                  <a href="http://www.jiguang.cn/" target="_blank">
                    <img src="//dn-cnode.qbox.me/FijGJbij9GObh5AXw-Vyu5LGn08a">
                  </a>
                  <a href="http://segmentfault.com/" target="_blank">
                    <img src="//o4j806krb.qnssl.com/public/images/temp/sf.png">
                  </a>
                  <a href="http://ionichina.com/" target="_blank">
                    <img src="//o4j806krb.qnssl.com/public/images/temp/ionichina.png">
                  </a>
              </div>
              <div class="">
                <h3>LOGO</h3>
                <p>
                  白底： <a href="/public/images/cnodejs.svg" target="_blank">/public/images/cnodejs.svg</a>
                </p>
                <p>
                  黑底： <a href="/public/images/cnodejs_light.svg" target="_blank">/public/images/cnodejs_light.svg</a>
                </p>
              </div>`
    },
    // setting数据
    settingFormAlign:{//模拟 存储 设置页面的登录信息
      name:'',
      email:'',
      self:'',
      add:'',
      weibo:'',
      git:'',
      signature:''
    }
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
    },
    editSettingFormAlign(state,params){//修改 设置页面的登录信息
      state.settingFormAlign.name = state.userInfoMock.username;
      state.settingFormAlign.git = '@' + state.userInfoMock.username;
      Object.assign(state.settingFormAlign,params);
    },
    editUserIndexInfo(state,info){//修改用户主页信息
      state.userIndexInfo = info;
    }
  },
  actions:{//异步请求，操作mutations里的方法，修改state里的属性
    getHomeContent(context){//请求首页的内容

      let {rootUrl,topics} = config;//获取请求地址

      return axios.get(rootUrl+topics,{
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
    },
    getUserIndexInfo(context,id){
      let {rootUrl} = config;
      return axios.get(rootUrl+`/user/${id}`).then(data=>{
        // console.log(data)
        context.commit('editUserIndexInfo',data.data.data);
      })
    }
  }
})
