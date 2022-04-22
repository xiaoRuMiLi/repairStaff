<template>
  <div>
    <div class="fixed">
      <van-tabs v-model="inputs.active" @click="changeType">
        <van-tab title="全部"></van-tab>
        <van-tab title="未读消息"></van-tab>
        <van-tab title="待回复"></van-tab>
        <van-tab title="已回复"></van-tab>
      </van-tabs>
      <van-search
        v-model="inputs.searchVal"
        show-action
        label="内容"
        placeholder="输入信息内容关键词"
        @search="onSearch"
      >
      </van-search>
    </div>
    <div class="white-place"></div>
    <div ref="wrapper">
      <van-list
        v-model="onOff.loading"
        :finished="onOff.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <template slot="default">
        <chat-list-item
        v-for="(item,key) in datas"
        :name="item.name"
        :message="item.message"
        :dateTime="item.dateTime"
        :count="item.count"
        :avatar = "item.avatar"
        :id = "item.id"
        @tap="clickItem"
        >
        </chat-list-item>



      </template>
      </van-list>
    </div>
    <div class="white-place"></div>




  </div>
</template>

<script>
import axios from 'axios'
import { List, Tab, Tabs, Search, Popup, Button, NavBar, Toast } from 'vant';
import { URL } from '@/web-config/apiUrl';
import JinChatListItem from '@/components/JinChatListItem.vue'
import conf from '@/web-config/index';

export default {
  name: 'messageList',
  mixins : [ require ( "@/mixins" ).default],
  components: {
    List,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-popup': Popup,
    'van-search': Search,
    'chat-list-item': JinChatListItem,
    'van-button': Button,
    'van-nav-bar': NavBar,
  },
  data () {
    return {
      fromKeepAlive: !0,
      chooseVal: '',
      // 提交到后端的参数
      params: {},
      onOff:{
        // 弹出右侧弹层
        showPop: !1,
        // 列表下方读取中动画
        loading: true,
        finished: false,
      },
      datas: [

      ],
      inputs: {
        active: 0,
        searchVal: '',
      }


    }

  },
  /* 判断是否是从详情页过来的，如果是那么不刷新页面 */
  beforeRouteEnter(to, from, next) {
    if(from.name === 'messageDetail') { //判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
        to.meta.isBack = true;
    }
    /* 如果是从主页过来的，进入后就执行搜索  */
    if( from.name === 'home' ) {
        to.meta.onSearch = true;
    }
    next();
  },
  // activated 一进入当前页面页面事件，就会触发事件
  // 如果是从详情页过来的，不用刷新页面,如果本路由没有设置keep-alive 为true，则该生命周期函数不会被调用，如果上一个路由，也就是from Keep-alive属性为true，该函数也不会被调用
  activated() {
    // console.log('this.$route',this.$route);
    if(this.$route.meta.isBack) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
       // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack = false
      let wrapperScrollTop = this.$refs.wrapper.scrollTop;
      return;
    }

    if ( this.$route.meta.onSearch )
    {
      let params = self.$route.query;
      this.params = params;
      this.datas = [];
      this.onOff.finished = !1;
      this.onOff.showPop = !1;
      this.getDatas();
      this.$route.meta.onSearch = false
      return ;
    }
    this.datas = []
    this.getDatas();
    this.fromKeepAlive = !1; // ajax获取数据方法

  },

  watch: {
    params ( nval ) {
      const self = this;
      self.inputs.active = 'message_type' in nval && Number(nval.message_type)
    }

  },
  mounted () {
    // mouted中的方法代表dom已经加载完毕
    //console.log( 'mounted' );
    /*if( this.fromKeepAlive ) {
      this.datas = []
      this.getDatas ();
    }*/
  },
  beforeDestroy () {
    console.log('beforeDestroy');
    this.fromKeepAlive = !0;

  },
  created () {

  },
  methods: {
      /* 上滑执行的事件 */
    onLoad() {

      this.getDatas ();

      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    },
      /**
     * [onSearch 搜索输入事件]
     * @return {[type]} [description]
     */
    onSearch () {
      var self = this;
      if ( !self.inputs.searchVal.trim()) return;
      self.params = {message_type: self.inputs.active, content: self.inputs.searchVal},
      self.datas = [];
      self.onOff.finished = !1;
      this.getDatas()
    },
    /**
     * [searchBlur 清空搜索内容]
     * @return {[type]} [description]
     */
    searchEmpty () {
      let self = this;
      self.inputs.searchVal = "";
      delete self.params.content;

    },
    /**
     * [clickItem 点击项目事件]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    clickItem( id ) {
      let self = this;
      // 带有路径的对象
      self.$router.push({ path: `construction/${id}` })

    },
    /**
       选择施工单类型事件
     */
    changeType( index, title )
    {
      let self = this;
      /* 清空其它的所有限制 */
      self.datas = [];
      self.searchEmpty();
      self.onOff.finished = !1;
      self.params.message_type = self.inputs.active;
      this.getDatas()

    },
    /**
     * [formatData 格式化后端返回的数据]
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    formatData ( item ) {

      return {
        id: item.id,
        name: item.creater && item.creater.name,
        avatar: item.creater && item.creater.avatarUrl,
        message: item.content,
        count: item.must_reply && !item.reply_at? Array(this.language.notNeedReply,this.language.needReply)[item.must_reply]:0,
        dateTime: item.created_at,
      };
    },


    getDatas ( params = this.params ) {
      self = this
      let pageNumber = self.datas.length / conf.numberPerPage + 1;
      params.page = pageNumber;
      self.onOff.loading = !0;
      // console.log('params:', this.params );
      this.get ( URL.api_messageSearch, params ).then( (data) => {
        var datas = typeof data == 'string'? JSON.parse( data ): data;
        var res = datas.data
        if ( res.length < conf.numberPerPage ) self.onOff.finished = true;
        self.datas = self.datas.concat( res.map( this.formatData ) );
        this.onOff.loading = false;
        //self.onOff.finished = true;
      })
    },
    clickItem( id ) {
      let self = this;
      console.log(id);
      // 带有路径的对象
      self.$router.push({ path: `/message/detail/${id}` });

    }
  }
}
</script>
<style scoped>
  .fixed {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 50px;
    background-color: #f6f8fd;
  }
  .white-place {
    height: 100px;
    background-color: rgba(0, 0, 0, 0);
  }
  .radio-title {
    margin: 0;
    padding: 32px 16px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
  .radio-title-con {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    height: 40px;
    line-height: 40px;
  }


</style>