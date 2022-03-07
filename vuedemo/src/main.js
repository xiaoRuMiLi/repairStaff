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
import './routeguard';
// import "./allcss.css"; // 饿了吗的样式库
// import "./font.css";
import BaseNavBar from "./components/BaseNavBar.vue";
import BaseTopTabs from "./components/BaseTopTabs.vue";
import './config/vant/vant.js';
import './config/css/global.css';
import JhRefreshView from "./components/JhRefreshView/index.vue";
import BaseRefreshView from "./components/BaseRefreshView.vue";
import BaiduMap from 'vue-baidu-map';
import vuescroll from 'vuescroll';
import less from 'less';
//import { ConfigProvider } from 'vant';
// import './config/less/global.less';

// 配置文件挂载到Windows上//////////////////////////////////////////
window.CONFIG = {
	admin: require ( "./web-config/config-admin.json" ),
}
//console.log("当前环境变量："+process.env.NODE_ENV) 和   console.log("当前环境路径："+process.env.VUE_APP_URL);
Vue.prototype.$Post = fetchPost
Vue.prototype.$Get = fetchGet

Vue.component('BaseNavBar', BaseNavBar)
Vue.component('BaseTopTabs', BaseTopTabs)
Vue.component('JhRefreshView', JhRefreshView)
Vue.component('BaseRefreshView', BaseRefreshView)

Vue.use(vuescroll);
Vue.use(less)

Vue.use(BaiduMap, {
  ak: ''  //  在此输入你自己的百度地图ak
})
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
