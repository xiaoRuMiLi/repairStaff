<template>
    <div class="jin-chat-list-item">
        <div class="wrapper" @click="click(id)">
            <div class="left">
                <div class="avatar-container">
                    <van-image
                      round
                      width="60px"
                      height="60px"
                      :src="avatar"
                    />
                </div>
                <div class="content-container">
                    <div class="name" v-text="name">
                    </div>
                    <div class="message">
                    {{ message }}

                    </div>

                </div>

            </div>
            <div class="right">

                <div v-if="count" class="message-number">
                    <span>{{count}}</span>

                </div>
                <div class="date-time">
                    <span> {{dateTime}} </span>
                </div>

            </div>

        </div>

    </div>
</template>
<script >
    import { Image as VanImage } from 'vant';
    import './BaseComponent/index.js';
    export default {
        name: 'JinChatListItem',
        components: {
            VanImage,

        },
        props: {
            id: {
                type: [String, Number],
                required: true,
            },
            avatar: String,
            name: String,
            message: String,
            count: [String, Number],
            dateTime: String,
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
            click: function( id ) {
                this.$emit('tap',id);
            }


        },
    }


</script>
<style scoped>
    .jin-chat-list-item {
        background-color: var(--com-background-color);
        border-bottom: 1px solid var(--com-text-color-3);
        position: relative;
        box-sizing: border-box;
        padding: var(--com-padding-md) 0;
        margin: 0 var(--com-padding-md);
    }
    .wrapper {
        display: flex;
    }
    .left {
        display: flex;
        width: 70%;

    }
    .right {
        text-align: right;
    }
    .avatar-container {
        width: 60px;
        height: 60px;
    }
    .content-container {
        flex-grow: 1;
        overflow: hidden;
    }
    .content-container .name {
        font-size: var(--com-font-size-lg);
        color: var(--com-text-color-1);
        padding: 5px;

    }
    .content-container .message {
        /*设置文本两行后多余的用省略号*/
        font-size: var(--com-font-size-sm);
        color: var(--com-text-color-2);
        overflow: hidden;
        padding: 0px 5px;
        text-overflow: -o-ellipsis-lastline;
        display: -webkit-box;
        display: box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        box-sizing: border-box;
    }
    .message-number {
       padding: 5px 0;
       margin-left: auto;

    }
    .message-number span {
        color: var(--com-white);
        font-size: 10px;
        border-radius: var(--com-padding-base);
        background-color: var(--com-danger-color);
        padding: 5px;
        text-align: center;
    }
    .date-time {
        font-size: var(--com-font-size-xs);
        color: var(--com-text-color-2);
        padding: 5px 0;

    }




</style>