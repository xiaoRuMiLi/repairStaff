<template>
	<div class="father">
		<div class="top-container">
			<div class="left-con">
				<div class="title">
					<span>{{title}}</span>

			    </div>
				<div class="amount">￥
					<span>{{amount}}</span>

			    </div>
				<div class="text-container" v-for=" item in content">
					<div class="lable">
						<div >{{ item.title }}<i></i>:</div>
					</div>
					<span class="content">{{item.content}}</span>
				</div>
			</div>

			<div class="right-con">
				<span>{{ rightTitle}} </span>

			</div>
        </div>
        <div class="bottom">
        	<div class="buttons" v-for="(item, index) in buttons">
        		<van-button plain hairline type="primary" color="#1989fa" size="mini" @click="onClick(index)">{{item}}</van-button>
        	</div>
        </div>
	</div>
</template>
<script>
import { Button } from 'vant'
export default {
	name: 'textListItem',
	components: {
		'van-button': Button,
	},
	props: {
		title: {
			type: [String],
			default: 'title'
		},
		amount: {
			type: [Number],
			default: 0,

		},
		content: {
			type: [ Array ],
			default: [
				{
					title: 'title1',
					content: 'content1',
			    },
				{
					title: 'title2',
					content: 'content2',
			    },
			    {
					title: 'title3',
					content: 'content3',
			    },
			]
		},
		buttons: {
			type: [ Array ],
			default: [
			'按钮1',
			'按钮2'

			]
		},
		rightTitle: {
			type: [String],
			default: 'rightTitle'
		},



	},
	data () {
		return {

	    }
	},
	methods: {
		onClick (index) {
			console.log( Event )
			this.$emit( 'clickButton', index )

		}

	},
}

</script>
<style scoped>
.father {
	padding: 10px;
    border-bottom: 10px solid #efefef;
    color: #646566;
    background-color: #ffffff;
    font-size: x-small;

}
.father .title {

    padding: 5px;
    font-weight: 550;
    font-size: 15px;
}

.father .amount {
	color: #f50000;
    padding: 5px 10px;
}
.father .amount> span {
    font-weight: 550;
    font-size: 15px;
}

.top-container {
	display: flex;
	flex-direction: row;
	flex-flow: row nowrap;
	justify-content: space-between;
	padding-bottom: 10px;
}
.text-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: left;
}
.left-con,.right-con {
	padding: 0 10px;
	text-align: start;

}
.left-con span {
	display: inline;
    padding: 5px 5px;
    text-align: left;

}
.left-con  {
	max-width: 70vw;

}
.buttons {
	display: inline;
	padding: 10px;
}
.bottom {
	border-top: 1px solid #efefef;
    text-align: end;
    padding: 10px 0px 0px 0px;
}
.text-container .lable {
	font-size: x-small;
	margin-right: 1vw;
	/* 如果设置了 display inline 那么就会变成内联元素，设置宽度就不会起作用 */
    /* display: inline; */
    width: 20vw; padding: 5px;
    text-align: start;

}
.text-container .lable> div {
	text-align-last:justify;
	text-align:justify;
	text-justify:distribute-all-lines; /*这行必加，兼容ie浏览器*/
	width: 100%;
}
.text-container .lable> div i {
	/*display:inline-block;*/ /*padding-left: 100%;*/
	width:100%;
	display:none;
}

.right-con> span {
	color: #1989fa;
}
</style>>
