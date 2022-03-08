<template>
	<div class="wrapper">
		<!-- 背景图区域 -->
		<jin-background
        title="谢谢你的登录"
        content= '是否已经注册过账号?'
        remindText= '立即注册'
        />
        <div class="content-father">
            <div class="content">
        		<!-- 输入框容器 -->
        		<div class="input-container">
        			<jin-input-style1
        			title="用户名"
        			:value.sync="name"
        			placeholder="请输入用户名"
        			/>
                    <jin-input-style1
                    title="密码"
                    type="password"
                    :value.sync="passWord"
                    placeholder="请输入密码"
                    />

        		</div>
                <!-- 记住我面板 -->
                <jin-rember-me
                leftText="记住我"
                rightText="找回密码"
                :isChecked.sync="isChecked"
                />
                <!-- 按钮 -->
                <div class="button-container">
                     <van-button type="primary" size="large" text="立即登录"></van-button>

                </div>
            </div>
        </div>
	</div>
</template>
<script >
	import { Icon, Button, Popup, Toast } from 'vant';
    // import '@/config/css/global.css';
    import JinInputStyle1 from '@/components/JinInputStyle1';
    import JinBackGround from '@/components/JinBackGround';
    import JinRemberMe from '@/components/JinRemberMe';
    export default {
        name: 'login',
        mixins: [require( '@/mixins').default],
        components: {
            Icon,
            Button,
            'van-popup': Popup,
            'jin-input-style1': JinInputStyle1,
            'jin-background': JinBackGround,
            'jin-rember-me': JinRemberMe,
        },
        data() {
            return {
            	name: 'name',
                passWord: 'passWord',
                isChecked: false,

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
