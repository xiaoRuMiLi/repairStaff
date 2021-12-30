import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import List from '@/pages/List'

Vue.use(Router)

export default new Router({
 // mode: 'history',
  mode : 'hash' ,
  base : process.env.BASE_URL ,
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/list',
      name: 'list',
      replace : true ,
      component: List,
      meta : {
          intercept : false ,
          noQuickTabs : true ,
      }
    },
    {
      path : '/login' ,
      name : 'login' ,
      replace : true ,
      component : () => import('@/views/welcome/AdminLogin') ,
      meta : {
          // 是否需要拦截 如果为真跳转到该路由需要守卫拦截
          intercept : false ,
          // 有无快速跳转标签
          noQuickTabs : true ,
      }
    },
     {
        path : '/' ,
        redirect : { name : "login" } ,
        replace : true ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    } ,
    {
        path : '*' ,
        redirect : { name : "ready" } ,
        replace : true ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    } ,
    {
        path : '/404' ,
        name : '404' ,
        replace : true ,
        component : () => import('@/views/welcome/404') ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    },
    {
        path : '/home' ,
        name : 'home' ,
        replace : true ,
        component : () => import('@/views/welcome/Home') ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    },
    {
        path : '/main' ,
        name : 'main' ,
        replace : true ,
        component : () => import('@/views/welcome/Main') ,
        meta : {
            intercept : false ,
            noQuickTabs : true ,
        }
    },
    {
      path : '/advertise' ,
      name : 'advertise' ,
      replace : true ,
      component : () => import('@/pages/advertise') ,
      meta : {
          // 是否需要拦截 如果为真跳转到该路由需要守卫拦截
          intercept : false ,
          // 有无快速跳转标签
          noQuickTabs : true ,
      }
    },
    {
      path : '/product' ,
      name : 'product' ,
      replace : true ,
      component : () => import('@/pages/product') ,
      meta : {
          // 是否需要拦截 如果为真跳转到该路由需要守卫拦截
          intercept : false ,
          // 有无快速跳转标签
          noQuickTabs : true ,
      }
    }
  ]
})
