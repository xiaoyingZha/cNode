import Vue from 'vue'
import Router from 'vue-router'

import appHome from '../components/AppHome'
import appList from '../components/AppList'
import listEmail from '../components/ListEmail'
import listBooks from  '../components/ListBooks'
import appAbout from '@/components/AppAbout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app-home',
      component: appHome
    },
    {
      path: '/list',
      name: 'app-list',
      component: appList,
      children:[
        {
          path:'/list',
          redirect:'/list/email'
        },
        {
          path:'email',
          name:'list-email',
          component:listEmail
        },
        {
          path:'books',
          name:'list-books',
          component:listBooks
        }
      ]
    },
    {
      path: '/about',
      name: 'app-about',
      component: appAbout
    }
  ]
})
