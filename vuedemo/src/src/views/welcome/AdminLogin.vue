<template>
    <div class="mainTag">
        <img v-if="otherInfo.bgImg" :src="otherInfo.bgImg" class="w9999 h9999" style="object-fit:cover;">
        <el-dialog
                :visible="true"
                :show-close="false"
                :modal="false"
                top="30vh"
                :width="dialogWidth"
                custom-class="transparent02"
        >
            <el-row slot="title">
                <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18" style="color:#eee">
                    <div class="largeTitle" @dblclick="hiddRefresh">{{language[otherInfo.helloTitle]}}</div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6" class="alnrit">
                    <SelectLanguage></SelectLanguage>
                </el-col>
            </el-row>
            <el-form
                    :model="ruleForm"
                    ref="ruleForm"
                    status-icon
                    :rules="rules"
                    class="alncnt"
                    @keyup.enter.native="submitForm('ruleForm')"
            >
                <el-form-item prop="username">
                    <el-autocomplete class="width80" v-model="ruleForm.username" size="medium" :maxlength="18" prefix-icon="el-icon-user" :fetch-suggestions="querySearch"
                                     @select="handleSelect"></el-autocomplete>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="width80" type="password" size="medium" v-model="ruleForm.password" :maxlength="20" show-password prefix-icon="el-icon-tickets"></el-input>
                </el-form-item>
                <el-form-item class="alncnt">
                    <mdb v-permission="1" size="medium" type="primary" @click="submitForm('ruleForm')" class="width80"> {{language.signIn}}</mdb>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    /* setLocal 保存数据到本地 getLocal 获取数据 clearLocal 清除数据*/
    import { setLocal , getLocal , clearLocal } from "@/function";

    export default {
        mixins : [ require ( "@/mymixins" ).default ] ,
        name : "login" ,
        data () {
            return {
                ruleForm : {
                    username : null ,
                    password : null
                } ,
                historicalAccount : {
                    admin : "admin" ,
                    tourist : "tourist" ,
                    users : "users" ,
                    other : "other"
                }
            };
        } ,
        components : {
            SelectLanguage : () => import("@/assets/SelectLanguage")
        } ,
        props : {} ,
        computed : {
            rules () {
                let rules = {
                    username : [ { required : true , message : "username" , trigger : "blur" } ] ,
                    password : [ { required : true , message : "password" , trigger : "blur" } ]
                };
                return rules;
            } ,
            dialogWidth () {
                return this.otherInfo.menuCollapse ? "75%" : "25%";
            }
        } ,
        watch : {} ,
        methods : {
            handleSelect ( item ) {
                this.ruleForm = {
                    username : item.value ,
                    password : item.password
                }
            } ,
            querySearch ( q , cb ) {
                let that = this;
                let options = [];
                if ( !!q ) {
                    for ( let k in that.historicalAccount ) {
                        if ( k.includes ( q ) ) {
                            options.push ( { password : this.$avoid ( that.historicalAccount[ k ] ) , value : k } );
                        }
                    }
                } else {
                    for ( let k in that.historicalAccount ) {
                        options.push ( { password : this.$avoid ( that.historicalAccount[ k ] ) , value : k } );
                    }
                }
                cb ( options );
            } ,
            hiddRefresh () {
                clearLocal ();
                history.go ( 0 );
            } ,
            resizeHandler () {
                let clientWidth = document.body.clientWidth;
                if ( clientWidth <= 963 ) {
                    this.setOtherInfo ( { menuCollapse : true } );
                } else {
                    this.setOtherInfo ( { menuCollapse : false } );
                }
            } ,
            async setWebConfig () {
                // let config = await this.$Get(`/web-config/config-admin.json`);
                let config = require ( "@/web-config/config-admin.json" );
                this.setOtherInfo ( config );
                this.$setIco ( this.otherInfo.webIco );
                this.resizeHandler ();
            } ,
            submitForm ( formName ) {
                let that = this;
                this.$refs[ formName ].validate ( valid => {
                    if ( valid ) {
                        that.login ();
                    }
                } );
            } ,
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
                        console.log(that.$router)
                        that.$router.replace ( { name : "list" } );
                    }
                } );
            }
        } ,
        mounted () {
            // let userMemory = getLocal("userMemory");
            this.ruleForm = getLocal ( "loginForm" );
            // this.historicalAccount = getLocal ( "historicalAccount" );
            // if (this.$isTrue(userMemory)) {
            if ( false ) {
                // this.setOtherInfo ( userMemory.otherInfo );
            } else {
                this.setWebConfig ();
            }
            window.addEventListener ( "resize" , this.resizeHandler );
        } ,
        beforeDestroy () {
            let that = this;
            window.removeEventListener ( "resize" , this.resizeHandler );
            /* setLocal 保存数据到本地*/
            setLocal ( "userMemory" , {
                userInfo : that.userInfo ,
                otherInfo : that.otherInfo ,
                language : that.language
            } );
            setLocal ( "loginForm" , that.ruleForm );
        }
    };
</script>