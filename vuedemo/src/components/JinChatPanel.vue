<template>
    <div class="jin-chat-pannel-wrapper">
        <div class="content" ref="content" style="overflow:scroll;height:100%;">

            <div v-for="(item, key) in datas" class="item" @click="tapItem(item, key)">
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
                    <div class="button-container">
                        <div class="button">
                            <van-button :type="item.reply_at && item.must_reply?'primary':'danger'" size="mini" @click="reply(item.id,key)">回复</van-button>
                        </div>
                        <div v-if="!item.read_at" class="button">
                            <van-button type="primary" size="mini" @click="read(item.id,key)">已读</van-button>
                        </div>
                    </div>

                </div>
                <div v-else style="text-align: right;">
                    <div class="right-item">
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
                        <div class="button-container">
                            <div class="button">

                            </div>
                        </div>
                    </div>

                </div>
                <div class="date">
                    <span>{{item.date}}</span>
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
            /* 点击某一条 */
            tapItem ( item, key ) {
                this.$emit('tapItem',item,key);
            },
            /* 点击回复 */
            reply (id, key)
            {
                this.$emit('tapReply', id, key );
            },
            read (id, key )
            {
                this.$emit('tapRead', id, key );
            },
            toTop () {

                // this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
                let timer = setInterval(() => {
                    let ispeed = Math.floor(this.$refs.content.scrollHeight / 20);
                    this.$refs.content.scrollTop = this.$refs.content.scrollTop + ispeed
                    // console.log(this.$refs.content.clientHeight,this.$refs.content.scrollTop,this.$refs.content.scrollHeight);
                    if (this.$refs.content.scrollTop >= (this.$refs.content.scrollHeight - this.$refs.content.clientHeight)) {
                      clearInterval(timer)
                    }
                }, 16)
            }

        },
    }
</script>

<style scoped>
.jin-chat-pannel-wrapper {
    padding: var(--com-padding-md);
    height: 100%;
    position: absolute;
    box-sizing: border-box;
    width: 100%;

}
.item {
    position: relative;
    padding: var(--com-padding-sm) 0;
}
.left-item {
    max-width: 80%;
    border-radius: 5px;
    background-color: white;
    padding: var(--com-padding-sm);
    margin-top: 20px;
    display: inline-block;
}
.right-item {
    max-width: 80%;
    border-radius: 5px;
    background-color: var(--com-blue-grey);
    padding: var(--com-padding-sm);
    margin-left: auto;
    margin-top: 20px;
    display: inline-block;
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
    /* 对连续过长的字母和数字进行强制换行*/
    word-wrap: break-word;  /* 作用机制：首先新起一行来放置长单词，新的行还是放不下这个长单词则会对长单词进行强制断句，相当于仅对连续单词和数字断行，不包括空白*/

    /* 对整个文本设置换行*/
    word-break: break-all;  /* 作用机制：将整个文本包括空白在内视作一串，如果遇到边界，则强制换行*/
}
.date {
    padding-bottom: var(--com-padding-sm);
    color: var(--com-text-color-3);
    text-align: center;

}
.right-item .date {
    text-align: right;
}
.right-item .user {
    text-align: right;
}
.button-container {
    display: flex;
}
.button {
    display: flex;
    justify-content: flex-start;
    text-align: right;
    padding: var(--com-padding-base);
}
.space-white {
    height: 100px;
}

</style>