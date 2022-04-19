<template>
    <div class="jin-back-ground-wrapper">
        <div class="go-back">
            <i v-show="!hideBack" class="van-icon van-icon-arrow-left" @click="goBack"></i>
        </div>
        <div class="middle-container">
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
            <div class="avatar" @click="avatarTap">
                <van-image
                  round
                  width="60px"
                  height="60px"
                  :src="avatar"
                />
                <i class="van-icon van-icon-edit" @click="avatarSet"></i>
            </div>
        </div>
        <div class="bottom-content">
            <div v-for="(item,key) in numbers" :key="key + item.tit" class="bot-item" @click="numTap(key)">
                <div class="bot-content">{{item.con}}</div>
                <div class="bot-title">{{item.tit}}</div>
            </div>

        </div>
        <div class="space"></div>



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
    padding: var(--com-padding-sm) 0;
    font-weight: var(--com-font-weight-bold);
    font-size: var(--com-font-size-lg);

}
.space {
    height: 100px;
}
.text-group {
    padding-bottom: var(--com-padding-md);
    text-align: left;
    margin-right: 25px;
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
.middle-container {
    display: flex;
    justify-content: space-between;

}
.bottom-content {
    display: flex;
    padding: 0;
    justify-content: space-around;
}
.bottom-content .bot-title {
    font-size: var(--com-font-size-md);

}
.bottom-content .bot-content {
    font-size: var(--com-font-size-lg);
    font-weight: var(--com-font-weight-bold-2);


}
.bot-item {

}
.avatar {
    position: relative;
    height: 60px;

}
.avatar i{
    position: absolute;
    bottom: -5px;
    left: -10px;
    font-size: 25px;
    background: var(--com-gray-1);
    border-radius: 50%;
    color: var(--com-text-link-color);
    opacity: 0.6;


}
</style>
<script>
    import { Toast, Image as VanImage } from 'vant';
    import './BaseComponent/index.js';
    export default {
        name: 'jinBackGround',
        components: {
             'van-image': VanImage,
        },
        props: {
            hideBack: Boolean,
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
            avatar: {
                type: String,
                default: 'https://img.yzcdn.cn/vant/cat.jpeg'
            },
            numbers: {
                type: Array,
                default: function(){
                    return [
                        {
                            tit: '标题',
                            con: '内容'
                        },
                        {
                            tit: '标题',
                            con: '内容'
                        },
                        {
                            tit: '标题',
                            con: '内容'
                        }
                    ]
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
            goBack () {
                this.$emit('goBack');
                this.$router.go(-1);
                // console.log(this.$router);
            },
            textTap () {
                this.$emit('textTap');
            },
            numTap ( index ) {
                // console.log(index);
                this.$emit('numTap',index);
            },
            avatarTap () {
                this.$emit('avatarTap');
            },
            avatarSet () {
                this.$emit('avatarSet')
            }
        },
    }
</script>