<template>
  <div>
    <div class="fixed">
      <van-tabs v-model="inputs.active" @click="tapConstructionType">
        <van-tab title="全部"></van-tab>
        <van-tab title="待接单"></van-tab>
        <van-tab title="施工中"></van-tab>
        <van-tab title="已完成"></van-tab>
        <van-tab title="超时单"></van-tab>
      </van-tabs>
      <van-search
        v-model="inputs.searchVal"
        show-action
        label="关键词"
        placeholder="输入车牌,车型,施工单号,修理类型"
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
      <text-list-item v-for="( item, key ) in datas" :key="key" :title="item.title" :amount="item.amount" :content="item.con" :rightTitle="item.rightTitle" :buttons="item.buttons"> </text-list-item>
    </template>
    </van-list>
    <div class="white-place"></div>
    <van-popup v-model="onOff.showPop" position="right" :style="{ height: '100%', width: '80%' }">
    <van-nav-bar
      title="筛选"
      left-arrow
      @click-left="onClickLeft"
    />
      <!-- 通过 :on-change.sync="chooseVal" 来修改父组件的值，:val="chooseVal" 传递给子组件 -->
      <jin-radio title="金额选择" :arr="choose_datas" :on-change.sync="chooseVal" :val="chooseVal"></jin-radio>
      <jin-radio title="工单类型" :arr="filterConstructionTypes" :on-change.sync="filterConstructionType" :val="filterConstructionType"></jin-radio>
      <jin-date-choose title="达成时间" :arr="choose_dates" :on-change.sync="inputs.betweenRealComplete" :val="inputs.chooseDate"></jin-date-choose>
      <div class="button-box">
        <div>
            <van-button color="#2873ff" size="large" @click="onClickLeft" plain> 取  消 </van-button>
        </div>
        <div>
            <van-button color="#2873ff" size="large" @click="tapSubmit" > 确  定 </van-button>
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
import JinDateChoose from '@/components/JinDateChoose.vue'
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
    'jin-date-choose': JinDateChoose,
    'van-button': Button,
    'van-nav-bar': NavBar,
  },
  data () {
    return {
      list: [],
      choose_datas: ['0-100','100-500','500-1000','1000-2000','2000-5000'],
      choose_dates: ['近两个月','近一个月','近二十天','近十天'],
      filterConstructionTypes: ['全部','待接单','施工中','已完成','超时单',],
      filterConstructionType: '全部',
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
      inputs: {
        // 订单类型，全部、超时单、已完成、未完成、施工中
        // 标签动作
        active: 0,
        chooseDate: '',
        betweenRealComplete: [
          '2020-12-01',
          '2022-01-01'
        ],
        searchVal: '',
        // 筛选价格区间
        betweenAmount: [
          0,
          10000
        ],
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
       选择施工单类型事件
     */
    tapConstructionType( index, title )
    {
      let self = this;
      /* 清空其它的所有限制 */
      self.params = {},
      self.params.construction_type = index;
      self.datas = [];
      self.onOff.finished = !1;
      this.getDatas()

    },
    /**
     * [formatData 格式化后端返回的数据]
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    formatData ( item ) {
      let data = {
        title: item.repair_type + '施工单',
        amount: item.amount,
        con: [
          {
            title: '车牌照号',
            content: item.title,
          },
          {
            title: '车型',
            content: item.mode,
          },
          {
            title: '指定时间',
            content: item.complete_at,
          },
          {
            title: '接单时间',
            content: item.receive_at,
          },
          {
            title: '达成时间',
            content: item.real_complete_at,
          }
        ],
        buttons: [
          'no1',
          'no2',
        ],
        rightTitle: item.real_complete_at? '已完成': '未完成'
      }
      return data;
    },
    getDatas ( params = this.params ) {
      self = this
      let pageNumber = self.datas.length / conf.numberPerPage + 1;
      params.page = pageNumber;
      self.onOff.loading = !0;
      console.log('params:', this.params );
      this.get ( URL.api_searchConstruction, params ).then( (data) => {
        var datas = typeof data == 'string'? JSON.parse( data ): data;
        var res = datas.data
        if ( res.length < conf.numberPerPage ) self.onOff.finished = true;
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
      self.params = {construction_type: self.inputs.active, search: self.inputs.searchVal},
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
      delete self.params.search;

    },
    onFilter () {
      this.onOff.showPop = true
      console.log("filter")
    },
    /**
     * [tapSubmit 提交筛选信息]
     * @return {[type]} [description]
     */
    tapSubmit () {
      // 与标签栏的选择项同步
      if( this.filterConstructionType == '待接单' || this.filterConstructionType == '施工中')
      {
        this.filterConstructionType = '全部'
      }
      this.inputs.active = this.filterConstructionTypes.indexOf( this.filterConstructionType );
      this.params = {
        construction_type: this.inputs.active,
        // 传入实际完成时间的时间区间数组
        real_complete_at: this.inputs.betweenRealComplete,
        amount: this.inputs.betweenAmount
      }
      // console.log('提交的params is',this.params);
      self.datas = [];
      self.onOff.finished = !1;
      self.onOff.showPop = !1;
      this.getDatas();
    },


  },
  watch: {
    filterConstructionType ( newVal ) {
      // 与标签栏的选择项同步
      // this.inputs.active = this.filterConstructionTypes.indexOf( newVal );
    },
    chooseVal ( newVal )
    {
      let amounts = newVal.split('-');
      if ( amounts.length == 2 )
      {
        this.inputs.betweenAmount =
        [
        Number(amounts[0]),
        Number(amounts[1])
        ]
      }
    }

  },
  mounted () {
    this.getDatas ();
    console.log(CONFIG);
    console.log(this.$route);
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