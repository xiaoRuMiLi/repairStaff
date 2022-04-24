// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './VuePrototype';
import './VueComponent';
import './VueFilters';
/* 使用vue的时候，后台可能不能及时作出接口，那么就需要我们前端自己模拟数据，使用mockjs可以进行模拟数据。 */
import './mock';
import { fetchPost, fetchGet } from './http';
import './routeguard';
import "./allcss.css";
import "./font.css";
Vue.prototype.$Post = fetchPost
Vue.prototype.$Get = fetchGet
// 全局注册使用 import *** from '@'  @ 表示根路劲。相当于src ,vue在webpack.base.conf.js文件中有配置
// vuex 使用方法 参考 https://blog.csdn.net/qq_43363884/article/details/95948884
Vue.use(ElementUI, { size: 'mini', zIndex: 1023 })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
