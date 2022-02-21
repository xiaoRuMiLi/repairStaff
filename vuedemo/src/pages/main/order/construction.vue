<template>
  <div>
    <div id = "image">
      <van-image
        fill="true"
        :src="data.images.length > 0 && data.images[0]"
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
      <div class="fault-description" v-if="data.fault_info">
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
      <jin-work-progress
      :datas="data.workProgress"
      :startDt="data.startDt"
      :endDt="data.endDt"
      >
      </jin-work-progress>
      <div style="padding:0 10px; font-size: 3px;">
        <van-steps :active="active" active-icon="success" active-color="#38f" style="font-size: 1px;">
          <van-step>登记</van-step>
          <van-step>钣金</van-step>
          <van-step>机修</van-step>
          <van-step>电气</van-step>
          <van-step>喷漆</van-step>
          <van-step>质检</van-step>
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
import { URL } from '@/web-config/apiUrl'
// import { isUrl } from '@/utils/CheckUtils';
import conf from '@/web-config/index';
import JinBasicInfo from '@/components/JinBasicInfo';
import JinMarks from '@/components/JinMarks';
import JinBoard from '@/components/JinBoard';
import JinCustomerScore from '@/components/JinCustomerScore';
import JinRepairList from '@/components/JinRepairList';
import JinImagesBoard from '@/components/JinImagesBoard';
import JinWorkProgress from '@/components/JinWorkProgress';
// moudle 对象传送门https://www.cnblogs.com/tian-xie/p/7754186.html
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
    'jin-work-progress': JinWorkProgress,
  },
  // 当在相同路由中跳转，只是参数不同可以定义这个方法以重新执行读取数据
  async beforeRouteUpdate(to, from) {
    // 对路由变化做出响应...
    console.log("切换了路由参数");
    let id = to.params.id;
    this.getData( id );
  },
  data () {
    return {
      // 提交到后端的参数
      params: {},
      onOff_loading: !1,
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

        ],
        times: [

        ],
        imgSrc: " ",
        customerName:"方汉雄",
        customerType:'VIP',
        scoreTime:'2022-01-01',
        scoreValue: 2,
        evaluate:'该客户很忙，没有留下任何话!',
        faultDescription: '故障描述就是车子坏了呗！有啥好说的！',
        repairType: '喷漆',
        repairDatas: [{content: '左前门喷漆',amount:200},{content: '左前门喷漆',amount:200},{content: '左前门喷漆',amount:200},{content: '左前门喷漆',amount:200}],
        images: [

        ],
        workProgress: [],
        startDt: '',
        endDt: '',
        remarks: '这是一个备注'
      }
    }

  },
  methods: {
    getData ( constructionId ) {
      const self = this;
      let params = {};
      console.log( self.$route.query );
      console.log( self.$route );
      self.get( URL.api_constructionShow + constructionId , params ).then ( ( data ) => {
        console.log( data );
        self.data = self.formatData(data.data);
      } );



    },


    formatData ( inp ) {
      let result = {};
      let makeMarks = ( da ) => {
        let res = [ da.dispatch_mode ];
        if ( da.inspect_type == 1 ) res.push('完工交检');
        if ( da.complete_type == 1 ) res.push('限时交车');
        return res;
      }

      let makeTimes = ( da ) => {
        let str = `请在${da.complete_at}前交付`;
        let res = new Array(str);
        // 模板字符串需要使用 ` 反引号包裹起来用${}导入变量
        if ( da.receive_at ) res.push( `已在${da.receive_at}完成接单` );
        da.real_complete_at && res.push( `已在${da.real_complete_at}完成了施工` );
        return res;
      }

      let makePicture = ( da ) => {
        let picture = da.repair.register.pictures;
        let pictureArr = picture?(picture.split('|')): [];
        picture = pictureArr.map( (item) => {
          var patt = /^(http|https|ftp|update)+/;
          if (patt.test(item)) {
            return item;
          } else {
            return conf.remoteImageFolder + item;
          }
        })
        picture = picture.filter( (item) => {
          if( item != conf.remoteImageFolder) {
            return item;
          }
        })
        let images = da.repair.register.images || [];
        images = images && images.map( (item) => {
          return item.url;
        })
        console.log([...images,...picture]);
        return [...picture, ...images];

      }
      let makeEvaluate = (da) => {
        // 如果客户没有给与评价那么显示客户说里面的语言
        if ( !da.evaluates || da.evaluates.length == 0 ){
          return {
            name: da.repair.repair_client.name,
            avatarImg: da.repair.repair_client.avatarUrl,
            scoreValue: 0,
            clientType: da.repair.repair_client.type,
            evaluate: da.repair.register.owner_say?da.repair.register.owner_say:'该客户很忙，没有留下任何话!',
            scoreTime: da.repair.created_at
          }
        } else {
          // 显示最近的一个评价
          let evaluate = da.evaluates[da.evaluates.length -1];
          return {
            name: evaluate.repair_client.name,
            avatarImg: evaluate.repair_client.avatarUrl,
            scoreValue: evaluate.score,
            clientType: evaluate.repair_client.type,
            evaluate: evaluate.info?evaluate.info:'该客户参与了评价，却什么都懒得说!',
            scoreTime: evaluate.created_at,
          }
        }
      }
      /**
       * 抓取进度消息
       */
      let makeWorkProgress = function ( da )
      {
        let constructions = da.repair.constructions;
        let res = constructions.map( (item) => {
          return {
            name: item.user.name,
            imgSrc: item.user.avatarUrl,
            receive_at: item.receive_at,
            complete_at: item.complete_at,
            real_complete_at: item.real_complete_at,
            repair_type: item.repair_type,
            creat_at: item.created_at,
          }
        })
        return res;
      }
      // h获取到图片数组
      let images = makePicture(inp);
      // 获取评价内容
      let evaluate = makeEvaluate(inp);
      // 施工进度信息
      let workProgress = makeWorkProgress(inp);
      console.log(workProgress);
      result = {
        id: inp.id,
        amount: inp.amount,
        carNumber: inp.car_number,
        carModel: inp.car_mode,
        marks: makeMarks(inp),
        times: makeTimes(inp),
        imgSrc: evaluate.avatarImg,
        customerName: evaluate.name,
        customerType: evaluate.clientType,
        scoreTime: evaluate.scoreTime,
        scoreValue: evaluate.scoreValue,
        evaluate: evaluate.evaluate,
        faultDescription: inp.fault_info,
        repairType: inp.repair_type,
        repairDatas: inp.repair_content,
        images: images,
        workProgress: workProgress,
        // 整个维修给到的时间长度
        startDt: inp.repair.created_at,
        endDt: inp.repair.delivery_at,
        remarks: '这是一个备注'
      }
      return result;
    }


  },
  watch: {

  },
  mounted () {
    const self = this;
    let id = self.$route.params.id;
    this.getData( id );

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