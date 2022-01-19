<template>
  <div>
    <div id = "image">
      <van-image
        fill="true"
        src="https://weixiubang.club/img/16416281297447702432274234209171S.jpg"
      />
      <div class="circular image-title">
        <i class = "van-icon-share-o van-icon"></i>
      </div>
      <div class="rectangle image-title">
        <span>{{data.id}}</span>
      </div>
    </div>
    <div id = "content">
      <jin-basic-info
      :carNumber="data.carNumber"
      :carModel="data.carModel"
      :amount = "data.amount"
      >
      </jin-basic-info>
      <!-- 标记组 -->
      <jin-marks :marks="data.marks">
      </jin-marks>
      <!-- 看板组 -->
      <jin-board :datas = data.times btn="请接单">

      </jin-board>
      <!-- 客户评价 -->
      <jin-customer
      :imgSrc="data.imgSrc"
      :customerName="data.customerName"
      :customerType="data.customerType"
      :scoreTime="data.scoreTime"
      :scoreValue="data.scoreValue"
      :evaluate="data.evaluate"
      > 
      </jin-customer>

    </div>

  </div>
</template>
<script>
import axios from 'axios'
import { Popup, Image as VanImage } from 'vant';
import { URL } from '@/web-config/apiUrl';
import conf from '@/web-config/index';
import JinBasicInfo from '@/components/JinBasicInfo';
import JinMarks from '@/components/JinMarks';
import JinBoard from '@/components/JinBoard';
import JinCustomerScore from '@/components/JinCustomerScore';
export default {
  name: 'construction',
  mixins : [ require ( "@/mixins" ).default ],
  components: {
    Popup,
    'van-image': VanImage,
    'jin-basic-info': JinBasicInfo,
    'jin-marks': JinMarks,
    'jin-board': JinBoard,
    'jin-customer': JinCustomerScore
  },
  data () {
    return {
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

      },
      data: {
        id: '00000547',
        amount: 350,
        carNumber: '川F-PK685',
        carModel: '长安奥拓 大王子 2003 手动',
        marks: [
        '限定时间','VIP客户','车况较差','必须质检'
        ],
        times: [
        '请在2021-10-01 10:00:00 前交付',
        '在2021-10-01 10:00:00 完成接单',
        '已在2021-10-01 10:00:00 完成了施工'
        ],
        imgSrc: "http://www.weixiubang.club/avatarImg/c74c7d9b1fe652744f18994debc95fb0.jpg",
        customerName:"未知客户",
        customerType:'未知客户类型',
        scoreTime:'****-**-**',
        scoreValue:"2",
        evaluate:'该客户很忙，没有留下任何话!',
      }
    }

  },
  methods: {


  },
  watch: {

  },
  mounted () {

  },
  created () {

  }
}
</script>
<style scoped>
#image {
  position: relative;

}
#content {
  height: 500px;
  width: 100%;
  position: relative;
  top: -50px;
  background-color: #ffff;
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


</style>