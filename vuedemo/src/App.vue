<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2023-04-10 19:41:13
-->
<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
          <Root></Root>
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如详情B页面-->
    </router-view>
    <div class="white-space" :style="{height: '50px'}">
    </div>
  </div>
</template>

<script>
import Root from "./pages/root/index.vue";
export default {
  name: 'App',
  components: {
    Root,
  },
  data () {
    return {


    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /**text-align: center;*/
  color: #2c3e50;
  margin-top: 46px;
  background-color: #f6f8fd;
  overflow: hidden;
}
/* 修改按钮默认颜色 */
.van-button--primary {
  background-color: var(--van-blue);
  border-color: var(--van-blue);
  border-radius: var(--van-border-radius-md);
  color: var(--van-white);
}

</style>
