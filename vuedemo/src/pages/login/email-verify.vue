<template>
    <div class="wrapper">
        <!-- 背景图区域 -->
        <jin-background
        title="验证邮箱地址"
        content= '输入你注册时使用的邮箱地址，我们会发送一个验证码到该邮箱，在下一个页面输入你收到的验证码！'
        remindText= ''
        @textTap = "toRegiste"
        />
        <div class="content-father">
            <div class="content">
                <!-- 输入框容器 -->
                <div class="input-container">
                    <jin-input-style1
                    title="邮箱地址"
                    :value.sync="email"
                    placeholder="输入邮箱地址"
                    />

                </div>
                <div class="not-receive-wrapper">
                    <div class="remind" @click="$router.push({path:'/login/phone-verify'})">
                        用手机号码验证
                    </div>
                    <div class="resend" @click="reSend">
                        {{second != 0? second + "秒后点击重新发送": "发送验证码"}}

                    </div>

                </div>
                <!-- 按钮 -->
                <div class="button-container" v-show="second > 0">
                     <van-button type="primary" size="large" text="下一步" @click="submit"></van-button>

                </div>
            </div>
        </div>
    </div>
</template>
<script >
    import { Icon, Button, Popup, Toast } from 'vant';
    /* setLocal 保存数据到本地 getLocal 获取数据 clearLocal 清除数据*/
    import { validator } from "@/function";

    // import '@/config/css/global.css';
    import JinInputStyle1 from '@/components/JinInputStyle1';
    import JinBackGround from '@/components/JinBackGround';
    import JinRemberMe from '@/components/JinRemberMe';
    import { URL } from '@/web-config/apiUrl'
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
                email: null,
                second: 0,
                vKey: "",

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
                this.$router.push({path: "/login/enter-newpw",query: {verification_key: this.vKey}});
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
            async reSend ()
            {
                try
                {
                    validator( 'mail', this.email,
                        function(item)
                        {
                            if (item instanceof Error) throw item;
                        }
                    )
                }catch(err){
                    this.$notify(err.message)
                    return ;
                }
                if(this.second > 0) return;
                let self = this;
                self.second = 60;
                let intval = setInterval(() => 
                {
                    self.second -= 1;
                    if (self.second == 0)
                    {
                        clearInterval(intval);
                    }
                }, 1000);
                const result = await this.post(URL.api_userGetEmail_verify, {email: this.email});
                let data = result.data;
                console.log(data);
                this.vKey = data.verification_key;
            }





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
.notReceive-wrapper {
    padding: 50px var(--van-padding-md);
}
.remind {
    text-align: center;
    font-size: var(--van-font-size-md);
    color: var(--van-text-color-2);
    padding: var(--van-padding-sm) 0;
}


</style>
