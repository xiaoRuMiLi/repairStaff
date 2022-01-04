<template>
  <div>
    <div class="fixed">
      <van-tabs v-model="active">
        <van-tab title="全部"></van-tab>
        <van-tab title="施工中"></van-tab>
        <van-tab title="待接单"></van-tab>
        <van-tab title="超时单"></van-tab>
      </van-tabs>
      <van-search
        v-model="searchValue"
        show-action
        label="关键词"
        placeholder="输入车牌，施工单号码，车型"
        @search="onSearch"
      >
        <template #action>
          <div @click="onFilter">搜索</div>
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
      <!-- 通过 :on-change.sync="chooseVal" 来修改父组件的值，:val="chooseVal" 传递给子组件 -->
      <jin-radio :arr="choose_datas" :on-change.sync="inputs.chooseVal" :val="inputs.chooseVal"></jin-radio>

      <jin-date-check :arr="choose_dates" :on-change.sync="inputs.chooseDate" :val="inputs.chooseDate"></jin-date-check>
    </van-popup>



  </div>
</template>

<script>
import axios from 'axios'
import { List, Tab, Tabs, Search, Popup, RadioGroup, Radio  } from 'vant';
import { URL } from '@/web-config/apiUrl';
import PercentLoop from '@/components/PercentLoop.vue'
import JinRadio from '@/components/jin-radio.vue'
import JinDateCheck from '@/components/JinDateCheck.vue'
import TextListItem from '@/components/TextListItem.vue'

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
  },
  data () {
    return {
      list: [],
      // 标签动作
      active: 2,
      // 单选框
      radio: 1,
      // 搜索内容
      searchValue: '',
      choose_datas: ['选择项1','选择项2','选择项3','选择项4','选择项5','选择项6','选择项7','选择项8'],
      choose_dates: ['近两个月','近一个月','近二十天','近十天'],
      onOff:{
        // 弹出右侧弹层
        showPop: true,
        // 列表下方读取中动画
        loading: false,
        finished: false,
      },
      inputs: {
        chooseVal: '选择项6',
        chooseDate: '近一个月',
      },
      datas: [
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
        }
      ]
    }

  },
  methods: {
    getDatas () {
      self = this

      this.get (URL.api_searchConstruction).then( (data) => {
        console.log(data)
        var datas = JSON.parse(data);
        if (datas.code == 200) {
            var res = datas.data
            console.log(datas.data)

        }

      })
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
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
    this.getDatas ();
    console.log(CONFIG)


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

</style>