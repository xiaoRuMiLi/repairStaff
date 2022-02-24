<template>
    <div class="wrapper">
        <div class="content">
            <span>{{content}}</span>
        </div>
        <div class="edit">
            <van-button type="primary" size="mini" icon="edit" color="#1989fa" @click="showPop">编辑</van-button>
        </div>
        <div class="bottom">
            <div class="num">
                <span>{{charactersNumber}}</span><span>/{{maxCharactersNumber}}</span>
            </div>
        </div>
        <van-popup v-model:show="show" position="bottom" :style="{ height: '40%' }" >
            <slot name="default">
                <div>
                    <textarea name="" v-model="content" placeholder="输入备注信息！">

                    </textarea>
                </div>
                <div>
                <van-button type="default">取消</van-button>
                <van-button type="primary">保存</van-button>
                </div>

            </slot>
        </van-popup>
    </div>
</template>
<script>
    import { Icon, Button, Popup } from 'vant';
    export default {
        name: 'remarks',

        components: {
            Icon,
            Button,
            'van-popup': Popup,
        },

        props: {
            content: {
                type: String,
                default: '',
            },
            maxCharactersNumber: {
                type: Number,
                default: 500,
            }

        },

        data() {
            return {
                show: !0,
                text: this.content,

            }
        },

        computed: {
            charactersNumber() {
                return this.content.length;
            },

        },

        watch: {},

        created() {},

        mounted() {},

        unmounted() {},

        methods: {
            showPop() {
                this.show = !this.show;

            },

        },
    }
</script>
<style scoped>
.wrapper {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    padding: 20px;
    line-height: 24px;
    text-align: left;
    box-sizing: border-box;
}
.content {
    color: #999999;
    border-radius: 5px;
    background-color: ;
}
.bottom {
    text-align: right;
    color: #c8c9cc;
}
.edit {
    text-align: right;
    color: #1989fa;
}

</style>