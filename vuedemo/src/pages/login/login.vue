<template>
	<div class="wrapper">
		<!-- 背景图区域 -->
		<jin-background
        title="谢谢你的登录"
        content= '是否已经注册过账号?'
        remindText= '立即注册'
        @textTap = "toRegiste"
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
                :checked.sync="isChecked"
                @rightTap = "forgetPw"
                @checkedChange = "remberChange"
                />
                <!-- 按钮 -->
                <div class="button-container">
                     <van-button type="primary" size="large" text="立即登录" @click="submit"></van-button>

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
    import validation from '@/function/formValidation';
    import { validator } from '@/function/index';
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
            	name: '',
                passWord: '',
                isChecked: true,
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
            submit () {
                console.log(this.name,this.passWord,this.isChecked);
                console.log(validation);
                try
                {
                    validator(validation.numType,Number(this.name),
                        function(item){
                            // console.log(item,' instanceof is');
                            if (item instanceof Error) throw item;
                            console.log('验证正确')
                        })
                }catch(err){
                    console.log(err.message);
                }

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
            /* 登陆 */
            login () {
                let that = this;
                this.post ( "/user/login" , {
                    username : that.ruleForm.username ,
                    password : that.ruleForm.password
                } ).then ( res => {
                    if ( res.code == 200 ) {
                        let data = res.data;
                        that.$set ( that.historicalAccount , that.ruleForm.username , that.ruleForm.password );
                        that.setUserInfo ( {
                            userName : data.username ,
                            // headerTitle: data.Nickname,
                            // headerTitle: that.language.subject,
                            userId : data.userid ,
                            userToken : data.token ,
                            userRole : data.userrole ,
                            // userProject: data.Project,
                            // projectId: that.$isTrue(res.Expand) ? res.Expand.Id : null,
                            // cooperativePartner: that.language.ABC
                        } );
                        that.lastUserInfo ();
                        /*1.this.$router.push()描述：跳转到不同的url，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。
                        2.this.$router.replace()描述：同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。
                        3.this.$router.go(n)相对于当前页面向前或向后跳转多少个页面,类似 window.history.go(n)。n可为正数可为负数。正数返回上一个页面*/
                        that.$router.replace ( { name : "list" } );
                    }
                } );
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


</style>
