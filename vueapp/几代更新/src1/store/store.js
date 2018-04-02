import Vue from 'vue';
import Vuex from 'vuex';
import $ from 'jquery';

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    title:'这是app标题！',
    id:100,
    homeTitle:'This is home page',
    total:0,
    count:5,
    start:0,
    books:[],
    q:'',
    mails:[
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
    ]
  },
  getters:{
    pageNum(state){
      return Math.ceil(state.total/state.count);
    },
    unread(state){
      return state.mails.filter(v=>!v.readyState);
    },
    readed(state){
      return state.mails.filter(v=>v.readyState);
    }

  },
  mutations:{
    editTitle(state,newTitle){
      state.title = newTitle;
    },
    changePageNum(state,params){
      //不清楚用户修改了多少条数据时  就通过合并的方式修改内容
      Object.assign(state,params);

    },
    editTotal(state,num){
      state.total = num;
    },
    editQ(state,q){
      state.q = q;
    },
    editStart(state,start){
      state.start = start;
    },
    updateBooks(state,params){
      state.books = params.newBooks;
      state.start = params.start;
      state.count = params.count;
      state.total = params.total;
    }
  },
  actions:{
    getBooks(context,params){
      $.ajax({
        url:"https://api.douban.com/v2/book/search",
        type:"get",
        data:{
          q:context.state.q,
          start:context.state.start,
          count:context.state.count
        },
        dataType:"jsonp",
        success:(data)=>{

          //[count,total,start,books]
          context.commit('updateBooks',{
            start:data.start,
            count:data.count,
            total:data.total,
            newBooks:data.books,
          });
        }
      });
    }
  }
})
