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
      <!-- 故障描述 -->
      <div class="fault-description">
        <div class="title">
          故障描述
        </div>
        <div class="content">
          {{data.faultDescription}}
        </div>
      </div>
      <!-- 流程进度 -->
       <div class="img-title">
        流程进度
      </div>
      <div style="padding:0 10px; font-size: 3px;">
        <van-steps :active="active" active-icon="success" active-color="#38f" style="font-size: 1px;">
          <van-step>登记</van-step>
          <van-step>钣金</van-step>
          <van-step>机修</van-step>
          <van-step>电气</van-step>
          <van-step>喷漆</van-step>
        </van-steps>
      </div>
      <!-- 维修列表 -->
      <jin-repair-list
      :title="data.repairType"
      :amount="data.amount"
      :datas="data.repairDatas"
      >
      </jin-repair-list>
      <!-- 图片展示组 -->
      <div class="img-title">
        图片展示
      </div>
      <jin-images-board
      :images = "data.images"
      :arrowDirection = "false"
      >
      </jin-images-board>
    </div>
    <div class="white-space"> </div>
  </div>
</template>
<script>
import axios from 'axios'
import { Popup, Image as VanImage, Step, Steps } from 'vant';
import { URL } from '@/web-config/apiUrl';
import conf from '@/web-config/index';
import JinBasicInfo from '@/components/JinBasicInfo';
import JinMarks from '@/components/JinMarks';
import JinBoard from '@/components/JinBoard';
import JinCustomerScore from '@/components/JinCustomerScore';
import JinRepairList from '@/components/JinRepairList';
import JinImagesBoard from '@/components/JinImagesBoard';
export default {
  name: 'construction',
  mixins : [ require ( "@/mixins" ).default ],
  components: {
    Popup,
    'van-image': VanImage,
    'jin-basic-info': JinBasicInfo,
    'jin-marks': JinMarks,
    'jin-board': JinBoard,
    'jin-customer': JinCustomerScore,
    'jin-repair-list': JinRepairList,
    'jin-images-board': JinImagesBoard,
    'van-steps': Steps,
    'van-step': Step,
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
      /* 流程进度 */
      active: 4,
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
        customerName:"方汉雄",
        customerType:'VIP',
        scoreTime:'2022-01-01',
        scoreValue: 2,
        evaluate:'该客户很忙，没有留下任何话!',
        faultDescription: '故障描述就是车子坏了呗！有啥好说的！',
        repairType: '喷漆',
        repairDatas: [{content: '左前门喷漆',amount:200},{content: '左前门喷漆',amount:200},{content: '左前门喷漆',amount:200},{content: '左前门喷漆',amount:200}],
        images: [
        'http://weixiubang.club/img/1641457355528819422245769931160S.jpg',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fphotoblog%2F7%2F9%2F5%2F0%2F7950997%2F20097%2F5%2F1246732177709.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645279866&t=13d4cedcc517bcb1956b21d15300eed8',
        'http://weixiubang.club/img/16414577032652534036941679180714S.jpg',
        'http://weixiubang.club/img/16414576898124060718675273719397S.jpg',
        'http://weixiubang.club/img/16414576197466276825240428731308S.jpg',
        'http://weixiubang.club/img/16414576372365602708627544697472S.jpg',
        'http://weixiubang.club/img/16414576730421021993050698185062S.jpg',
        ],
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


</style>