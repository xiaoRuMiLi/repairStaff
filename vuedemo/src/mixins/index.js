let m = {
    data () {
        return {
            h : ""//全局请求地址,在config/index 下设置了跨域访问
        };
    } ,
    computed : {
        userInfo () {
            return this.$store.getters.getUserInfo;
        } ,
        otherInfo () {
            return this.$store.getters.getOtherInfo;
        } ,
        language () {
            return this.$store.getters.getLanguage;
        } ,
        briefInfo () {
            return this.$store.getters.getBriefInfo;
        }
    } ,
    watch : {
        // userInfo: {
        //   handler(newValue, oldValue) {
        //     this.$log({ text: "userInfo", newValue });
        //   },
        //   immediate: true, //最初监听
        //   deep: true //深度监听
        // },
        // otherInfo: {
        //   handler(newValue, oldValue) {
        //     this.$log({ text: "otherInfo", newValue });
        //   },
        //   immediate: true, //最初监听
        //   deep: true //深度监听
        // }
    } ,
    methods : {
        deleteOtherInfo ( k ) {
            //删除其他的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "deleteOtherInfo" ,
                value : {
                    key : k
                }
            } );
        } ,
        setOtherInfo ( v ) {
            //设置其他的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "setOtherInfo" ,
                value : v
            } );
        } ,
        deleteUserInfo ( k ) {
            //删除用户的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "deleteUserInfo" ,
                value : {
                    key : k
                }
            } );
        } ,
        setUserInfo ( v ) {
            //设置用户的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "setUserInfo" ,
                value : v
            } );
        } ,
        lastUserInfo ( v = {} ) {
            //设置用户的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "lastUserInfo" ,
                value : v
            } );
        } ,
        setBriefInfo ( v ) {
            //设置临时的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "setBriefInfo" ,
                value : v
            } );
        } ,
        deleteBriefInfo ( k ) {
            //删除临时的信息
            this.$store.dispatch ( "upVuex" , {
                mutations : "deleteBriefInfo" ,
                value : {
                    key : k
                }
            } );
        } ,
        // 这里对全局方法$Post 进行封装，调用这个函数进行request才是正确的
        post ( u , p , f , ts ) {
            let that = this;
            // console.log( 'post url', this.h + u )
            return new Promise ( ( resolve , reject ) => {
                this.$Post ( this.h + u , p , f ).then ( res => {
                    that.backRequest ( u , res , ts );
                    resolve ( res )
                } ).catch ( ( e ) => {
                    reject ( e )
                } );
            } );
        } ,
        get ( u , p , f , ts ) {
            let that = this;
            // console.log( 'get url', this.h + u )
            return new Promise ( ( resolve , reject ) => {
                this.$Get ( this.h + u , p , f ).then ( res => {
                    // 对返回数据进行预处理
                    that.backRequest ( u , res , ts );
                    resolve ( res )
                } ).catch ( ( e ) => {
                    reject ( e )
                } );
            } );
        } ,
        // 第二个参数会被转换成formdata
        upload ( u, p, ts ) {
            let that = this;
            return new Promise( ( resolve, reject ) => {
                this.$Upload ( this.h + u , p ).then ( res => {
                    // 对返回数据进行预处理
                    that.backRequest ( u , res , ts );
                    resolve ( res )
                } ).catch ( ( e ) => {
                    reject ( e )
                } );

            })

        },
        /**
         * [backRequest 返回数据预处理,调用this.$log函数打印服务器返回的值，根据返回码，弹出服务器返回的消息]
         * @param  {[type]} u   [访问服务器接口，也就是post方法的url]
         * @param  {[type]} res [服务返回数据]
         * @param  {[type]} ts  [是否页面上方弹出notify弹窗，true 弹出，false 不弹出]
         * @return {[type]}     [description]
         */
        backRequest ( u , res , ts ) {
            this.$log ( {
                u ,
                res
            } );
            let c = res.ErrCode || res.Code || res.errCode || res.code || res.Errcode || res.errcode;
            let i = this.ifServerCode ( c )
            if ( i != 1 || ts ) {
                this.eleNotify ( res.ErrMsg || res.message || res.Message , i );
            }
        } ,
        eleNotify ( t , i = 0 ) {
            //message
            //notify
            let ml = [ "info" , "success" , "warning" , "error" ]
            this.$message ( {
                message : t ,
                type : ml[ i ] ,
                duration : 3000 ,
                offset : 100 ,
                customClass : "messageBox"
            } );
        } ,
        ifServerCode ( i ) {
            let s = [ 200 ];//成功
            let w = [ 300 ];//警告
            let e = [ 400 ];//失败
            if ( s.includes ( i ) ) {
                return 1;
            } else if ( w.includes ( i ) ) {
                return 2;
            } else if ( e.includes ( i ) ) {
                return 3;
            } else return 0;
        }
    }
};
export default m;