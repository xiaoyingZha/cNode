import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    title:'This is my Vuex App',
    headList:[
      {
        title:'Home',
        path:'/',
        id:Date.now()+Math.random()
      },
      {
        title:'List',
        path:'/list',
        id:Date.now()+Math.random()
      },
      {
        title:'About',
        path:'/about',
        id:Date.now()+Math.random()
      }
    ],
    homeTitle:'这是Home主页----二级标题',
    aboutTitle:'About Us Web , Welcome...',
    list:[
      {
        title:'email',
        path:'/list/email',
        id:Date.now()+Math.random()
      },
      {
        title:'books',
        path:'/list/books',
        id:Date.now()+Math.random()
      }
    ],
    emails:[
      {
        id:'1',
        title:'明天去哪儿旅游？',
        readyState:false
      },
      {
        id:'2',
        title:'屋顶用的材料清单',
        readyState:true
      },
      {
        id:'3',
        title:'小狗生病了怎么办',
        readyState:false
      },
      {
        id:'4',
        title:'我的青蛙为什么不回家',
        readyState:true
      },
      {
        id:'5',
        title:'红烧牛蛙好吃吗？',
        readyState:true
      },
      {
        id:'6',
        title:'明年干啥子',
        readyState:false
      },
      {
        id:'7',
        title:'来自哪里的谁',
        readyState:true
      },
    ],
    listBooksTitle:'This is books list',
    q:'',
    total:0,
    start:0,
    count:10,
    books:[]
  },
  getters:{
    readed(state){
      return state.emails.filter((v)=>{
        return v.readyState;
      });
    },
    unread(state){
      return state.emails.filter((v)=>{
        return !v.readyState;
      });
    },
    pageNum(state){
      return Math.ceil(state.total/state.count);
    }
  },
  mutations:{
    editHomeTitle(state,newTitle){
      state.homeTitle = newTitle;
    },
    showBooks(state,params){
      Object.assign(state,params);
    },
    editQ(state,q){
      state.q = q;
    }
  },
  actions:{
    getBooks(context){
      $.ajax({
        url:'https://api.douban.com/v2/book/search',
        type:'get',
        data:{
          q:context.state.q,
          start:context.state.start,
          count:context.state.count
        },
        dataType:'jsonp',
        success(data){

          let obj = {};
          Object.assign(obj,data);
          context.commit('showBooks',obj);
        }
      })
    }
  }
})
