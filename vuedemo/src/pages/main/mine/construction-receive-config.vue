<!--
 * @Description: 
 * @User: King <303219462@qq.com>
 * @Date: 2024-03-06 21:16:24
-->
<template>
    <div>
        <div class="information">
             在这个页面可以通过下方新增按钮重新生成接单设置，合理的接单设置可以更加高效的完成业绩，每项设置值会影响管理员所看到的接单状态，管理员通过接单状态来判断合适的接单人员，以方便更好的管理预约和维修。
            
        </div>
        <div class="receive-config">
           <van-cell-group>
           <van-cell title="最大接单数" :value="maxCount" label="最大接单数表示接单数量超过该值则接单状态变成满载状态，如果接单金额同时超过最大接单金额设置则接单状态变成繁忙状态。"/>
           <van-cell title="最大接单金额" :value="maxAmount" label="如果接单金额超过最大接单金额设置则接单状态变成满载状态状态。"/>
           <van-cell title="忽略的小时数" :value="lgnoredHours" label="如果某个施工单当天在该数值内（单位为小时）会被完成，那么该施工单不会影响接单状态。"/>
           <van-cell title="生效状态" :value="statusText"/>
           <van-cell title="创建时间" :value="createdAt"/>
           </van-cell-group>
        </div>
        <div class="button-wrapper">
            <div class="white-space">
            </div>
            <van-button size="large" type="primary"> 重新设置 </van-button>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import { Popup, Cell, CellGroup } from 'vant';
    import { URL } from '@/web-config/apiUrl';
    import conf from '@/web-config/index';

    /**
    |   const age = 'bar';  定义不需要双向绑定的数据，变量提升
    |   仅仅是在template中作为渲染数据使用，自定义之后便不会在后续的操作中对其修改，不用做遍历数据劫持。这种数据如果使用Vue对其数
    |   据劫持会浪费一些性能
    |   const arr = Object.freeze([{
    |   name: 'nordon',
    |   age: 18
    |   }]) */
    export default {
        name: 'construction-receiver-config',
        mixins : [ require ( "@/mixins" ).default],
        components: {
            Popup,
            Cell,
            CellGroup 
        },
        data () {
            return {
                maxCount: 0,
                maxAmount: 1000.00,
                lgnoredHours: 1,
                status: true,
                createdAt: "2022-01-01 00 : 00 : 00",
            }
        },
        /* 判断是否是从详情页过来的，如果是那么不刷新页面 */
        beforeRouteEnter(to, from, next) {
            if(from.name === '路由name属性')
            { //判断是从哪个路由过来的，若是detail页面不需要刷新获取新数据，直接用之前缓存的数据即可
                to.meta.isBack = true;
            }
            next();
        },
        computed: {
            statusText()
            {
                return this.status ? "启用状态" : "失效状态";
            }
        },
        // activated 一进入当前页面页面事件，就会触发事件
        // 如果是从详情页过来的，不用刷新页面,如果本路由没有设置keep-alive 为true，则该生命周期函数不会被调用，如果上一个路由，也就是from Keep-alive属性为true，该函数也不会被调用
        activated() {
            //  console.log('this.$route',this.$route);
            if(!this.$route.meta.isBack) {
                // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
                //this.getDatas(); // ajax获取数据方法
            }
            // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack = false
            let wrapperScrollTop = this.$refs.wrapper.scrollTop;
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
            /**
             * this.$router 是Router 的实例，this.$route 是当前路由属性，
             * this.$router.currentRoute 属性就时 this.$route
             */
            this.getData();
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
            async getData() {
                let data = await this.get(URL.api_getReceiveConfig).catch(err => console.log(err));
                if( data.hasOwnProperty("data") && data.data)
                {
                    const receiveConfig = data.data;
                    this.maxAmount = receiveConfig.max_amount;
                    this.maxCount = receiveConfig.max_count;
                    this.lgnoredHours = receiveConfig.lgnored_hours;
                    this.createdAt = receiveConfig.created_at;
                    this.status = receiveConfig.status;
                }
            }
            

        },
    }
</script>
<style scoped>
    .information {
        margin-top: var(--van-padding-lg);
        padding: var(--van-padding-md);
        line-height: var(--van-line-height-lg);
        font-size: var(--van-font-size-md);
        color: var(--van-text-color);
        background: var(--van-background-color-light);
    }
    .button-wrapper {
        padding: var(--van-padding-lg);
    }
    .white-space {
        height: 100px;
    }
</style>