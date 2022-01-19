<template>
	<div class="customer-score">
		<div class="left">
			<div class="head">
				<div class="img-div">
					<image class="img" :src="imgSrc"/>
				    <van-image
				        fill="true"
				        :src="imgSrc"
				    />
				</div>
				<div class="customer-info">
					<div class="name"><span>{{customerName}}</span><span>{{customerType}}</span></div>
					<div class="date"><span>时间</span><span>{{scoreTime}}</span></div>
				</div>
			</div>
			<div class="score">
				<div>
					<van-rate v-model="scoreValue" readonly />
				</div>
				<span>{{ scoreValue }}</span>
			</div>
			<div class="evaluate">
				{{evaluate}}
		    </div>
		</div>
		<div class="right">
			<i class="van-icon van-icon-arrow"></i>
		</div>
		
	</div>
</template>
<script>
    import { Rate, Image as VanImage } from 'vant';


	export default {
		name: 'CustomerScore',
		component: {
			'van-rate': Rate,
			'van-image': VanImage,
		},
		props: {
			imgSrc: {type: String, default: ''},
			customerName: { type: String, default: '未知客户'},
			customerType: {type: String, default: '未知客户类型'},
			scoreTime: {type: String, default: '****-**-**'},
			scoreValue: { type: Number, default: 2},
			evaluate: { type: String, default: '该客户很忙，没有留下任何话！'}
		},
		data () {
			return {
				

			}

		}
	}
</script>
<style scoped>
   .customer-score {
    display: flex;
    justify-content: space-between;
   }
   .left {

   }
   .img-div {
   	border-radius: 50%;
   }
   .img-div img {
   	width: 40px;
   	height: 40px;
   }
   .customer-score .head {
   	display: flex;
   }
</style>