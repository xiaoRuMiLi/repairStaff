<template>
  <div>
    <jin-chat-panel
    :datas="datas"
    >

    </jin-chat-panel>
  </div>
</template>
<script>
import axios from 'axios'
import { Popup, Image as VanImage } from 'vant';
import { URL } from '@/web-config/apiUrl'
// import { isUrl } from '@/utils/CheckUtils';
import conf from '@/web-config/index';
import JinChatPanel from '@/components/JinChatPanel.vue';

// moudle 对象传送门https://www.cnblogs.com/tian-xie/p/7754186.html
export default {
  name: 'message',
  mixins : [ require ( "@/mixins" ).default ],
  components: {
    Popup,
    'van-image': VanImage,
    'jin-chat-panel': JinChatPanel,

  },
  // 当在相同路由中跳转，只是参数不同可以定义这个方法以重新执行读取数据
  async beforeRouteUpdate(to, from) {
    // 对路由变化做出响应...
    // console.log("切换了路由参数");
    let id = to.params.id;
    this.data.id = id;
    this.getDatas( this.data.id );
  },

  data () {
    return {
      id: 0,
      datas: [],


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
    }

  },
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