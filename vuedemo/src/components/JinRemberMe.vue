<template>
    <div class="jin-rember-me-wrapper">
        <div class="left-container">
            <van-checkbox v-model="isChecked" shape="square" @change="checkedChange"></van-checkbox>
            <div class="rember-me">
                <span>{{leftText}}</span>
            </div>
        </div>

        <div class="right-container">
            <div class="forget" @click="rightTap">
                <span>{{rightText}}</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .jin-rember-me-wrapper {
        padding: var(--com-padding-md) 0;
        background-color: var(--com-background-color-light);
        display: flex;
        justify-content: space-between;
        font-size: var(--com-font-size-sm);
    }
    .left-container {
        display: flex;

    }
    .left-container span {
        color: var(--com-text-color-2);
    }
    .right-container span {
        color: var(--com-text-link-color);
    }
    .rember-me, .forget {
        padding: var(--com-padding-sm);
    }

</style>
<script>
    import { Checkbox, CheckboxGroup } from 'vant';
    import './Basecomponent/index.js';
    export default {
        name: 'jinRemberMe',
        components: {
            'van-checkbox': Checkbox,

        },
        props: {
            checked: {
                type: Boolean,
            },
            leftText: {
                type: String,
                default: '记住我'
            },
            rightText: {
                type: String,
                default: '忘记密码'
            }

        },

        data() {
            return {
                isChecked: this.checked,
            }
        },

        computed: {

        },

        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：
            checked (newVal) {
                this.isChecked = newVal;
            },
            isChecked (newVal){
                this.$emit('update:checked', newVal);
            }



        },

        created() {},

        mounted() {},

        unmounted() {},

        methods: {
            rightTap () {
                this.$emit('rightTap');
            },
            checkedChange () {
                this.$emit('checkedChange', this.isChecked );
            }
        },
    }
</script>

