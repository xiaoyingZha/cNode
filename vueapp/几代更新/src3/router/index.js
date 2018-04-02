import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import BodyHome from '@/components/body_home'
import BodyHandler from '@/components/body_handler'
import HomeConPage from '../components/homeCon_page'

export default new Router({
  routes:[
    {
      path:'/',
      name:'home',
      component:BodyHome,
    },
    {
      path:'/handler',
      name:'handler',
      component:BodyHandler
    },
    {
      path:'/topic/:id',
      name:'homeConPage',
      component:HomeConPage
    }

  ],
  scrollBehavior () { //设置跳转页面之后顶部所在的位置
    return { x: 0, y: 0 }
  }
})
