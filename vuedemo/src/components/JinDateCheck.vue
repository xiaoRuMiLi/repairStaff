<template>
<div>
    <div class="input-box" >
        <span class="title" for="car-type">{{title}}</span>
        <div class="input-con">
            <div v-for="(item,key) in arr" :key="key" class="item">
                <button type="button" :class="isChecked(item)" @click="buttonClick(item)">{{item}}</button>
            </div>
            <div class="between-box">
                <div class="between-item"><button type="button"  @click="onOff.startDateShow = !0">{{inputs.startDate}}</button></div>
                <span>-</span>
                <div class="between-item"><button type="button"  @click="onOff.endDateShow = !0">{{inputs.endDate}}</button></div>
            </div>
        </div>
    </div>
    <van-calendar v-model="onOff.startDateShow" @confirm="onStartDateConfirm" :min-date="min" :max-date="max"/>
    <van-calendar v-model="onOff.endDateShow" @confirm="onEndDateConfirm" :min-date="min" :max-date="max"/>
</div>
</template>
<script>
    import TimeUtils from '@/utils/timeUtils';
    import { Calendar } from 'vant';
    export default {
        name: 'jinRadio',
        components: {
            'van-calendar': Calendar
        },
        props: {
            title:{
                type: String,
                default: '时间选择'
            },
            val: {
                type: [ String, Number],
                default: "近两个月"
            },
            arr: {
                type: Array,
                default: ['近两个月','近一个月','近二十天','近十天'],
            },
            minDate: {
                type: Date,
                default: ()=> { return new Date(2010, 0, 1)},
            },
            maxDate: {
                type: Date,
                default: ()=> { return new Date(2050, 0, 1)},
            }

        },
        data () {

            return {
                currentValue: this.val,
                min: this.minDate,
                max: this.maxDate,
                onOff: {
                    startDateShow: !1,
                    endDateShow: !1,

                },
                inputs: {
                    startDate: '2020-12-24',
                    endDate: '2021-01-24'
                }

            }
        },
        methods: {
            // onChange(event){} 用这个方法定义函数吗，和用箭头方法定义函数返回的this都是component组件，function定义则不会
            buttonClick(eve){
                // console.log('methods this is', this)
                // data中的值通过$data可以获取.因为这里的this指向Component实例
                // console.log(this.$data.currentValue)
                this.mathDate( eve );
                this.$data.currentValue = eve;
                // 父元素通过:on-change.sync="父元素的值" 可以修改父组件的值，这个机制的原理是触发on-change事件，父组件通过watch,set 的回调来修改对应的值实现.sync是简写
                this.$emit('update:on-change', this.inputs);

            },
            /**
             * [mathDate 通过选项值计算返回的时间开始和结束日期]
             * @param  {[type]} val [description]
             * @return {[type]}     [description]
             */
            mathDate (val) {
                let startDate = '';
                let endDate = "";
                switch ( val ) {
                    case '近两个月':
                        var myDate=new Date();
                        myDate.setMonth(myDate.getMonth()-2);
                        this.inputs.startDate = TimeUtils.Jh_timeStampToTime(myDate.getTime(), '{y}-{m}-{d}');
                        // startDate = formatDate(myDate, 'yyyy-MM-dd h:m:s');
                        this.inputs.endDate = TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}-{m}-{d}');
                        break;
                    case '近一个月':
                        var myDate=new Date();
                        myDate.setMonth(myDate.getMonth()-1);
                        this.inputs.startDate = TimeUtils.Jh_timeStampToTime(myDate.getTime(), '{y}-{m}-{d}');
                        // startDate = formatDate(myDate, 'yyyy-MM-dd h:m:s');
                        this.inputs.endDate = TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}-{m}-{d}');
                        break;
                    case '近二十天':
                        var myDate=new Date();
                        myDate.setDate(myDate.getDay()-20);
                        this.inputs.startDate = TimeUtils.Jh_timeStampToTime(myDate.getTime(), '{y}-{m}-{d}');
                        // startDate = formatDate(myDate, 'yyyy-MM-dd h:m:s');
                        this.inputs.endDate = TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}-{m}-{d}');
                        break;
                    case '近十天':
                        var myDate=new Date();
                        myDate.setDate(myDate.getDay()-10);
                        this.inputs.startDate = TimeUtils.Jh_timeStampToTime(myDate.getTime(), '{y}-{m}-{d}');
                        // startDate = formatDate(myDate, 'yyyy-MM-dd h:m:s');
                        this.inputs.endDate = TimeUtils.Jh_timeStampToTime(new Date().getTime(), '{y}-{m}-{d}');
                        break;
                    default:
                        break;
                }

            },
            onStartDateConfirm (date) {
                this.onOff.startDateShow = false;
                this.inputs.startDate = TimeUtils.Jh_timeStampToTime( date.getTime(), '{y}-{m}-{d}');
                this.$emit('update:on-change', [this.inputs.startDate,this.inputs.endDate]);

            },
            onEndDateConfirm (date) {
                this.onOff.endDateShow = false;
                this.inputs.endDate = TimeUtils.Jh_timeStampToTime( date.getTime(), '{y}-{m}-{d}');
                this.$emit('update:on-change', [this.inputs.startDate,this.inputs.endDate]);
            }


        },
        computed: {
            // methods 和computed虽然这两种方式输出的结果是相同的，但是性能将遭受毁灭性的打击。使用这种方法mathIschecked()方法在每次页面渲染时都被执行一次（例如，使用每一个change）。
            //  如果我们有一个计算属性，那么Vue会记住计算的属性所依赖的值（在我们这个示例中，那就是item）。通过这样做，Vue只有在依赖变化时才可以计算值。否则，将返回以前缓存的值。这也意味着只要results还没有发生改变，多次访问totalMark计算属性会立即返回之前的计算结果，而不必再次执行函数。
            // 在使用计算属性的时候，有时需要带参数。正确的写法如下
            isChecked(){
                var self = this
                // 在使用计算属性的时候，有时需要带参数。正确的写法如下,ischecked（item）直接在在这里带参数是要出错的
                // this 指VueComponent
                // console.log('computed this is', this)
                return  function (item) {
                    // this指向proxy
                    // console.log('computed 中return function this is', this)
                    if ( item == self.currentValue ) {
                        return 'button-hover';
                    }else {
                        return 'button-normal';
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
.title {
    font-size: 16px;
    font-weight: 500;
    cursor: default;
    padding: 10px 25px;
    color: #666666;

}
.input-con {
    display: flex;
    align-items: row;
    padding-left: 5px;
    flex-wrap: wrap;
    width: 100%;
}
.item {
    width: 33%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    color: #666666;
    padding: 0;
    margin-bottom: 3px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    border-radius: 2px;
}
.item > button {
    border: 0px;
    width: 70px;
    border-radius: 2px;
}
.button-hover {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAfpJREFUSA29l7+LE1EQx7+zZ04xFywstBK73Gq6FDaCepVWgp0gWCjYXZPEwkICBwqJ/gcKCmK6a3OVFgpiEQQhhvsLPE4b0QgJJuN3E5fN29WVNTsuhPdmZnc+M+/HvBfx6zpSxSqMHgG+QdBX4PGgjUciwi4gBH8m+KgR13UreCGruDa4Jx89Qr+6VkNJsaFjPFNV8TgUe4aopGvC/QZuehz/3aTVVsNkb3ic6f8OhuJ0kHHPNr+kdya75hWLeC2CcdJsq/F6TflOxFtbTNK790u1nTTZambgAvCcw/3DFuV6n4HfP5B9rrQd12QrhUMdUNq2KNc793L0+DV9xaV+NtLY9RYzhreCu3Yo17MD7rfkJYeg475iIzngGeIgaqxmX2xwkdcEeH5W4irh0+i1/HsJcID48FC6PD1u54+LPDqrOlLPe7ydPOFF4Xpcn4f824xDxydP4BYr2ptQzrNNBXc3ZXSogMsW8FRwkOG7+/KJmV8g/GmeGafOcRx0qqa1qaDFuv7XgOPfxuVM4OBjwi8R3iH8SNxZFjlz5MFW493YZ8RLVbjMGS9mVanr+Yli618OlqXAYRDrDT0nU9RZ7S5y3x8I9WltLuAQULmjxyZjllvgCn9nGMQf/5PlCg4DCNpqUw8PhzzbFVVCymzLnJLj3JYlmks/Aa8XdL1/You5AAAAAElFTkSuQmCC) no-repeat top right, rgba(40, 115, 255, 0.1);
    background-size: 15px auto;
    color: #2873FF;
}
.button-normal {
    background-color: #f8f8f8;
}
.between-box {
    display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    /* width: 33%; */
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    color: #666666;
    padding: 0;
    margin-bottom: 3px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    border-radius: 2px;
    border: black solid 0px;
    width: 67%
}
.between-item {
    width: 45%;
}
.between-item > button{
    border: 0;
    background-color: #f8f8f8;
}
.between-box span {
    width: 3%;
}
</style>