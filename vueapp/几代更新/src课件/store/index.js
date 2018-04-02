import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


var config = {
  rootUrl:'https://cnodejs.org/api/v1',
  topics:'/topics', //列表请求地址
  topic:'/topic', //详情请求地址
  userinfos:'/user',
  update:'/topics/update'
};


export default new Vuex.Store({
  state:{
    list_of:"all",
    list:[],
    page:1,
    pageData:null, //单页数据
    pageContent:null, //单页具体内容
    pageReplies:null, //评论数据
    accessToken:'0931ef05-b58b-47b4-90ae-e0605a870ad7',
    userInfo:{
      username:'q80805050',
      password:'123456'
    },
    userInfos:null,
    logined:false,
    postContent:{
      title:'',
      tab:'dev',
      content:''
    },
    topic_id:''
  },
  getters:{},
  mutations:{
    editList(state,list){
      state.list = list;//修改数据库中的list内容
    },
    editListOf(state,name){
      state.list_of = name;
    },
    editPage(state,num){
      state.page = num;
    },
    editfullscreenLoading(state,bool){
      state.fullscreenLoading = bool;
    },
    editPageData(state,data){
      state.pageData = data;
      state.pageContent = data.content;
      state.pageReplies = data.replies;
    },
    editLogined(state,bool){
      state.logined = bool;
    },
    edituserInfos(state,infos){
      state.userInfos = infos;
    },
    editPostContent(state,postContent){
       Object.assign(state.postContent,postContent);
    },
    editTopicId(state,id){
      state.topic_id = id;
    }
  },
  actions:{
    sendContent(context,token){
      var {rootUrl,topics} = config;

      var postData = Object.assign(context.state.postContent,{"accesstoken":token});

      return axios.post(rootUrl+topics,postData);

    },
    getUserInfos(context){
      var {rootUrl,userinfos} = config;
      return axios.get(rootUrl+userinfos+'/'+context.state.userInfo.username)
        .then(data=>{
          console.log(data.data.data);
          context.commit('edituserInfos',data.data.data);
        });
    },
    getList(context){
      var {rootUrl,topics} = config;

      return axios.get(rootUrl+topics,{
        params:{
          tab:context.state.list_of,
          page:context.state.page
        }
      })
        .then(data=>{
          context.commit('editList',data.data.data);
        });
    },
    getData(context,params){
      var {rootUrl,topic} = config;

      return axios.get(rootUrl+topic+'/'+params.id,{
        params:{
          "mdrender":params.mdrender||"true"
        }
      })
        .then(data=>{
          context.commit('editPageData',data.data.data);
        });
    },
    updateData(context,params){
      var {rootUrl,update} = config;


      var data = {
        "accesstoken":params.token_id,
        "topic_id":params.topic_id,
        "title":context.state.postContent.title,
        "content":context.state.postContent.content,
        "tab":context.state.postContent.tab
      }

      return axios.post(rootUrl+update,data)
        .then(data=>{
          console.log(data.data);
          context.commit('editPageData',data.data);
        });
    }
  }
})
