// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/index.css'
import store from './store'
import './VuePrototype';
import './VueFilters';
/* 使用vue的时候，后台可能不能及时作出接口，那么就需要我们前端自己模拟数据，使用mockjs可以进行模拟数据。 */
// import './mock';
import { fetchPost, fetchGet } from './http';
import { setLocal , getLocal , clearLocal } from "@/function";
import './routeguard';
// import "./allcss.css"; // 饿了吗的样式库
// import "./font.css";
import BaseNavBar from "./components/BaseNavBar.vue";
import BaseTopTabs from "./components/BaseTopTabs.vue";
import './config/vant/vant.js'; // 全局调用的组件定义
import './config/css/global.css';
import JhRefreshView from "./components/JhRefreshView/index.vue";// 下拉刷新控制
// import BaseRefreshView from "./components/BaseRefreshView.vue";
import BaiduMap from 'vue-baidu-map';
import vuescroll from 'vuescroll';
//import { ConfigProvider } from 'vant';

//console.log("当前环境变量："+process.env.NODE_ENV) 和   console.log("当前环境路径："+process.env.VUE_APP_URL);
Vue.prototype.$Post = fetchPost
Vue.prototype.$Get = fetchGet
Vue.component('BaseNavBar', BaseNavBar)
Vue.component('BaseTopTabs', BaseTopTabs)
Vue.component('JhRefreshView', JhRefreshView)
// Vue.component('BaseRefreshView', BaseRefreshView)

Vue.use(vuescroll);
Vue.use(BaiduMap, {
  ak: ''  //  在此输入你自己的百度地图ak
})
Vue.config.productionTip = false
/* eslint-disable no-new */
/* 读取localstage 数据到store */
let userMemory = getLocal("userMemory");
//console.log('userMemory is true: ', Vue.$isTrue(userMemory));
if (userMemory) {  
    store.dispatch ( "upVuex" , {
        mutations : "setOtherInfo" ,
        value : userMemory.otherInfo
    } );
    store.dispatch ( "upVuex" , {
        mutations : "setUserInfo" ,
        value : userMemory.userInfo
    } );
    store.dispatch ( "upVuex" , {
        mutations : "setBriefInfo" ,
        value : userMemory.briefInfo // 简要信息
    } );
    store.dispatch ( "upVuex" , {
        mutations : "setLanguage" ,
        value : userMemory.language // 简要信息
    } );
} 
     
new Vue({
  el: '#app',
  router,
  store, // 需要使用store 需要在这里加入到配置中，要不然this.$store 提示为undefined
  components: { App },
  template: '<App/>'
})
