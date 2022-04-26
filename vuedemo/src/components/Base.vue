<template>
    <div class="jin-     -wrapper">

    </div>
</template>
<script>
    import { Toast } from 'vant';
    import './BaseComponent/index.js';
    export default {
        name: 'Base',
        components: {

        },
        props: {
            // 在声明 prop 的时候，其命名应该始终使用  propA，而在模板中应该始终使用prop-a. example： <base :prop-a="val">
            // 基础类型检测 (`null` 指允许任何类型)
            propA: Number,
            // 可能是多种类型
            propB: [String, Number],
            // 必传且是字符串
            propC: {
              type: String,
              required: true
            },
            // 数值且有默认值
            propD: {
              type: Number,
              default: 100
            },
            // 数组/对象的默认值应当由一个工厂函数返回
            propE: {
              type: Object,
              default: function () {
                return { message: 'hello' }
              }
            },
            // 自定义验证函数
            propF: {
              validator: function (value) {
                return value > 10
              }
            }

        },

        data() {
            return {


            }
        },

        computed: {

        },

        watch: {
        // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：



        },

        created() {},

        mounted() {},

        unmounted() {},

        destroyed() {},

        methods: {


        },
    }
</script>

<style scoped>

</style>