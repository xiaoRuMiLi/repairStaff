<template>
  <div>
    <div class="fixed">
      <van-tabs v-model="active">
        <van-tab title="全部"></van-tab>
        <van-tab title="待接单"></van-tab>
        <van-tab title="施工中"></van-tab>
        <van-tab title="已完成"></van-tab>
        <van-tab title="超时单"></van-tab>
      </van-tabs>
      <van-search
        v-model="searchValue"
        show-action
        label="关键词"
        placeholder="输入车牌,车型,施工单号"
        @search="onSearch"
      >
        <template #action>
          <div @click="onFilter">筛选</div>
        </template>
      </van-search>
    </div>
    <div class="white-place"></div>
    <van-list
      v-model="onOff.loading"
      :finished="onOff.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <template slot="default">
      <text-list-item v-for="item in datas" :title="item.title" :amount="item.amount" :content="item.con" :rightTitle="item.rightTitle" :buttons="item.buttons"> </text-list-item>
    </template>
    <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>

    <van-popup v-model="onOff.showPop" position="right" :style="{ height: '100%', width: '80%' }">
    <van-nav-bar
      title="筛选"
      left-arrow
      @click-left="onClickLeft"
    />
      <!-- 通过 :on-change.sync="chooseVal" 来修改父组件的值，:val="chooseVal" 传递给子组件 -->
      <jin-radio :arr="choose_datas" :on-change.sync="inputs.chooseVal" :val="inputs.chooseVal"></jin-radio>
      <jin-date-check :arr="choose_dates" :on-change.sync="inputs.betweenDate" :val="inputs.chooseDate"></jin-date-check>
      <div class="button-box">
        <div>
            <van-button color="#2873ff" size="large" @click="onClickLeft" plain> 取  消 </van-button>
        </div>
        <div>
            <van-button color="#2873ff" size="large"> 确  定 </van-button>
        </div>
      </div>

    </van-popup>



  </div>
</template>

<script>
import axios from 'axios'
import { List, Tab, Tabs, Search, Popup, RadioGroup, Radio, Button, NavBar } from 'vant';
import { URL } from '@/web-config/apiUrl';
import PercentLoop from '@/components/PercentLoop.vue'
import JinRadio from '@/components/jin-radio.vue'
import JinDateCheck from '@/components/JinDateCheck.vue'
import TextListItem from '@/components/TextListItem.vue'
import conf from '@/web-config/index';

export default {
  name: 'orderPage',
  mixins : [ require ( "@/mixins" ).default],
  components: {
    List,
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-popup': Popup,
    'van-search': Search,
    'percent-loop': PercentLoop,
    'jin-radio': JinRadio,
    'text-list-item': TextListItem,
    'jin-date-check': JinDateCheck,
    'van-button': Button,
    'van-nav-bar': NavBar,
  },
  data () {
    return {
      list: [],
      // 标签动作
      active: 2,
      // 搜索内容
      searchValue: '',
      choose_datas: ['选择项1','选择项2','选择项3','选择项4','选择项5','选择项6','选择项7','选择项8'],
      choose_dates: ['近两个月','近一个月','近二十天','近十天'],
      onOff:{
        // 弹出右侧弹层
        showPop: !1,
        // 列表下方读取中动画
        loading: true,
        finished: false,
      },
      inputs: {
        chooseVal: '选择项6',
        chooseDate: '近一个月',
        betweenDate: {
          startDate: '2021-12-01',
          endDate: '2022-01-01',
        }
      },
      datas: [
        /*{
          title: '喷漆施工单',
          amount: 1000,
          con: [
            {
              title: '车牌照号：',
              content: '川F-PK685',
            },
            {
              title: '车型：',
              content: '一汽大众 速腾 2012 手动',
            },
            {
              title: '接单时间：',
              content: '2018-12-01 10：00：00',
            }
          ],
          buttons: [
            'no1',
            'no2',
          ],
          rightTitle: '未完成'
        },
        {
          title: '喷漆施工单',
          amount: 1000,
          con: [
            {
              title: '车牌照号：',
              content: '川F-PK685',
            },
            {
              title: '车型：',
              content: '一汽大众 速腾 2012 手动',
            },
            {
              title: '接单时间：',
              content: '2018-12-01 10：00：00',
            }
          ],
          buttons: [
            '备注',
            '留言',
          ],
          rightTitle: '已完成'
        }*/
      ]
    }

  },
  methods: {
    /**
     * [formatData 格式化后端数据]
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    formatData ( item ) {
      let data = {
        title: item.repair_type + '施工单',
        amount: item.amount,
        con: [
          {
            title: '车牌照号：',
            content: item.title,
          },
          {
            title: '车型：',
            content: item.mode,
          },
          {
            title: '指定时间：',
            content: item.complete_at,
          },
          {
            title: '接单时间：',
            content: item.receive_at,
          },
          {
            title: '达成时间：',
            content: item.real_complete_at,
          }
        ],
        buttons: [
          'no1',
          'no2',
        ],
        rightTitle: item.real_complete_at? '已完成': '未完成'
      }
      console.log(data);
      return data;
    },
    getDatas ( pageNumber ) {
      self = this
      self.onOff.loading = !0;
      this.get ( URL.api_searchConstruction, { page: pageNumber }).then( (data) => {
        var datas = typeof data == 'string'? JSON.parse( data ): data;
        var res = datas.data
        if (res.length < 1) self.onOff.finished = true;
        self.datas = self.datas.concat( res.map( this.formatData ) );
        this.onOff.loading = false;
        //self.onOff.finished = true;
      })
    },
    onClickLeft ()
    {
      self.onOff.showPop = !1;
    },
    onLoad() {
      console.log('读取新的内容');
      let pageNumber = this.datas.length / conf.numberPerPage + 1;
      this.getDatas (pageNumber);
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求


    },
    onSearch () {
      console.log('search')

    },
    onFilter () {
      this.onOff.showPop = true
      console.log("filter")
    }


  },
  watch: {
    chooseVal (newVal) {
      console.log(newVal)


    }

  },
  mounted () {
    console.log(this)
    let pageNumber = this.datas.length / 20;
    this.getDatas (pageNumber);
    console.log(CONFIG)
      // 加载状态结束
      // 数据全部加载完成
    if (this.datas.length >= 20) {
        this.onOff.finished = true;
    }


  },
  created () {

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
  .button-box {
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .button-box > div {
    width: 50%;
    padding: 10px;

  }

</style>