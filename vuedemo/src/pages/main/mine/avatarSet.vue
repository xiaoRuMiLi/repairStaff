<template>
  <div class="wrapper">
    <div class="image-container">
    <van-image
      round
      width="200"
      height="200"
      :src="images[0].url"
      @click="popUp"
    />
    </div>
    <jin-upload-pop
    :show.sync="onOff_imagePop"
    :files.sync="images"
    explain = "上传图片时请保持横向"
    :maxCount = "1"
    @upload="uploadImage"
    @delete = "deleteImage"
    />

    <div class="button-container">
      <van-button type="primary" size="large" @click="submit">提交</van-button>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    padding: var(--van-padding-lg);
  }
  .image-container {
    text-align: center;
    padding: 50px 50px 150px 50px;

  }

</style>
<script>
import axios from 'axios'
import { Popup, Image as VanImage, Button } from 'vant';
import { URL } from '@/web-config/apiUrl';
import conf from '@/web-config/index';
import JinImageUploadPop from '@/components/JinImageUploadPop';
export default {
  name: 'avatarSet',
  mixins : [ require ( "@/mixins" ).default],
  components: {
     VanImage,
     Button,
     'jin-upload-pop': JinImageUploadPop,
     'van-button': Button,

  },
  data () {
    return {
      // 提交到后端的参数
      params: {},
      onOff_imagePop: !1,
      inputs: {

      },
      images: [{url: "https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg" }],
      datas: [

      ]
    }

  },
  /* 判断是否是从详情页过来的，如果是那么不刷新页面 */
  beforeRouteEnter(to, from, next) {
    if(from.name === '路由name属性') { //判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
      to.meta.isBack = true;
    }
    next();
  },
  // activated 一进入当前页面页面事件，就会触发事件
  // 如果是从详情页过来的，不用刷新页面,如果本路由没有设置keep-alive 为true，则该生命周期函数不会被调用，如果上一个路由，也就是from Keep-alive属性为true，该函数也不会被调用
  activated() {
    console.log('this.$route',this.$route);
    if(!this.$route.meta.isBack) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      //this.getDatas(); // ajax获取数据方法
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false
    let wrapperScrollTop = this.$refs.wrapper.scrollTop;
  },
  computed: {

  },
  watch: {
  // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：
  },

  created() {},

  mounted() {
    this.getData();
  },

  unmounted() {},

  methods: {
    getData () {
      console.log(this.userInfo);
      const url = this.userInfo.avatarUrl;
      this.images = [{url}];

    },
    uploadImage () {

    },
    deleteImage (){
    },
    submit () {

    },
    popUp (){
      this.onOff_imagePop = !0;
    }


  },
}
</script>