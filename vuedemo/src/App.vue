<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view>
      <Root></Root>
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
}
</style>
