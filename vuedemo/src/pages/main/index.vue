<template>
  <div>
    <van-nav-bar
      :title="$route.meta.title"
      left-text="返回"
      :fixed = "isFixed"
      style = "background-color: white;"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"

    />

    <!-- 二级路由插槽 -->
    <router-view ></router-view>
    <!-- 标签栏支持路由模式，用于搭配vue-router使用。路由模式下会匹配页面路径和标签的to属性，并自动选中对应的标签 -->
    <van-tabbar route v-model="active" :active-color="otherInfo.iconActiveColor" :color="otherInfo.iconUnifiedStyleColor" >
      <van-tabbar-item icon="home-o" name="home" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="balance-list-o" name="order" to="/order">施工单</van-tabbar-item>
      <van-tabbar-item icon="chat-o" name="message/list" to="/message/list" >信息</van-tabbar-item>
      <van-tabbar-item icon="user-o" name="setting" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import axios from 'axios'
import { setLocal , getLocal , clearLocal, validator } from "@/function";
import { NavBar, Tabbar, TabbarItem, NoticeBar } from 'vant';
export default {
  mixins : [ require ( "@/mixins" ).default],
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem,
    "van-notice-bar": NoticeBar,
    'van-nav-bar': NavBar,
  },
  name: 'index',
  data () {
    return {
      isFixed: true,
      active: 0,
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
      // Toast('返回');
    },
    onClickRight() {
      // Toast('按钮');
    },
    clickItem( key ) {
      console.log( key );
    },



  },
  mounted () {
    /*console.log('配置信息')
    console.log(getLocal("userMemory"))
    console.log(getLocal("loginForm"))
    console.log(getLocal("historicalAccount"))
    console.log('store保存信息')
    console.log(this.userInfo)
    console.log(this.otherInfo)
    console.log(this.language)
    console.log(this.briefInfo)*/

  },

}
</script>
