<template>
    <!-- 文件名 文件夹 中划线命名，id 小驼峰，class 中划线。
        组件建立规范如下：
            |- components  
            |- - login-form
            |- - -index.vue   
        或者， 一般小组件用上面，系统组件用下面的规则。
            | -components
            |- - login-form
            |- - - index.js
            | - - -login-form.vue
        和父组件紧密耦合的子组件应该以父组件名作为前缀命名。
        components/
        |- TodoList.vue
        |- TodoListItem.vue
        └─ TodoListItemButton.vue
        在单文件组件中没有内容的组件应该是自闭合的
        标签的 Props 应该有统一的顺序，依次为指令、属性和事件。
     -->
    <div id="myComponent" class="jin-     -wrapper">

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
            fun () {
                // 事件定义规范,短横线，组件中使用<@change-data="doSomeThing">
                this.emit('change-data',{});
            }
            


        },
    }
</script>

<style scoped>

</style>