import Vue from 'vue'
 /*
 *  定义全局加载的组件
 *  Vue.component("mt", () => import("@/assets/Title"))
	Vue.component("mdb", () => import("@/assets/MyDisabledButton"))
	Vue.component("mi", () => import("@/assets/MyTooltipIcon"))
	import Fragment from "vue-fragment"
	Vue.use(Fragment.Plugin)
*/
import { Lazyload } from "vant";
Vue.use(Lazyload);