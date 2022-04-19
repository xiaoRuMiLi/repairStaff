<template>
    <div class="wrapper">
        <!-- 背景图区域 -->
        <!-- hideBack 等同于:hideBack = "true" -->
        <jin-background
        :title="language.thanksForUsing"
        :content= "language.dear + userInfo.userName + language.questionsWelcome"
        :remindText= 'language.makeComplaints'
        :avatar="userInfo.avatarUrl"
        @textTap = "toMsg"
        :numbers = "nums"
        hideBack
        @avatarSet = "avatarSet"
        />
        <div class="content-father">
            <div class="content">
                <van-cell-group>
                    <div class="title" >{{language.setUp}}</div>
                    <van-cell title-class="cell-title" is-link title="账户信息" value="" />
                    <van-cell title-class="cell-title" is-link title="退出登录" value="" @click="loginOut"/>
                </van-cell-group>

            </div>
            <div class="content">
                <van-cell-group>
                    <div class="title" >{{language.chart}}</div>
                    <van-cell title-class="cell-title" is-link :title="language.constructionChart" value="" @click="toChart"/>
                </van-cell-group>

            </div>
        </div>
    </div>
</template>
<script >
    import { Icon, Button, Toast, Cell, CellGroup, Dialog } from 'vant';
    /* setLocal 保存数据到本地 getLocal 获取数据 clearLocal 清除数据*/
    import { setLocal , getLocal , clearLocal, validator } from "@/function";

    // import '@/config/css/global.css';
    import JinMineBackGround from '@/components/JinMineBackGround';
    import JinRemberMe from '@/components/JinRemberMe';
    import { URL } from '@/web-config/apiUrl'
    export default {
        name: 'mine',
        mixins: [require( '@/mixins').default],
        components: {
            Icon,
            Button,
            Cell,
            CellGroup,
            'jin-background': JinMineBackGround,
            'jin-rember-me': JinRemberMe,
        },
        data() {
            return {
                ruleForm: {email: null,password: null},
                isChecked: true,
                historicalAccount : {
                    admin : "admin" ,
                    tourist : "tourist" ,
                    users : "users" ,
                    other : "other"
                },
                nums: [
                   {tit: '积分', con: '32156'},
                   {tit: '月施工合计', con: '15000'},
                   {tit: '触发规则', con: '2'}

                ]
            }
        },

        computed: {

        },

        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：

        },

        created() {},

        mounted() {

        },

        unmounted() {},

        beforeDestroy () {
        },

        methods: {
            toMsg () {

            },
            loginOut () {
                Dialog.confirm({
                  title: '提醒',
                  message:
                    '是否确定退出当前登录账号！',
                })
                .then(() => {
                    this.get(URL.api_loginOut).then( res => {
                        console.log(res);
                        this.$router.push('login');
                    })
                })
                .catch(() => {
                    // on cancel
                });

            },
            toChart () {
                this.$router.push({path: "chart"});
            },
            avatarSet () {
                this.$router.push( {path: "mine/avatarset"});
            }




        },
    }
</script>

<style scoped>
.title {
    color: var(--com-text-color-3);
    font-size: var(--com-font-size-lg);
    font-weight: var(--com-font-weight-bold-2);
    padding: var(--com-padding-md);
}
.cell-title {
    color: var(--com-text-color);
    font-weight: var(--com-font-weight-bold);
}
.wrapper {
    background-color: var(--van-white);
}
.content-father {
    background-color: var(--van-white);
    border-radius: var(--van-border-radius-xl);
    top: -50px;
    position: relative;
}
.content {
    padding: var( --van-padding-lg);


}
.button-container {
    padding: var(--van-padding-md) 0;
}


</style>