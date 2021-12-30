import Vue from 'vue'
import Vuex from 'vuex'

Vue.use ( Vuex )
export default new Vuex.Store ( {
    state : {
        userInfo : {} , //用户信息
        otherInfo : {} , //其他信息
        language : {} ,//语言
        briefInfo : {}
    } ,
    /* 
    Vuex 允许我们在store中定义“getter”（可以认为是store的计算属性）。就像计算属性一样，getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算，
    可以理解类似于Vue中computed。
    使用方法：文档中 this.$store.getters.getUserInfo， 直接用store原形调用 store.getters.getUserInfo
    参考文档 https://www.cnblogs.com/wangshucheng/p/vue-004.html
    */
    getters : {
        getUserInfo ( state ) {
            //获取用户信息
            return state.userInfo;
        } ,
        getOtherInfo ( state ) {
            //获取其他信息
            return state.otherInfo;
        } ,
        getLanguage ( state ) {
            return state.language;
        } ,
        getBriefInfo ( state ) {
            return state.briefInfo;
        }
    } ,
    mutations : {
        // 定义方法，所有state的值都要在这里的方法中修改，外部修改方法如：提交名为addmu的mutations为this.$store.commit('addmu'，参数payload);
        // 参考https://www.pianshen.com/article/1264344129/
        setUserInfo ( state , value ) { //设置用户信息
            for ( let key in value ) {
                Vue.set ( state.userInfo , key , value[ key ] );
            }
            // let time = new Date ();
            // Vue.set ( state.userInfo , "lastTime" , {
            //     date : time.toLocaleString () ,
            //     second : time.getTime ()
            // } );
        } ,
        lastUserInfo ( state , value = {} ) {
            let time = new Date ();
            let date;
            if ( value.hasOwnProperty ( "date" ) ) {
                date = value.date;
            } else {
                date = time.toLocaleString ();
            }
            let second;
            if ( value.hasOwnProperty ( "second" ) ) {
                second = value.second;
            } else {
                second = time.getTime ();
            }
            /* 
                为什么使用Vue.set()
                vue.set 是全局方法，该方法对响应式的数组和对象的修改也会触发响应，如果只是赋值语句对象的内存地址没有改变，就不不会触发视图更新
                Vue.set( target, key, value )
                target：要更改的数据源(可以是对象或者数组)
                key：要更改的具体数据
                value ：重新赋的值
                官方文档 https://cn.vuejs.org/v2/api/#Vue-set
            */
            Vue.set ( state.userInfo , "lastTime" , { date , second } );
        } ,
        deleteUserInfo ( state , value ) {
            Vue.delete ( state.userInfo , value.key );
        } ,
        setOtherInfo ( state , value ) { //设置其他信息
            for ( let key in value ) {
                Vue.set ( state.otherInfo , key , value[ key ] );
            }
            // let time = new Date ();
            // Vue.set ( state.otherInfo , "lastTime" , {
            //     date : time.toLocaleString () ,
            //     second : time.getTime ()
            // } );
        } ,
        deleteOtherInfo ( state , value ) {
            Vue.delete ( state.otherInfo , value.key );
        } ,
        setLanguage ( state , value ) {
            for ( let key in value ) {
                Vue.set ( state.language , key , value[ key ] );
            }
            // let time = new Date ();
            // Vue.set ( state.language , "lastTime" , {
            //     date : time.toLocaleString () ,
            //     second : time.getTime ()
            // } );
        } ,
        setBriefInfo ( state , value ) { //设置其他信息
            for ( let key in value ) {
                Vue.set ( state.briefInfo , key , value[ key ] );
            }
        } ,
        deleteBriefInfo ( state , value ) {
            Vue.delete ( state.briefInfo , value.key );
        } ,
        clearVuex ( state ) {
            state.userInfo = {};
            state.otherInfo = {};
        }
    } ,
    actions : {
        //actions 是异步方法，mutations所有的都是同步方法
        upVuex ( context , data ) { 
        //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        // this.$store.conmit（ 方法名， 参数） 方法 是执行 mutations 里面定义的方法，mutations 相当于是setter方法，参数传入调用的方法的第二个参数
            context.commit ( data.mutations , data.value );
        }
        /* 通过该方式调用 store.dispatch ( "upVuex"
        mutations : "setOtherInfo" 是需要运行mutations中的方法，将value 参数 等于 value ，说到底就是一个做state属性的setter 函数
        store.dispatch ( "upVuex" , {
                mutations : "setOtherInfo" ,
                value : {
                    routerHistory : rhObj
                }
            } );*/
    }
} )

/*
   updateOtherInfo(key, date) {
      //添加其他的信息
      this.$store.dispatch("upVuex", {
        mutations: "updateOtherInfo",
        value: {
          key: key,
          date: date
        }
      });
    },
    updateUserInfo(key, date) {
      //添加用户的信息
      this.$store.dispatch("upVuex", {
        mutations: "updateUserInfo",
        value: {
          key: key,
          date: date
        }
      });
    },
    updateUserInfo(state, value) { //更新用户信息
      Vue.set(state.userInfo, value.key, value.date);
    },
    updateOtherInfo(state, value) { //更新其他信息
      Vue.set(state.otherInfo, value.key, value.date);
    },
    */
