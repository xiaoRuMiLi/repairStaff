<template>
    <div class="jin-back-ground-wrapper">
        <div class="go-back">
            <i class="van-icon van-icon-arrow-left" @click="goBack"></i>
        </div>
        <div class="text-group">
            <div class="title">
                <span>
                   {{title}}
                </span>
            </div>
            <div class="content">
                <span>{{content}}</span>
                <span @click="textTap">
                    <strong>{{remindText}}</strong>
                </span>
            </div>

        </div>
        <!-- 右上角圆圈装饰 -->
        <div class="circle"></div>

    </div>
</template>
<style scoped>
.jin-back-ground-wrapper {
    padding: var(--com-padding-lg);
    background-color: var(--com-blue);
    font-size: var(--com-font-size-md);
    color: var(--com-white);
    width: 100%;
    position: relative;
    box-sizing: border-box;
    height: 300px;
    overflow: hidden;
}
.go-back {
    font-weight: var(--com-font-weight-bold-2);
    text-align: left;
    height: var(--com-line-height-lg);
    line-height: var(--com-line-height-lg);
    padding: var(--com-padding-lg) 0;
    font-weight: var(--com-font-weight-bold);
    font-size: var(--com-font-size-lg);

}
.text-group {
    padding-bottom: var(--com-padding-md);
    text-align: left;
}
.text-group .title {
    font-size: var(--com-font-size-xl);
    padding: var(--com-padding-md) 0;
}
.text-group .content {
    font-size: var(--com-font-size-md);
}
.content strong {
    color: var(--com-yellow);
    font-size: var(--com-font-size-lg);
    border-bottom: 1px solid;
}
.circle {
    position: absolute;
    border: 40px solid #26262524;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    top: -50px;
    right: -50px;

}
</style>
<script>
    import { Toast } from 'vant';
    import './BaseComponent/index.js';
    export default {
        name: 'jinBackGround',
        components: {

        },
        props: {
            title: {
                type: String,
                default: 'title',
            },
            remindText: {
                type: String,
                default: '马上注册',
            },
            content: {
                type: String,
                default: 'content',
            },

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

        methods: {
            goBack () {
                this.$emit('goBack');
                this.$router.go(-1);
                // console.log(this.$router);
            },
            textTap () {
                this.$emit('textTap');
            }
        },
    }
</script>

