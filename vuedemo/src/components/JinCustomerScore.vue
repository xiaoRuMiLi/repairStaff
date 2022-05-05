<template>
	<div class="customer-score">
		<div class="left">
			<div class="head">
				<div class="img-div">
				    <van-image
				        fill="true"
				        :src="computedSrc"
                :error-icon = "errorIcon"
				    />
				</div>
				<div class="customer-info">
					<div class="name"><span>{{customerName}}</span><span class="customer-type">{{customerType}}</span></div>
					<div class="date"><span>时间</span><span>{{scoreTime}}</span></div>
				</div>
			</div>
			<div class="score">
				<div>
					<van-rate v-model="scoreValue" size="15" readonly />
				</div>
				<span>{{ scoreValue }}</span>
			</div>
			<div class="evaluate">
				{{evaluate}}
		    </div>
		</div>
		<div class="right" v-if="arrow">
			<i class="van-icon van-icon-arrow" @click="click"></i>
		</div>

	</div>
</template>
<script>
    import { Rate, Image as VanImage } from 'vant';
	export default {
		name: 'CustomerScore',
		components: {
			'van-rate': Rate,
			'van-image': VanImage,
		},
		props: {
			imgSrc: {type: String, default: 'http://weixiubang.club/repairManaSources/8a2ff5cac099d627235897098cf8b7e9.png'},
      // 图片不存在时默认显示的图片
      errorIcon: {type: String, default: 'http://weixiubang.club/repairManaSources/8a2ff5cac099d627235897098cf8b7e9.png'},
			customerName: { type: String, default: '未知客户'},
			customerType: {type: String, default: '未知客户类型'},
			scoreTime: {type: String, default: '****-**-**'},
			scoreValue: {type: Number, default: 2},
			evaluate: {type: String, default: '该客户很忙，没有留下任何话！'},
      arrow: {type: Boolean, default: false}
		},
		data () {
			return {


			}

		},
    computed: {
      computedSrc(){
        if (!this.imgSrc){
          return this.errorIcon;
        } else {
          return this.imgSrc;
        }
      }
    },
    methods: {
      click ()
      {
        this.$emit("click-right");
      }
    }
	}
</script>
<style scoped>
   .customer-score {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-weight: 550;
    font-size: 14px;
    text-align: left;
    position: relative;
   }
   .left {

   }
   .img-div {
   	border-radius: 50%;
    width: 40px;
    height: 40px;
    overflow: hidden;
   }
   .customer-score .head {
   	display: flex;
    padding: 5px 0;
   }
   .customer-type {
    color: #ffcd34;
    font-size: 4px;
   }
   .customer-score span {
    padding: 10px;
   }
   .customer-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
   }
   .customer-info .name {
    font-size: 16px;
   }
   .score > div {
    display: inline-block;
   }
   .customer-info .date {
    color: #D3D3D3;
    font-size: 10px;
   }
   .evaluate {
    color: #999999;
    padding: 5px 0;
    font-weight: 500;
   }
   .score {
    color: #999999;
   }
   .customer-score .right {
    height: 100%;
    display: inline-block;
    flex-grow: 1;
    text-align: end;
  }
  .customer-score .right> i {
    position: absolute;
    /* top: 50%; */
    bottom: 50%;
    transform: translate(-15px,7px);
    font-size: 15px;
    font-weight: 600;
  }
</style>