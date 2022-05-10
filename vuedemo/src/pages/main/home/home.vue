<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div class="content">
      <van-notice-bar scrollable :text="notices" />
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
import { NoticeBar, Swipe, SwipeItem } from 'vant';
import jinRemind from "@/components/jin-remind/index.vue";  //引用组件的地址
import jinRemindItem from "@/components/jin-remind-item/index.vue";  //引用组件的地址
import { URL } from '@/web-config/apiUrl';
export default {
  name: 'homePage',
  mixins : [ require ( "@/mixins" ).default],
  components: {
    'jin-remind': jinRemind,
    "van-notice-bar": NoticeBar,
    'jin-remind-item': jinRemindItem,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem
  },
  data () {
    return {
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
      let res = await self.get( URL.api_statistics );
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
      const datas = await this.get(URL.api_getLastNotice); 
      this.noticeArr =  "data" in datas && datas.data ;   
    }



  },
  mounted () {
    let self = this;
    self.getData();
    self.getNotices();

  },

}
</script>
<style scoped>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .content {
    padding: var(--van-padding-sm);
  }
</style>

