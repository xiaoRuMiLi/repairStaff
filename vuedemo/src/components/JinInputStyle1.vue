<template>
	<div class="jin-input-style1-wrapper">
	     <div class="title">
	     	{{title}}
	     </div>
	    <div class="content">
	    	<!-- v-model 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源-->
	    	<input :type="type" name="inputValue" v-model="val" :placeholder="placeholder">
	    </div>
	</div>
</template>
<script>
	import { Icon, Button, Popup, Toast } from 'vant';
    import './BaseComponent/index.js';
    export default {
        name: 'jinInputStyle1',
        components: {
            Icon,
            Button,
            'van-popup': Popup,
        },
        props: {
            type: {
                type: String,
                default: 'text'
            },
        	title: {
        		type: String,
        		default: '标题',
        	},
            value: {
                type: String,
                default: '',
            },
            maxCharactersNumber: {
                type: Number,
                default: 140,
            },
            placeholder: {
            	type: String,
            	default: '请输入',
            }
        },

        data() {
            return {
            	val: this.value,

            }
        },

        computed: {

        },

        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：
            val ( newVal ) {
            	this.$emit('update:value', newVal);
            },
            value ( newVal ) {
            	this.val = newVal;
            }


        },

        created() {},

        mounted() {},

        unmounted() {},

        methods: {


        },
    }
</script>
<style scoped>
.jin-input-style1-wrapper {
	background-color: var(--com-white);
	text-align: left;
	position: relative;
	box-sizing: border-box;
	width: 100%;
    padding: var(--com-padding-md) 0;
}
.title {
    color: var(--com-gray-7);
    font-size: var(--com-font-size-md);
    width: 100%;
    padding-bottom: var(--com-padding-md);
    font-weight: var(--com-font-weight-bold-2);
}
.content {
	width: 100%;
}
.wrapper input {
	color: var(--com-text-color-2);
	font-size: var(--com-font-size-md);
	line-height: 50px;
	height: 50px;
	width: 100%;
	box-sizing: border-box;
    border-radius: var(--com-border-radius-lg);
    border: 1px solid var(--com-text-color-3);
    padding: var(--com-padding-md);
}

</style>