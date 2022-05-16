<template>
    <div class="performance">
        <van-cell-group title="基本信息">
            <van-cell title="信息超时回复"
            :value="datas.message.value + '%'"
            :label="datas.message.days + '天|目标：低于' + datas.message.target + '%'" />

            <van-cell title="施工超时完成"
            :value="datas.construction.value + '%'"
            :label="datas.construction.days + '天|目标：低于' + datas.construction.target + '%'" />

            <van-cell title="客户评分"
            :value="datas.evaluate.value"
            :label="datas.evaluate.days + '天|目标：超过' + datas.evaluate.target" />

            <van-cell title="质检评分"
            :value="datas.inspect.value"
            :label="datas.inspect.days + '天|目标：超过' + datas.inspect.target" />

        </van-cell-group>
    </div>
</template>
<script>
    import axios from 'axios'
    import { Popup } from 'vant';
    import { URL } from '@/web-config/apiUrl';
    import conf from '@/web-config/index';
    /* const age = 'bar';  定义不需要双向绑定的数据，变量提升 */
    /*  仅仅是在template中作为渲染数据使用，自定义之后便不会在后续的操作中对其修改，不用做遍历数据劫持。这种数据如果使用Vue对其数据劫持会浪费一些性能
    const arr = Object.freeze([{
        name: 'nordon',
        age: 18
    }]) */
    export default {
        name: 'construction',
        mixins : [ require ( "@/mixins" ).default],
        components: {

        },
        data () {
           return {
               datas: {
                    message: {value: NaN, days: conf.performanceSet.message.days, target: conf.performanceSet.message.target},
                    construction: {value: NaN, days: conf.performanceSet.construction.days, target: conf.performanceSet.construction.target},
                    evaluate: {value: NaN, days: conf.performanceSet.evaluate.days, target: conf.performanceSet.evaluate.target},
                    inspect: {value: NaN, days: conf.performanceSet.inspect.days,target: conf.performanceSet.inspect.target},
               }

           }
        },
        computed: {

        },
        watch: {
            /**
            |  在watch中使用this要注意，不能用箭头函数,箭头函数中this：
            |   1.普通函数this指向它的调用者,obj.func1()就是this指向obj自己,或者这么理解obj.func1.call(obj)。
            |   2.箭头函数this和其最外层this保持一致,obj.func2(),既调用箭头函数时,最外层是obj,obj当前挂在window下,那么箭头函数的t|his同obj一样,指向window。
            |   3.obj.func3.fn(),存在多层嵌套后调用箭头函数,此时箭头函数的this依旧是与最外层(obj)保持一致,指向window
            */
        },

        created() {},

        mounted() {
           this.getMessageVal();
           this.getConstructionVal();
           this.getEvaluateVal();
           this.getInspectVal();

        },

        unmounted() {},
        beforeDestroy ()
        {
            // 开发状态的切换页面都是把页面缓存下来的，不会销毁已经打开的页面。不会执行beforedestroy
        },
        destroyed() {
            // 我们从destroyed的字面意思可知，中文意为是“销毁”的意思，当我们离开这个页面的时候，便会调用这个函数(具体可以看看vue的的生命周期)，我们常用来销毁一些监听事件及定时函数，
        },

        methods: {
            async getMessageVal () {
                const self = this;
                let data = await self.get(URL.api_messageReplyTimeOut + conf.performanceSet.message.days + "/" + conf. performanceSet.message.hours);
                if (data.data) {
                    const da = data.data;
                    let percentage = (da.time_out_count + da.time_out_not_reply_count) / da.total_count;
                    percentage = Number(percentage).toFixed(2) * 100;
                    self.datas.message.value = percentage;
                }
            },
            async getConstructionVal () {
                const self = this;
                let data = await self.get(URL.api_getConstructionRealCompleteOutTimeInDays + conf.performanceSet.construction.days);
                const da = data.data;
                let percent = Number(da.time_out_amount / da.total_amount).toFixed(2) * 100;
                self.datas.construction.value = percent;
            },
            async getEvaluateVal () {
                const self = this;
                let data = await self.get(URL.api_evaluateGetConstructionScoreAvgInDays + conf.performanceSet.evaluate.days);
                let da = data.data;
                let percent = Number(da.score_avg * 20).toFixed(2);
                self.datas.evaluate.value = percent;
            },
            async getInspectVal () {
                const self = this;
                console.log(URL.api_inspectGetScoreAvgInDays + conf.performanceSet.inspect.days);
                let data = await self.get(URL.api_inspectGetScoreAvgInDays + conf.performanceSet.inspect.days);
                let da =  data.data;
                let percent = Number(da.score_avg * 20).toFixed(2);
                self.datas.inspect.value = percent;
            }



        },
    }
</script>