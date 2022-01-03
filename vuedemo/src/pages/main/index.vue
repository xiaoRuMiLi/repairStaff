<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      :fixed = "isFixed"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 二级路由插槽 -->
    <router-view></router-view>
    <!-- 标签栏支持路由模式，用于搭配vue-router使用。路由模式下会匹配页面路径和标签的to属性，并自动选中对应的标签 -->
    <van-tabbar route v-model="active" :active-color="adminConfig.iconActiveColor" :color="adminConfig.iconUnifiedStyleColor" >
      <van-tabbar-item icon="home-o" name="home" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" name="search" to="/">数据报表</van-tabbar-item>
      <van-tabbar-item icon="friends-o" name="friend" to="/" >绩效</van-tabbar-item>
      <van-tabbar-item icon="setting-o" name="setting" to="/">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import axios from 'axios'
import { NavBar, Tabbar, TabbarItem, NoticeBar } from 'vant';
export default {
  mixins : [ require ( "@/mixins" ).default],
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem,
    "van-notice-bar": NoticeBar,
    'van-nav-bar': NavBar,
  },
  name: 'Remind',
  data () {
    return {
      active: "home",
      isFixed: true,
      active: 0,
      adminConfig: CONFIG.admin

    }


  },
  methods: {
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
    clickItem( key ) {
      console.log( key );
    },



  },
  mounted () {

  }
}
</script>
