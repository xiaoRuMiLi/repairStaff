<template>
    <div>

    </div>
</template>
<script>
    import axios from 'axios'
    import { Popup } from 'vant';
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
        name: 'construction',
        mixins : [ require ( "@/mixins" ).default],
        components: {

        },
        data () {
           return {
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
            /**
             * this.$router 是Router 的实例，this.$route 是当前路由属性，
             * this.$router.currentRoute 属性就时 this.$route
             */
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


        },
    }
</script>