
import Vue from 'vue'
import Router from 'vue-router'
import NotFound from "../pages/root/NotFound.vue";
Vue.use(Router)

export default new Router({
    routes: [
        {
		    path: '/login',
		    name: 'login',
		    component: () => import('@/pages/login/login'),
		    replace: true,
		    meta : {
		        intercept : false ,
		        // 有无快速跳转标签
		        noQuickTabs : true ,
		        title: '主页',
                keepAlive: true, // 需要被缓存
                role : [ 5233 , 5232 , 5231 , 5230 ]
		    }
	    },
	    {
		    path: '/',
		    name: 'main',
		    component: () => import('@/pages/main/index'),
		    replace: true,
		    /** @type {Object} [重定向]
		    redirect : {
			    "name" : "home"
			} ,*/
		    meta : {
		    	icon: '',
		      	// 是否需要拦截
		      	// 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象,不设置这个如果跳转到没有设置过的路由会陷入死循环
		        intercept : false ,
		        // 有无快速跳转标签
		        noQuickTabs : true ,
		        title: '主页',
                keepAlive: true, // 需要被缓存
                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
                role : [ 5233 , 5232 , 5231 , 5230 ]
		    },
		    children: [
			    {
				    path: 'home',
				    name: 'home',
				    component: () => import('@/pages/main/home/home'),
				    replace: false,
				    /** @type {Object} [重定向]
				    redirect : {
					    "name" : "home"
					} ,*/
				    meta : {
				      	// 是否需要拦截 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象
				        intercept : false ,
				        // 有无快速跳转标签
				        noQuickTabs : true ,
				        title: '主页',
		                keepAlive: true, // 需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
				    path: 'order',
				    name: 'order',
				    component: () => import('@/pages/main/order/order'),
				    replace: false,
				    /** @type {Object} [重定向]
				    redirect : {
					    "name" : "home"
					} ,*/
				    meta : {
				      	// 是否需要拦截 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象
				        intercept : false ,
				        // 是否从详情页面回退到列表页面，控制是否刷新数据
				        isBack: false,
				        // 有无快速跳转标签
				        noQuickTabs : true ,
				        title: '施工单列表',
		                keepAlive: true, // 需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
				    path: 'construction/:id',
				    name: 'construction',
				    component: () => import('@/pages/main/order/construction'),
				    replace: false,
				    /** @type {Object} [重定向]
				    redirect : {
					    "name" : "home"
					} ,*/
				    meta : {
				      	// 是否需要拦截 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象
				        intercept : false ,
				        // 有无快速跳转标签
				        noQuickTabs : true ,
				        title: '施工单详情',
		                keepAlive: false, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
				    path: 'chart',
				    name: 'chart',
				    component: () => import('@/pages/main/chart/Echarts1'),
				    replace: false,
				    /** @type {Object} [重定向]
				    redirect : {
					    "name" : "home"
					} ,*/
				    meta : {
				      	// 是否需要拦截 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象
				        intercept : false ,
				        // 有无快速跳转标签
				        noQuickTabs : true ,
				        title: '数据报表',
		                keepAlive: false, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
				    path: 'mine',
				    name: 'mine',
				    component: () => import('@/pages/main/mine/mine'),
				    replace: false,
				    /** @type {Object} [重定向]
				    redirect : {
					    "name" : "home"
					} ,*/
				    meta : {
				      	// 是否需要拦截 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象
				        intercept : false ,
				        // 有无快速跳转标签
				        noQuickTabs : true ,
				        title: '我的',
		                keepAlive: false, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
				    path: 'message/list',
				    name: 'messageList',
				    component: () => import('@/pages/main/message/list'),
				    replace: false,
				    /** @type {Object} [重定向]
				    redirect : {
					    "name" : "home"
					} ,*/
				    meta : {
				      	// 是否需要拦截 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象
				        intercept : false ,
				        // 有无快速跳转标签
				        noQuickTabs : true ,
				        title: '消息列表',
		                keepAlive: true, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
				    path: 'message/detail/:id',
				    name: 'messageDetail',
				    component: () => import('@/pages/main/message/detail'),
				    replace: false,
				    /** @type {Object} [重定向]
				    redirect : {
					    "name" : "home"
					} ,*/
				    meta : {
				      	// 是否需要拦截 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象
				        intercept : false ,
				        // 有无快速跳转标签
				        noQuickTabs : true ,
				        title: '消息详情',
		                keepAlive: true, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				}
		    ]
	    },
	    {
		    path: '/root',
		    name: 'root',
		    component: () => import('@/pages/root/main'),
		    replace: true,
		    /** @type {Object} [重定向]
		    redirect : {
			    "name" : "home"
			} ,*/
		    meta : {
		      	// 是否需要拦截 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象
		        intercept : false ,
		        // 有无快速跳转标签
		        noQuickTabs : true ,
		        title: '主页',
                keepAlive: true, // 需要被缓存
                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
                role : [ 5233 , 5232 , 5231 , 5230 ]
		    },

	    },
	    {
		    path: '/404',
		    name: '404',
		    component: () => import('@/pages/root/NotFound'),
		    replace: true,
		    /** @type {Object} [重定向]
		    redirect : {
			    "name" : "home"
			} ,*/
		    meta : {
		        intercept : false ,
		        // 有无快速跳转标签
		        noQuickTabs : true ,
		        title: '主页',
                keepAlive: true, // 需要被缓存
                role : [ 5233 , 5232 , 5231 , 5230 ]
		    }
	    },
		// 所有未定义路由，全部重定向到404页，必须放在最后
		{
		    path: '*',
		    redirect: '/404',
		    replace: true,
		    meta: {
		    	itercept: false
		    }
		}
    ]
})
