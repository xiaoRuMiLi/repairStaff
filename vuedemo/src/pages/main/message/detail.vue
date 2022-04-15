<template>
  <div>
    <jin-chat-panel
    :datas="datas"
    >

    </jin-chat-panel>
    <!-- 上传弹窗组 -->
    <jin-message-creat-pop
    :show.sync="onOff_messagePop"
    :files.sync="inputImages"
    explain = "上传图片时请保持横向"
    @submit="uploadImage"
    @delete = "deleteImage"
    >
    </jin-message-creat-pop>
  </div>
</template>
<script>
import axios from 'axios'
import { Popup, Image as VanImage } from 'vant';
import { URL } from '@/web-config/apiUrl'
// import { isUrl } from '@/utils/CheckUtils';
import conf from '@/web-config/index';
import JinChatPanel from '@/components/JinChatPanel.vue';
import JinMessageCreatPop from '@/components/JinMessageCreatPop';

// moudle 对象传送门https://www.cnblogs.com/tian-xie/p/7754186.html
export default {
  name: 'message',
  mixins : [ require ( "@/mixins" ).default ],
  components: {
    Popup,
    'van-image': VanImage,
    'jin-chat-panel': JinChatPanel,
    'jin-message-creat-pop': JinMessageCreatPop

  },
  // 当在相同路由中跳转，只是参数不同可以定义这个方法以重新执行读取数据
  async beforeRouteUpdate(to, from) {
    // 对路由变化做出响应...
    // console.log("切换了路由参数");
    let id = to.params.id;
    this.id = id;
    this.getDatas( this.data.id );
  },

  data () {
    return {
      id: 0,
      datas: [],
      onOff_messagePop: !0,
      inputImages: []


    }

  },
  computed: {

  },
  mounted () {
    this.id = this.$route.params.id;
    this.getDatas(this.id);
    console.log(this.userInfo);
  },
  created () {

  },
  methods: {
    formatData: function (item) {
      let createrName = 'creater' in item? (typeof item.creater == 'object' && item.creater!=null)? item.creater.name: null: null;
      return {
        name: createrName,
        onLeft: createrName == this.userInfo.userName? !1: !0,
        content: item.content,
        images: item.images.map((i)=>i.url),
        date: item.created_at,
      }
    },
    getDatas: function ( id ) {
      let self = this;
      self.get( URL.api_getMessagesByMorph + id ).then( (data)=>{
        var datas = typeof data == 'string'? JSON.parse( data ): data;
        var res = datas.data
        self.datas = res.map( this.formatData );
      })
    },
    /**
     * [deleteImage 删除图片]
     * @param  {[type]} file [description]
     * @return {[type]}      [description]
     */
    deleteImage ( file ) {
      const id = file.id;
      /*this.post(URL.api_imageDelete + id).then( res => {
        console.log(res)
      })*/
    },
    /**
     * [uploadImage 上传图片]
     * @param  {[type]} images [description]
     * @return {[type]}        [description]
     */
    uploadImage ( images ) {
      var self = this;
      for (let i=0; i < images.length; i++) {
        let image = images[i].image;
        let target = NaN
        for (let s=0; s<this.data.images.length; s++ ){
          target = this.data.images[s].name == image.name?s :NaN;
          if (target!==NaN && this.data.images[target]) {
            this.data.images[target].status="uploading";
            self.data.images[target].message = '上传中...';
            break;
          };
        }
        const param = new FormData();
        param.append("image", image);
        param.append("id", this.data.id);// 多态的imagesablie_id
        param.append("model", 'construction');// 多态模型imagesable_type
        axios.post(URL.api_imageUpload, param, {
            headers: { "Content-Type": "multipart/form-data",},}).then((res) => {
            console.log(res);
            if(res.data.success === true){
              self.data.images[target].status = "";
              self.data.images[target].url = res.data.url;
              self.data.images[target].id = res.data.id;
              self.$toast('上传成功');
              console.log(self.data.images);
            } else {
              self.data.images[target].status = "failed";
              self.$toast('上传失败');
            }
         });

      }

    }
  }
}
</script>
<style scoped>
#image {
  position: relative;

}
#content {
  width: 100%;
  position: relative;
  top: -50px;
  background-color: var(--van-white);
  border-radius: 40px 40px 0 0;
}
.image-title {
  color: white;
  font-size: 20px;
  background-color:  rgba(120,120,120,0.6);
  line-height: 30px;
}
.circular {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 20px;
  border-radius: 50%;
}
.rectangle {
  bottom: 50px;
  position: absolute;
  width: 80px;
  font-size: 12px;
  border-radius: 5px;
  margin: 10px;
  height: 30px;
  line-height: 30px;
}
/* 故障描述 */
.fault-description {
  padding: 20px;
  text-align: left;
  font-size: 14px;

}
.fault-description .title {
  font-size: 16px;
  font-weight: 550;
  padding-bottom: 10px;

}
.fault-description .content {
  color: #999999;

}
/* 图片展示标题 */
.img-title {
  font-size: 16px;
  font-weight: 550;
  padding-bottom: 10px;
  text-align: left;
  padding-left: 20px;
  color: #2c3e50;
}
.white-space {
  height: 300px;
}
.button-wrapper {
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 20px;
  background-color: #ffffff;
  text-align: center;
}
.button-wrapper .button-con {
  width: 100%;
}



</style>