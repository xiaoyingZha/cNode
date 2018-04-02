import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import BodyHome from '@/components/body_home'
import BodyMessages from '@/components/body_messages'
import BodyHandler from '@/components/body_handler'
import BodyApi from '@/components/body_api'
import BodyAbout from '@/components/body_about'
import BodyLogin from '@/components/body_login'
import HomeConPage from '@/components/homeCon_page'//详情页组件
import CreateTopic from '@/components/create_topic'//创建话题的组件
import UpdateTopic from '@/components/update_topic'//编辑我的主题组件

export default new Router({
  routes:[
    {
      path:'/',
      name:'home',
      component:BodyHome,
    },
    {
      path:'/my/messages',
      name:'messages',
      component:BodyMessages
    },
    {
      path:'/handler',
      name:'handler',
      component:BodyHandler
    },
    {
      path:'/api',
      name:'api',
      component:BodyApi,
    },
    {
      path:'/about',
      name:'about',
      component:BodyAbout
    },
    {
      path:'/login',
      name:'login',
      component:BodyLogin
    },
    {
      path:'/out',
      redirect:'/'
    },
    {
    	path:'/topic/create',
    	name:'create',
    	component:CreateTopic
    },
    {
      path:'/topic/:id',
      name:'homeConPage',
      component:HomeConPage
    },
    {
      path:'/topic/:id/edit',
      name:'edit',
      component:UpdateTopic
    }
  ],
  scrollBehavior () { //设置跳转页面之后顶部所在的位置
    return { x: 0, y: 0 }
  }
})


