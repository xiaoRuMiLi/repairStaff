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
  text-align: center;
  color: #2c3e50;
  margin-top: 46px;
  background-color: #f6f8fd;
  overflow: hidden;
}
</style>
