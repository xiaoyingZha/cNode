import Vue from 'vue'
import Router from 'vue-router'

import appHome from '@/components/AppHome'
import appAbout from '@/components/AppAbout'
import appList from '@/components/AppList'
import listEmail from '@/components/ListEmail'
import listBooks from '@/components/ListBooks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component:appHome
    },
    {
      path: '/list',
      name: 'list',
      component:appList,
      children:[
        {
          path:'email',
          name:'list_email',
          component:listEmail
        },
        {
          path:'books',
          name:'list_books',
          component:listBooks
        },
        {
          path:'/list',
          redirect:'email',
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component:appAbout
    },
    {
      path: '/',
      redirect:'/home'
    }
  ]
})
