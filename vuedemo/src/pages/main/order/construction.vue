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
      <div id="basic-info">
        <div class="left">
          <div class="car-number"> {{data.carNumber}}</div>
          <div class="car-mode">{{data.carModel}}</div>
          <div class="money">
            <div class="flag">
              $
            </div>
            <span> {{data.amount}} </span>
          </div>
          
        </div>
        <div class="right">
          <i class="van-icon van-icon-arrow"></i>
        </div>
        
      </div>
      
    </div>
   
  </div>
</template>
<script>
import axios from 'axios'
import { Popup, Image as VanImage } from 'vant';
import { URL } from '@/web-config/apiUrl';
import conf from '@/web-config/index';
export default {
  name: 'construction',
  mixins : [ require ( "@/mixins" ).default ],
  components: {
    Popup,
    'van-image': VanImage,   
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

/* 基本信息 */
#basic-info {
  width: 100%;
  padding: 20px;
  position: relative;
  text-align: left;

}
#basic-info .left {
  text-align: left;
  display: inline-block;

}
#basic-info .left .car-number {
  font-size: 18px;
  font-weight: 600;
  padding: 0px 10px 10px 10px;

}
#basic-info .left .car-mode {
  font-size: 16px;
  font-weight: 600;
  padding: 0px 10px 10px 10px;

}
#basic-info .left .money {
  padding-left: 10px;

}
.money .flag {
  display: inline;
  color: #ff8917;
  font-size: 18px;
  font-weight: 600;

}
.money span {
  color: #ee0a24;
  font-size: 16px;
  font-weight: 600;
}
#basic-info .right {
  height: 100%;
  display: inline-block;
}


</style>