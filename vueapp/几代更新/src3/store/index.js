import Vue from 'vue'
import Vuex from 'vuex'
//请求数据
import axios from 'axios'

Vue.use(Vuex)

const config ={
  rootUrl:'https://cnodejs.org/api/v1',
  topics:'/topics',
  topic:'/topic'
}

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
        path:'handler',
        id:Date.now()+Math.random()
      },
      {
        title:'API',
        path:'api',
        id:Date.now()+Math.random()
      },
      {
        title:'关于',
        path:'about',
        id:Date.now()+Math.random()
      },
      {
        title:'注册',
        path:'/',
        id:Date.now()+Math.random()
      },
      {
        title:'登录',
        path:'/',
        id:Date.now()+Math.random()
      }
    ],//页面的头部导航
    homeNav:[
      {
        title:'全部',
        path:'?tab=all',
        id:Date.now()+Math.random()
      },
      {
        title:'精华',
        path:'/?tab=good',
        id:Date.now()+Math.random()
      },
      {
        title:'分享',
        path:'/?tab=share',
        id:Date.now()+Math.random()
      },
      {
        title:'问答',
        path:'/?tab=ask',
        id:Date.now()+Math.random()
      },
      {
        title:'招聘',
        path:'/?tab=job',
        id:Date.now()+Math.random()
      },
      {
        title:'客户端测试',
        path:'/?tab=user',
        id:Date.now()+Math.random()
      },
    ],//首页的导航
    homeContent:[],//首页内容：axiox请求
    homeContentLoading:false,
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
        asideUser:[]//6、客户端
    },//侧边栏的内容数据
    conPage:null,//详情页数据
  },
  getters:{

  },
  mutations:{
    editHomeContent(state,list){//修改首页的内容
      state.homeContent = list;
    },
    editConPage(state,list){//修改详情页内容
      state.conPage = list;
    }
  },
  actions:{
    getHomeContent(context,params){//获取首页的内容

      let {rootUrl,topics} = config;//获取请求地址

      axios.get(rootUrl+topics,{
        params:{//请求带入的数据
          tab:params.tab
        }
      }).then(data=>{//请求成功的回调
        context.commit('editHomeContent',data.data.data);
        // console.log(context.state.homeContent);
      })
    },
    getConPage(context,id){
      let {rootUrl,topic} = config;//获取请求地址

      axios.get(rootUrl+topic+'/'+id).then(data=>{//请求成功的回调
        context.commit('editConPage',data.data.data);
        // console.log(context.state.conPage);
      })
    }
  }
})
