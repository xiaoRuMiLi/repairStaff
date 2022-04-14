<template>
    <div class="jin-chat-pannel-wrapper">
        <div class="content">

            <div v-for="(item, key) in datas" class="item">
                <div v-if="item.onLeft" class="left-item">
                    <div class='user'>
                        <span v-text="item.name"></span>
                    </div>
                    <div class="text">
                    {{item.content}}

                    </div>
                    <div v-if=" Array.isArray(item.images) && item.images.length > 0" class="image">
                    <div class="image-container">
                        <div v-for="(i,key) in item.images" class="image-item" @click="tapImg(key,item.images)">
                            <van-image
                              :src="i"
                              fit="cover"
                              radius = "5"
                              lazy-load
                            />
                        </div>
                    </div>

                    </div>
                    <div class="date-container">
                        <div class="date">
                            <span>{{item.date}}</span>
                        </div>
                        <div class="button">
                            <van-button type="primary" size="mini">回复</van-button>
                        </div>


                    </div>

                </div>
                <div v-else class="right-item">
                    <div class='user'>
                        <span v-text="item.name"></span>
                    </div>
                    <div class="text">
                    {{item.content}}

                    </div>
                    <div v-if=" Array.isArray(item.images) && item.images.length > 0" class="image">
                    <div class="image-container">
                        <div v-for="(i,key) in item.images" class="image-item" @click="tapImg(key,item.images)">
                            <van-image
                              :src="i"
                              fit="cover"
                              radius = "5"
                              lazy-load
                            />
                        </div>
                    </div>

                    </div>
                    <div class="date-container">
                        <div class="date">
                            <span>{{item.date}}</span>
                        </div>
                        <div class="button">

                        </div>
                    </div>

                </div>


            </div>

        </div>
        <div class="space-white">
        </div>

    </div>
</template>
<script>
    import Vue from 'vue';
    import { Toast, Image as VanImage, Lazyload, ImagePreview } from 'vant';
    import './BaseComponent/index.js';
    Vue.use(Lazyload);
    export default {
        name: 'JinChatPannel',
        components: {
            VanImage,
            [ImagePreview.Component.name]: ImagePreview.Component,

        },
        props: {
            // 消息内容数组
            datas: {
                type: Array,
                default: ()=>{
                    return [
                    {
                        name: 'JinJie',
                        onLeft: !0,
                        content: ' 合并带条件的属性,有时候你可能有多个属性基于同一条件才会包含到资源响应中，',
                        images: [
                        'http://weixiubang.club/img/BTS2P8K35UU2T6Qimage.jpg',
                        'http://weixiubang.club/img/BTS2P8K35UU2T6Qimage.jpg',
                        'http://weixiubang.club/img/BTS2P8K35UU2T6Qimage.jpg'
                        ],
                        date: '2022-01-01 12:00:00'
                    },
                    {
                        name: 'JinJie',
                        onLeft: !1,
                        content: ' 合并带条件的属性,有时候你可能有多个属性基于同一条件才会包含到资源响应中，',
                        images: [

                        ],
                        date: '2022-01-01 12:00:00'
                    }
                    ]
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

        methods: {
            tapImg(index,images)
            {
                let self = this;
                console.log(index);
                ImagePreview({
                  images: images,
                  closeable: true,
                  startPosition: index,
                });

            },


        },
    }
</script>

<style scoped>
.jin-chat-pannel-wrapper {
    padding: var(--com-padding-md);
}
.item {
    position: relative;
}
.left-item {
    width: 80%;
    border-radius: 5px;
    background-color: white;
    padding: var(--com-padding-sm);
    margin-top: 20px;
}
.right-item {
    width: 80%;
    border-radius: 5px;
    background-color: var(--com-blue-grey);
    padding: var(--com-padding-sm);
    margin-left: auto;
    margin-top: 20px;
}
.right-item .user{
    color: var(--com-white);
}
.right-item .text{
    color: var(--com-text-color-3);
}
.right-item .date{
    color: var(--com-text-color-2);
}
.user {
    font-size: var(--com-font-size-lg);
    color: var(--com-text-color);
}
.content {
    background-color: var(--com-background-color);


}
.image {
    padding-bottom: var(--com-padding-sm);

}
.image-container {
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: wrap;

}
.image-item {
    width: 25%;

}
.text {
    font-size: var(--com-font-size-md);
    line-height: var(--com-font-size-xl);
    padding: var(--com-padding-sm) 0;
    color: var(--com-text-color-2);
}
.date {
    padding-bottom: var(--com-padding-sm);
    color: var(--com-text-color-3);

}
.right-item .date {
    text-align: right;
}
.right-item .user {
    text-align: right;
}
.button {
    display: flex;
    justify-content: flex-start;
    text-align: right;
}

</style>