<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" lazy-render>
      <van-swipe-item v-for="(img,index) in swipeImgs">

        <!-- <img class="swipe-img" v-lazy="img"/> -->
        <img class="swipe-img" :src="img" @click="handlebigimg(index)"/>
      </van-swipe-item>

    </van-swipe>
    <div class="content">
      <van-notice-bar scrollable :text="notices" />
      <div class="menu">
        <div class="title"> 常用功能 </div>
        <div class="menu-content">
          <div class="menu-item" @click="$router.push({name: 'receive-status'})">
            <van-icon name="calendar-o" size="40" />
            <div class="text">
              排班查看
            </div>
          </div>
          <div class="menu-item" @click="$router.push({name: 'construction-receive-config'})">
            <van-icon size="40"  name="todo-list-o" />
            <div class="text">
              接单设置
            </div>
          </div>
        </div>
        
      </div>
      <jin-remind :remind-title = "task.title">
        <template slot="item">
          <!-- 组件内部注册的事件名字是clickItem 父元素通过click-item 可以调用 ,: component lists rendered with v-for should have explicit keys 报错需要给组件加上:key-->
          <jin-remind-item v-for="( item , key ) in task.datas" :num = "item.num" :msg="item.msg" :ind="key" :key="key" @click-item="clickEvent">

          </jin-remind-item>
        </template>
      </jin-remind>
      <jin-remind :remind-title = "repair.title">
        <template slot="item">
          <!-- 组件内部注册的事件名字是clickItem 父元素通过click-item 可以调用 ,: component lists rendered with v-for should have explicit keys 报错需要给组件加上:key-->
          <jin-remind-item v-for="( item , key ) in repair.datas" :num = "item.num" :msg="item.msg" :ind="key" :key="key" @click-item="clickItem">

          </jin-remind-item>
        </template>
      </jin-remind>
  </div>
  </div>
</template>

<script>

import axios from 'axios'
import { NoticeBar, Swipe, SwipeItem, Lazyload, ImagePreview, Icon } from 'vant';
import jinRemind from "@/components/jin-remind/index.vue";  //引用组件的地址
import jinRemindItem from "@/components/jin-remind-item/index.vue";  //引用组件的地址
import { URL } from '@/web-config/apiUrl';
import { setLocal } from "@/function";
export default {
  name: 'homePage',
  mixins : [ require ( "@/mixins" ).default],
  components: {
    Icon,
    'jin-remind': jinRemind,
    "van-notice-bar": NoticeBar,
    'jin-remind-item': jinRemindItem,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data () {
    return {
      swipeImgs: [],
      noticeArr: [],
      task:{
        title: '代办事项',
        datas: [
          { num: 0,
            msg:"等待回复"
          },
          { num: 0,
            msg:"等待接单"
          },

        ],
        active: 0,
      },
      repair:{
        title: '施工项目',
        datas:[
          { num: 0,
            msg:"加急工单"
          },
          { num: 0,
            msg:"24小时内交车"
          },
          { num: 0,
            msg:"正在施工"
          },

        ]
      }

    }

  },
  computed: {
    notices () {
      return this.noticeArr.map(i => i.content).join("!!!!!!。");
    },
  },
  beforeDestroy () {

    // 对数据进行保存。比如系统的一些挂载的设置，在退出后就自动进行保存，下次就可以直接从localstorage 读取
    setLocal ( "userMemory" , {
      userInfo : this.userInfo ,
      otherInfo : this.otherInfo ,
      language : this.language,
    });
  },
  methods: {
    handlebigimg(index) {
      ImagePreview({
        images: this.swipeImgs,
        startPosition: index
      });
    },
    getSwipeImgs () {
      this.swipeImgs = this.otherInfo.swipeImgs;
    },
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
    clickItem( key ) {
      switch ( key )
      {
        case 0:
            this.$router.push( { path: `order`, query: { construction_type: 2 } } );
            break;
        case 1:
            this.$router.push( { path: `order`, query: { construction_type: 2 } } );
            break;
        case 2:
            this.$router.push( { path: `order`, query: { construction_type: 2 } } );
            break;
        default:
            break;
      }
    },
    async getData() {
      let self = this;
      let res = await self.get( URL.api_statistics ).catch(err=>{console.log(err)});
      let data = res.data;
      self.task = {
        title: '代办事项',
        datas: [
          { num: data.unreadCount,
            msg:"等待回复"
          },
          { num: data.notReceiveCount,
            msg:"等待接单"
          },

        ],
        active: 0,
      };
      self.repair = {
        title: '施工项目',
        datas:[
          { num: data.urgentRepairCount,
            msg:"加急工单"
          },
          { num: data.withInOneDayCount,
            msg:"24小时内交车"
          },
          { num: data.underRepairCount,
            msg:"正在施工"
          },

        ]
      }
    },
    clickEvent( key ) {
      switch ( key )
      {
        case 0:
            this.$router.push( { path: `message/list`, query: { message_type: 2 } } );
            break;
        case 1:
            this.$router.push( { path: `order`, query: { construction_type: 1 } } );
            break;
        default:
            break;
      }
    },
    async getNotices() {
      const datas = await this.get(URL.api_getLastNotice).catch(err=>{console.log(err)});
      this.noticeArr =  "data" in datas && datas.data ;
    },

  },
  mounted () {
    let self = this;
    self.getData();
    self.getNotices();
    self.getSwipeImgs();

  },

}
</script>
<style scoped>
  .content {
    padding: var(--van-padding-sm);
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    /* line-height: 150px; */
    text-align: center;
    /* background-color: #39a9ed;*/
  }
  .swipe-img {
    width: 100%;
    height: 100%;
  }
  .menu {
    display: flex;
    padding: var(--van-font-size-md) 0;
    flex-direction: column;
  }
  .menu .menu-content {
    display: flex;
    padding: var(--van-padding-md) 0;
    background: var(--van-background-color-light);
    border-radius: 5px;
  }
  .menu .title {
    font-size: var(--van-font-size-lg);
    font-weight: var(--van-font-weight-bold-2);
    padding: var(--van-padding-sm) var(--van-padding-base);
  }
  .menu .menu-item {
    padding: var(--van-padding-base);
    flex: 0 0 20%; /* 这将使得每个子元素占据容器的25%宽度 */
    box-sizing: border-box; /* 包括padding和border在内的宽度 */
    text-align: center;
  }
  .menu-item .text {
    font-size: var(--van-font-size-sm);
    width: 100%;
    text-align: center;
  }
</style>

