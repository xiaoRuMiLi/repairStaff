<template>
	<div class="repair-list">
		<div class="title">
			{{title}}
		</div>
		<div class="content">
			<div v-for="(item,key) in datas" class="item" :key="key">
				<div class="key"> {{key + 1}}</div>
				<div class="repair-type"> {{item.name}} </div>
				<div class="amount"> {{item.amount}} </div>
			</div>
			<div class="total">
				<div class="key"> </div>
				<div class="repair-type"> 合计 </div>
				<div class="amount">{{amount}} </div>
			</div>
		</div>	
	</div>
</template>
<script>
	export default {
		name: 'JinRepairList',
        props: {
        	title: { type: String, default: 'title' },
        	datas: {type: Array, default: [] },
        	amount: {type:Number, default: 0 }
        }
	}
</script>
<style scoped>
.repair-list {
	padding: 20px;
	font-size: 14px;
	font-weight: 550;
	text-align: left;
	background-color: #ffffff;
}
.item,.total{
	padding: 5px 0;
	display: flex;
	font-weight: 500;
}
.item .repair-type {
	width: 70%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.repair-list .title {
	font-size: 16px;
	padding: 10px 0;
	font-weight: 600;
}
.repair-list .content {
	color: #999999;
	padding: 5px 0;
}
.repair-type, .key {
	padding-right: 10px;
}

</style>