<template>
<div>
	<div class="input-box" >
		<label class="title" for="car-type">{{title}}</label>
		<div class="input-con">
			<!-- lable 的 for 属性和input 的ID 关联-->
			<div class="input-item" v-for="(item,key) in arr">
				<input type="radio" name="sex" :id="key" :ischecked="ischecked(item)" :value="item" v-model="currentValue" @change="onChange($event)">
				<label class="radio-label" :for="key">{{item}}</label>
			</div>
		</div>
	</div>
</div>
</template>
<script>
    // <jin-radio :arr="choose_datas" :on-change.sync="chooseVal" :val="chooseVal"></jin-radio>
    export default {
    	name: 'jinRadio',
        props: {
        	title:{
        		type: String,
        		default: '标题'
        	},
        	val: {
        		type: [ String, Number],
        		default: "选择项1"
        	},
        	arr: {
        		type: Array,
        		default: ['选择项1','选择项2','选择项3',]
        	},
        },
        data () {

        	return {


        		currentValue: this.val,


        	}
        },
        methods: {
        	// onChange(event){} 用这个方法定义函数吗，和用箭头方法定义函数返回的this都是component组件，function定义则不会
        	onChange(eve){
        		// console.log('methods this is', this)
        		// data中的值通过$data可以获取.因为这里的this指向Component实例
        		// console.log(this.$data.currentValue)
        		// console.log(eve);

                // 父元素通过:on-change.sync="父元素的值" 可以修改父组件的值，这个机制的原理是触发on-change事件，父组件通过watch,set 的回调来修改对应的值实现.sync是简写
        		this.$emit('update:on-change', this.$data.currentValue);

        	},

        },
        computed: {
        	// methods 和computed虽然这两种方式输出的结果是相同的，但是性能将遭受毁灭性的打击。使用这种方法mathIschecked()方法在每次页面渲染时都被执行一次（例如，使用每一个change）。
			//	如果我们有一个计算属性，那么Vue会记住计算的属性所依赖的值（在我们这个示例中，那就是item）。通过这样做，Vue只有在依赖变化时才可以计算值。否则，将返回以前缓存的值。这也意味着只要results还没有发生改变，多次访问totalMark计算属性会立即返回之前的计算结果，而不必再次执行函数。
        	// 在使用计算属性的时候，有时需要带参数。正确的写法如下
            ischecked(){
            	var self = this
            	// 在使用计算属性的时候，有时需要带参数。正确的写法如下,ischecked（item）直接在在这里带参数是要出错的
            	// this 指VueComponent
            	// console.log('computed this is', this)
	            return  function (item) {
	            	// this指向proxy
	            	// console.log('computed 中return function this is', this)
	        		if ( item == self.currentValue ) {
	        			console.log(item,self.currentValue)
	        			console.log('true')
	                    return true;
	        		}else {
	        			console.log('false')
	        			return false
	        		}

	        	}
	        }


        },
        watch: {


        },
        onready () {

        },
        mounted () {

        }
    }
</script>
<style scoped>
.input-box {
    box-sizing: border-box;
    border-bottom: 1px solid #eeeeee;
    height: auto;
    width: 100%;
    position: relative;
    font-size: 14px;
    display: flex;
    align-items: start;
    flex-direction: column;
    padding: 10px 0px 20px 0px;
}

.input-con {
	display: flex;
	align-items: row;
	padding-left: 5px;
	flex-wrap: wrap;
}
.input-box label {
    line-height: 30px;
    width: 100%;
    color: #666666;
    height: 30px;
    padding: 10px 25px;
    text-align: left;

}
.input-box .input-item {
    width: 33.3%;
    box-sizing: border-box;
}
.input-box input[type=radio] {
    display: none;
}
.input-box input {
    font-size: 14px;
    color: #7c7c7c;
    flex-shrink: 1;
    flex-grow: 1;
    width: 1.50rem;
    height: 0.20rem;
    line-height: 0.20rem;
}
.input-box input[type=radio]:checked + .radio-label {
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAfpJREFUSA29l7+LE1EQx7+zZ04xFywstBK73Gq6FDaCepVWgp0gWCjYXZPEwkICBwqJ/gcKCmK6a3OVFgpiEQQhhvsLPE4b0QgJJuN3E5fN29WVNTsuhPdmZnc+M+/HvBfx6zpSxSqMHgG+QdBX4PGgjUciwi4gBH8m+KgR13UreCGruDa4Jx89Qr+6VkNJsaFjPFNV8TgUe4aopGvC/QZuehz/3aTVVsNkb3ic6f8OhuJ0kHHPNr+kdya75hWLeC2CcdJsq/F6TflOxFtbTNK790u1nTTZambgAvCcw/3DFuV6n4HfP5B9rrQd12QrhUMdUNq2KNc793L0+DV9xaV+NtLY9RYzhreCu3Yo17MD7rfkJYeg475iIzngGeIgaqxmX2xwkdcEeH5W4irh0+i1/HsJcID48FC6PD1u54+LPDqrOlLPe7ydPOFF4Xpcn4f824xDxydP4BYr2ptQzrNNBXc3ZXSogMsW8FRwkOG7+/KJmV8g/GmeGafOcRx0qqa1qaDFuv7XgOPfxuVM4OBjwi8R3iH8SNxZFjlz5MFW493YZ8RLVbjMGS9mVanr+Yli618OlqXAYRDrDT0nU9RZ7S5y3x8I9WltLuAQULmjxyZjllvgCn9nGMQf/5PlCg4DCNpqUw8PhzzbFVVCymzLnJLj3JYlmks/Aa8XdL1/You5AAAAAElFTkSuQmCC) no-repeat top right, rgba(40, 115, 255, 0.1);
	background-size: 15px auto;
    color: #2873FF;

}
.input-box .radio-label {
    height: 40px;
    padding: 10px;
    background: #f8f8f8;
    text-align: center;
    color: #666666;
    border-radius: 2px;
    line-height: 40px;
    margin-right: 5px;
    font-family: PingFangSC-Regular;
    font-size: inherit;
    letter-spacing: 0;
}
</style>