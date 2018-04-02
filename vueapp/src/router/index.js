import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import BodyHome from '@/components/body_home'
import BodyUser from '@/components/body_user'
import BodyMessages from '@/components/body_messages'
import BodyHandler from '@/components/body_handler'
import BodyApi from '@/components/body_api'
import BodyAbout from '@/components/body_about'
import BodyLogin from '@/components/body_login'
import BodySetting from '@/components/body_setting'
import HomeConPage from '@/components/homeCon_page'//详情页组件
import CreateTopic from '@/components/create_topic'//创建话题的组件
import UpdateTopic from '@/components/update_topic'//编辑我的主题组件

export default new Router({
  routes:[
    {//首页 页面
      path:'/',
      name:'home',
      component:BodyHome,
    },
    {//退出 返回首页页面
      path:'/out',
      redirect:'/'
    },
    {
     path:'/user/:id',
      name:'user',
      component:BodyUser
    },
    {//消息 页面
      path:'/my/messages',
      name:'messages',
      component:BodyMessages
    },
    {//新手入门 页面
      path:'/handler',
      name:'handler',
      component:BodyHandler
    },
    {//api 页面
      path:'/api',
      name:'api',
      component:BodyApi,
    },
    {//关于 页面
      path:'/about',
      name:'about',
      component:BodyAbout
    },
    {//设置 页面
      path:'/setting',
      name:'setting',
      component:BodySetting
    },
    {//登录 页面
      path:'/login',
      name:'login',
      component:BodyLogin
    },
    {//创建主题
    	path:'/topic/create',
    	name:'create',
    	component:CreateTopic
    },
    {//详情页
      path:'/topic/:id',
      name:'homeConPage',
      component:HomeConPage
    },
    {//修改我的主题
      path:'/topic/:id/edit',
      name:'edit',
      component:UpdateTopic
    }
  ],
  scrollBehavior () { //设置跳转页面之后顶部所在的位置
    return { x: 0, y: 0 }
  }
})


