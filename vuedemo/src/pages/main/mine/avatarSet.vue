<template>
  <div class="wrapper">
    <div class="image-container">
    <van-image
      round
      width="200"
      height="200"
      :src="images.length > 0? 'url' in images[0]? images[0].url: '': ''"
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
/* setLocal 保存数据到本地 getLocal 获取数据 clearLocal 清除数据*/
import { setLocal , getLocal , clearLocal, validator } from "@/function";
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
    uploadImage (images) {
      let self = this;
      console.log('this.images',this.images);
      console.log('images',images)
      let image = images[0].image;

      self.images[0].status="uploading";
      self.images[0].message = '上传中...';
      let form = {"image": image};
      // p params 和 f form 共同组成 axios的 params 参数， ts 为true 弹出上方提示框
      self.upload( URL.api_userSetAvatar, form ).then( res => {
        console.log(res);
        if(typeof res.data === 'object'){
          const data  = res.data;
          /* 页面刷新后 修改的user_info就不会被存在
           刷新页面时,vue实例重新加载,从而,store也被重置了。store是用来存储组件状态的,而不是用来做本地数据存储的。所以,对于不希望页面刷新之后被重置的数据,使用本地存储来进行存储。*/
          let userInfo = {avatarUrl: data.avatarUrl}
          self.setUserInfo ( userInfo );

          /* setLocal 保存数据到本地,永久存储
               使用的window.localStorage,
               params 1 为保存的键名
               param 2 为保存的值,
          */
          setLocal ( "userMemory" , {
              userInfo : self.userInfo ,
              otherInfo : self.otherInfo ,
              language : self.languageSet
          } );


          self.images[0].status = "";
          self.images[0].url = res.data.avatarUrl;
          self.$toast('上传成功');
          console.log(self.images);
        } else {
          self.images[0].status = "failed";
          self.$toast('上传失败');
        }

      })
      console.log(this.images);

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