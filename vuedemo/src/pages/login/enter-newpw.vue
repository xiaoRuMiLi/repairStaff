<template>
	<div class="wrapper">
		<!-- 背景图区域 -->
		<jin-background
        title="输入你收到的验证码"
        content= '请将你刚刚收到的验证码，在下面的输入框逐个输入。'
        remindText= ''
        @textTap = "toRegiste"
        />
        <div class="content-father">
            <div class="content">
                <jin-input-style1
                    title="密码"
                    type="password"
                    :value.sync="password"
                    placeholder="请输入密码"
                    />
                <jin-input-style1
                    title="重复密码"
                    type="password"
                    :value.sync="repeatPassword"
                    placeholder="请重复输入密码"
                    />
                <div class="verification-code"> 输入验证码 </div>
        		<!-- 密码输入框 -->
                <van-password-input
                  :value="value"
                  :focused="showKeyboard"
                  @focus="showKeyboard = true"
                />
                <!-- 数字键盘 -->
                <van-number-keyboard
                  v-model="value"
                  :show="showKeyboard"
                  @blur="showKeyboard = false"
                />
                <div class="not-receive-wrapper">
                   <div class="remind">
                        没有收到验证码
                   </div>
                   <div class="resend">
                        {{second}}点击重新发送

                   </div>

                </div>
                <!-- 按钮 -->
                <div class="button-container">
                     <van-button type="primary" size="large" text="下一步" @click="submit"></van-button>

                </div>
            </div>
        </div>
	</div>
</template>
<script >
	import { Icon, Button, Popup, Toast, PasswordInput, NumberKeyboard  } from 'vant';
    /* setLocal 保存数据到本地 getLocal 获取数据 clearLocal 清除数据*/
    import { validator } from "@/function";
    import JinBackGround from '@/components/JinBackGround';
    import JinInputStyle1 from '@/components/JinInputStyle1';
    import { URL } from '@/web-config/apiUrl'
    export default {
        name: 'login',
        mixins: [require( '@/mixins').default],
        components: {
            Icon,
            Button,
            'van-number-keyboard': NumberKeyboard,
            'van-password-input': PasswordInput,
            'van-popup': Popup,
            'jin-background': JinBackGround,
            'jin-rember-me': JinInputStyle1,
            "jin-input-style1": JinInputStyle1
        },
        data() {
            return {
                email: null,
                showKeyboard: !0,
                value: '',
                second: '',
                repeatPassword: '',
                password: '',

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
            submit () {
                try
                {
                    validator( 'password', this.email,
                        function(item){
                            if (item instanceof Error) throw item;
                    },)

                }catch(err){
                    this.$notify(err.message)
                    return ;
                }
                if ( this.password != this.repeatPassword ) {
                    return;
                }
                console.log('xiayibu');

            },

            forgetPw () {
                console.log('forget password');
            },
            remberChange ( val ) {
                console.log('remberChange is', val);
            },
            toRegiste () {
                console.log('to registe');
            },





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
.notReceive-wrapper {
    padding: 50px var(--van-padding-md);
}
.remind {
    text-align: center;
    font-size: var(--van-font-size-md);
    color: var(--van-text-color-2);
    padding: var(--van-padding-sm) 0;
}
.resend {
    text-align: center;
    font-size: var(--van-font-size-lg);
    color: var(--van-yellow);
    padding: var(--van-padding-sm) 0;
}
.verification-code {
    color: var(--com-gray-7);
    font-size: var(--com-font-size-md);
    width: 100%;
    padding-bottom: var(--com-padding-md);
    font-weight: var(--com-font-weight-bold-2);

}


</style>
