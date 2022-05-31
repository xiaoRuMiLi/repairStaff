<template>
    <div class="jin-remarks">
        <div class="content">
            <span>{{content}}</span>
        </div>
        <div class="edit">
            <van-button type="info" size="mini" icon="edit" color="#1989fa" @click="showPop">编辑</van-button>
        </div>
        <div class="bottom">
            <div class="num">
                <span>{{charactersNumber}}</span><span>/{{maxCharactersNumber}}</span>
            </div>
        </div>
        <van-popup v-model:show="show" position="bottom" :style="{ height: '40%' }" >
            <slot name="default">
                <div class="text-input">
                    <textarea name="" rows="8" v-model="tex" placeholder="输入备注信息！">

                    </textarea>
                </div>
                <div class="submit-button">
                    <div class="button-container">
                        <van-button type="default" style="width: 80%; border: 1px solid #1989fa;" @click="show=!show">取消</van-button>
                    </div>
                    <div class="button-container">
                        <van-button type="info" style="width: 80%; background-color: #1989fa;" @click="submitChange">保存</van-button>
                    </div>
                </div>
                <div class="blank">

                </div>

            </slot>
        </van-popup>
    </div>
</template>
<script>
    import { Icon, Button, Popup, Toast } from 'vant';
    import './BaseComponent/index.js';
    export default {
        name: 'jinRemarks',
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
                default: 140,
            }
        },

        data() {
            return {
                show: !1,
                tex: this.content,
            }
        },

        computed: {
            charactersNumber() {
                return this.content.length;
            },
        },

        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：
            content: function( newVal ) {
                this.tex = newVal;
            }
        },

        created() {},

        mounted() {},

        unmounted() {},

        methods: {
            showPop() {
                this.show = !this.show;
                this.tex = this.content;
            },
            submitChange () {
                this.show = !1;
                if (this.tex.length > this.maxCharactersNumber) {
                    Toast('超过了最大输入字符');
                    return ;
                }
                this.tex !== this.content && this.$emit( 'on-change', this.tex );
            },

        },
    }
</script>
<style scoped>
.jin-remarks {
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
.text-input {
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
}
.text-input textarea {
    width: 100%;
    border: 0;
    box-sizing: border-box;
}
.submit-button {
    text-align: center;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.button-container {
    flex-grow: 1;
}
.blank {
    height: 50px;
}



</style>