import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import all from '@/components/all'
import good from '@/components/good'
import share from '@/components/share'
import ask from '@/components/ask'
import job from '@/components/job'
import dev from '@/components/dev'
import page from '@/components/page'
import user_login from '@/components/user_login'
import topic from '@/components/topic'
import topic_update from '@/components/topic_update'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children:[
        {
          path:'all/:page',
          name:'all',
          component:all
        },
        {
          path:'good/:page',
          name:'good',
          component:good
        },{
          path:'share/:page',
          name:'share',
          component:share
        },{
          path:'ask/:page',
          name:'ask',
          component:ask
        },{
          path:'job/:page',
          name:'job',
          component:job
        },{
          path:'dev/:page',
          name:'dev',
          component:dev
        },{
          path:'page/:id',
          name:'page',
          component:page
        },{
          path:'login',
          name:'user_login',
          component:user_login
        },{
          path:'topic/:name',
          name:'topic',
          component:topic
        },{
          path:'topic/:name/:id',
          name:'topic_update',
          component:topic_update
        },
        {path:"all",redirect:"all/1"},
        {path:"good",redirect:"good/1"},
        {path:"share",redirect:"share/1"},
        {path:"ask",redirect:"ask/1"},
        {path:"job",redirect:"job/1"},
        {path:"dev",redirect:"dev/1"},
        {path:"/",redirect:"all/1"}, //path里面写的是name值
      ]
    }
  ],
  scrollBehavior () { //设置跳转页面之后顶部所在的位置
    return { x: 0, y: 0 }
  }
})
