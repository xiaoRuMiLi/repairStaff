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
                <!-- 按钮 -->
                <div class="button-container">
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
                email: null
                
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
                    validator( 'mail', this.email,
                        function(item){
                            if (item instanceof Error) throw item;
                    },)
                      
                }catch(err){
                    this.$notify(err.message)
                    return ;
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


</style>
