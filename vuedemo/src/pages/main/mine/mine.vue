<template>
    <div class="mine-wrapper">
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
                    <van-cell title-class="cell-title" is-link title="账户信息" value="" @click="toUserInfo" />
                    <van-cell title-class="cell-title" is-link title="修改密码" value="" @click="setPassWord"/>
                    <van-cell title-class="cell-title" is-link title="接单设置" value="" @click="setReceive"/>
                    <van-cell title-class="cell-title" is-link title="刷新设置" value="" @click="setWebConfig" />
                    <van-cell title-class="cell-title" is-link title="退出登录" value="" @click="loginOut"/>
                </van-cell-group>

            </div>
            <div class="content">
                <van-cell-group>
                    <div class="title" >{{language.chart}}</div>
                    <van-cell title-class="cell-title" is-link :title="language.constructionChart" value="" @click="toChart"/>
                    <van-cell title-class="cell-title" is-link :title="language.performanceInfo" value="" @click="toPerformance"/>
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
                nums: []
            }
        },

        computed: {

        },

        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：

        },

        created() {},

        mounted() {
            console.log("mine mounted___");
            this.getData();

        },

        unmounted() {},

        beforeDestroy () {
        },

        methods: {
            toMsg () {
                this.$router.push({path: "mine/opinion"});

            },
            loginOut () {
                Dialog.confirm({
                  title: '提醒',
                  message:
                    '是否确定退出当前登录账号！',
                })
                .then(() => {
                    this.get(URL.api_loginOut).then( res => {
                        this.$router.push('login');
                    })
                })
                .catch(() => {
                    // on cancel
                });

            },
            // 设置接单
            setReceive () {
                this.$router.push({path: "mine/construction-receive-config"});
            },
            toChart () {
                this.$router.push({path: "chart"});
            },
            toPerformance () {
                this.$router.push({path: "mine/performance"});
            },
            avatarSet () {
                this.$router.push( {path: "mine/avatarset"});
            },
            setPassWord ()
            {
                this.$router.push( {path: "/login/email-verify"});
            },
            toUserInfo ()
            {
                const id = this.userInfo.id;
                this.$router.push({path: `/user-info`})
            },
            async setWebConfig () {
                // 设置配置文件
                // let config = await this.$Get(`/web-config/config-admin.json`);
                let config = require ( "@/web-config/admin.json" );
                Dialog.confirm({
                  title: '提醒',
                  message:
                    '是否刷新设置！',
                })
                .then(() => {
                    this.setOtherInfo ( config );
                    this.$setIco ( this.otherInfo.webIco );
                })
                .catch(() => {
                    // on cancel
                });
            },
            async getData () {
                let data = await this.get(URL.api_constructionGetRealCompleteTotalByYm).catch(err => console.log(err));;
                let total = data.data && data.data.total;
                const notCompleteTotal = data.data && data.data.notCompleteTotal;
                this.nums = [
                    {tit: '积分', con: this.userInfo.integral},
                    {tit: '月施工合计', con: total},
                    {tit: '施工中', con: notCompleteTotal},
                ];
                   


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
.mine-wrapper {
    background-color: var(--van-white);
}
.content-father {
    background-color: var(--van-white);
    border-radius: var(--van-border-radius-xl);
    top: -50px;
    position: relative;
}
.content {
    padding: var( --van-padding-md);


}
.button-container {
    padding: var(--van-padding-md) 0;
}


</style>