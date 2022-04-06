<template>
    <div class="jin-chat-list-item">
        <div class="wrapper">
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

                <div class="message-number">
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
    export default {
        name: 'JinChatListItem',
        components: {
            VanImage,

        },
        props: {
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


        },
    }


</script>
<style scoped>
    .jin-chat-list-item {
        background-color: var(--com-background-color);
        padding-bottom: 1px solid var(--com-text-color-3);
        position: relative;
        box-sizing: border-box;
    }
    .left {
        display: flex;
        width: 70%;

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
        font-size: var(--com-font-size-md);
        color: var(--com-text-color-2);

    }
    .content-container .message {
        font-size: var(--com-font-size-xs);
        color: var(--com-text-color-3);
        text-overflow: ellipsis;
        overflow: hidden;

    }
    .message-number {


    }
    .message-number span {
        background-color: var(--com-danger-color);
        border-radius: 50%;
    }
    .date-time {
        font-size: var(--com-font-size-xs);
        color: var(--com-text-color-3);

    }




</style>