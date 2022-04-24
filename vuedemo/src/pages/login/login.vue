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
        			:value.sync="ruleForm.email"
        			placeholder="请输入用户名"
        			/>
                    <jin-input-style1
                    title="密码"
                    type="password"
                    :value.sync="ruleForm.password"
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
    /* setLocal 保存数据到本地 getLocal 获取数据 clearLocal 清除数据*/
    import { setLocal , getLocal , clearLocal, validator } from "@/function";

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
                ruleForm: {email: null,password: null},
                isChecked: true,
                historicalAccount : {
                    admin : "admin" ,
                    tourist : "tourist" ,
                    users : "users" ,
                    other : "other"
                }
            }
        },

        computed: {

        },

        watch: {
            // 在watch中使用this要注意，不能用箭头函数，否则会出错，例如：

        },

        created() {},

        mounted() {
            // 挂载语言到store
            this.languageSet = require ( "@/language/zh-CN.json" );
            /**
             * 三种改变store 状态方法
             * this.$store.state.language = language
             * */
            this.$store.commit("setLanguage",this.languageSet);
            // 设置用户的信息
            /*this.$store.dispatch ( "upVuex" , {
                mutations : "setLanguage" ,
                value : this.languageSet
            } );*/
            let userMemory = getLocal("userMemory");
            this.ruleForm = getLocal ( "loginForm" );
            this.historicalAccount = getLocal ( "historicalAccount" );
            console.log('userMemory is true: ', this.$isTrue(userMemory));

            if (this.$isTrue(userMemory)) {
                this.setOtherInfo ( userMemory.otherInfo );
            } else {
                this.setWebConfig ();
            }



        },

        unmounted() {},

        beforeDestroy () {

            // 开发状态态的切换页面都是把页面缓存下来的，不会销毁已经打开的页面。不会执行beforedestroy
            console.log('执行了beforeDestroy')
            let that = this;
            /* setLocal 保存数据到本地
               使用的window.localStorage,
               params 1 为保存的键名
               param 2 为保存的值
            */
            setLocal ( "userMemory" , {
                userInfo : that.userInfo ,
                otherInfo : that.otherInfo ,
                language : that.languageSet
            } );
            // 相当于记录上次登录信息作用
            setLocal ( "loginForm" , that.ruleForm );
        },

        methods: {
            saveInfo () {
                let that = this;
                /* setLocal 保存数据到本地
                   使用的window.localStorage,
                   params 1 为保存的键名
                   param 2 为保存的值
                */
                setLocal ( "userMemory" , {
                    userInfo : that.userInfo ,
                    otherInfo : that.otherInfo ,
                    language : that.languageSet
                } );
                // 相当于记录上次登录信息作用
                setLocal ( "loginForm" , that.ruleForm );
                // 登录用户名或者email作为键名，密码作为键值
                setLocal ( 'historicalAccount', that.historicalAccount );

            },
            console () {
                console.log('配置信息')
                console.log(getLocal("userMemory"))
                console.log(getLocal("loginForm"))
                console.log(getLocal("historicalAccount"))
                console.log('store保存信息')
                console.log(this.userInfo)
                console.log(this.otherInfo)
                console.log(this.language)
                console.log(this.briefInfo)

            },
            submit () {
                try
                {
                    validator( 'mail', this.ruleForm.email,
                        function(item){
                            if (item instanceof Error) throw item;
                    },)
                    validator( 'password', this.ruleForm.password,
                        function(item){
                            if (item instanceof Error) throw item;
                    },)
                    // console.log(this.name,this.passWord,this.isChecked);
                    this.login();
                }catch(err){
                    this.$notify(err.message)
                }


            },
            async setWebConfig () {
                // let config = await this.$Get(`/web-config/config-admin.json`);
                let config = require ( "@/web-config/admin.json" );
                this.setOtherInfo ( config );
                this.$setIco ( this.otherInfo.webIco );

            } ,

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
                this.post ( URL.api_login , {
                    email : that.ruleForm.email ,
                    password : that.ruleForm.password
                } ).then ( res => {
                    console.log(res);
                    if ( res.code == 200 ) {
                        let data = res.data;
                        /*增加修改this.data中的响应数据对象或者数组，因为普通增加属性方式并不会改变数组或者对象的内存地址。
                        增加的属性一样能够成为响应数据。使用that.$set（被修改的对象，增加的属性，增加的值）*/
                        that.$set ( that.historicalAccount , that.ruleForm.email , that.ruleForm.password );
                        // console.log('that.historicalAccount is ',that.historicalAccount);
                        that.setUserInfo ( {
                            userName : data.user_info.name ,
                            avatarUrl: data.user_info.avatarUrl,
                            // headerTitle: data.Nickname,
                            // headerTitle: that.language.subject,
                            userId : data.user_info.id ,
                            userToken : data.access_token ,
                            //userRole : data.userrole ,
                            // userProject: data.Project,
                            // projectId: that.$isTrue(res.Expand) ? res.Expand.Id : null,
                            // cooperativePartner: that.language.ABC
                        } );
                        that.lastUserInfo ();//保存userInfo的最后一次登录时间 保存键名为"lastTime" , 值为包含时间戳的对象{ date: "2022/3/10 16:15:21"second: 1646900121011 }

                        /*1.this.$router.push()描述：跳转到不同的url，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。
                        2.this.$router.replace()描述：同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。
                        3.this.$router.go(n)相对于当前页面向前或向后跳转多少个页面,类似 window.history.go(n)。n可为正数可为负数。正数返回上一个页面*/
                        this.saveInfo()
                        // 判断有没有上一页，如果有跳转到上一页，否则跳到主页
                        if (this.$route.query.goindex === 'true') {
                            that.$router.replace ( { name : "home" });
                        } else {
                            this.$router.back(-1)
                        }
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
