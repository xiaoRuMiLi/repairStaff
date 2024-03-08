
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
		    path: '/login/email-verify',
		    name: 'email-verify',
		    component: () => import('@/pages/login/email-verify'),
		    replace: true,
		    meta : {
		        intercept : false ,
		        // 有无快速跳转标签
		        noQuickTabs : true ,
		        title: '主页',
                keepAlive: false, // 需要被缓存
                role : [ 5233 , 5232 , 5231 , 5230 ]
		    }
	    },
	    {
		    path: '/login/phone-verify',
		    name: 'phone-verify',
		    component: () => import('@/pages/login/phone-verify'),
		    replace: true,
		    meta : {
		        intercept : false ,
		        // 有无快速跳转标签
		        noQuickTabs : true ,
		        title: '主页',
                keepAlive: false, // 需要被缓存
                role : [ 5233 , 5232 , 5231 , 5230 ]
		    }
	    },
        {
		    path: '/login/enter-newpw',
		    name: 'enter-newpw',
		    component: () => import('@/pages/login/enter-newpw'),
		    replace: true,
		    meta : {
		        intercept : false ,
		        // 有无快速跳转标签
		        noQuickTabs : true ,
		        title: '主页',
                keepAlive: false, // 需要被缓存
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
		                keepAlive: false, // 需要被缓存
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
				    path: 'user-info',
				    name: 'user-info',
				    component: () => import('@/pages/main/mine/user-info'),
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
				        title: '账户信息',
		                keepAlive: false, // 不需要被缓存
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
				    path: 'mine/avatarset',
				    name: 'avatar-set',
				    component: () => import('@/pages/main/mine/avatar-set'),
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
				        title: '头像设置',
		                keepAlive: false, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
				    path: 'mine/performance',
				    name: 'performance',
				    component: () => import('@/pages/main/mine/performance'),
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
				        title: '绩效信息',
		                keepAlive: false, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
				    path: 'mine/opinion',
				    name: 'mine-opinion',
				    component: () => import('@/pages/main/mine/opinion-create'),
				    meta : {
				      	// 是否需要拦截 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象
				        intercept : false ,
				        // 有无快速跳转标签
				        noQuickTabs : true ,
				        title: '意见和建议',
		                keepAlive: false, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    }
					
				},
				{
					path: 'mine/construction-receive-config',
				    name: 'construction-receive-config',
				    component: () => import('@/pages/main/mine/construction-receive-config'),
				    meta : {
				      	// 是否需要拦截 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象
				        intercept : false ,
				        // 有无快速跳转标签
				        noQuickTabs : true ,
				        title: '接单参数信息',
		                keepAlive: false, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
					path: 'mine/store-construction-receive-config',
				    name: 'store-construction-receive-config',
				    component: () => import('@/pages/main/mine/store-construction-receive-config'),
				    meta : {
				      	// 是否需要拦截 如果为真跳转到该路由需要守卫拦截,可能会出现无法正常跳转的现象
				        intercept : false ,
				        // 有无快速跳转标签
				        noQuickTabs : true ,
				        title: '接单设置',
		                keepAlive: false, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
				    path: 'message/list',
				    name: 'message-list',
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
				    name: 'message-detail',
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
		                keepAlive: false, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				},
				{
				    path: 'message/create/:id',
				    name: 'message-create',
				    component: () => import('@/pages/main/message/create'),
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
		                keepAlive: false, // 不需要被缓存
		                // 页面查看需要的权限，如果userrole 是其中之一，那么守卫允许跳转到该页面，起作用首先intercept需要是true 守卫才会拦截
		                role : [ 5233 , 5232 , 5231 , 5230 ]
				    },
				}
		    ]
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
    ],
    // 去掉路由哈希中的井号
    mode: "history",
    // 这个配置也很重要，否则会出现页面空白情况
    // 设置base后每次都会在路由中加上/dist/， 例如 原来是http://localhost:8081/mine，增加后变为http://localhost:8081/dist/mine
    base: "",
})
