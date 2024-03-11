import axios from 'axios'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
const { Toast } = require('vant');
import store from '@/store';
import { formData } from '@/function'
import { requestMiddle } from '@/http/requestMiddleware'
import { responseMiddle } from '@/http/responseMiddleware'
import statusCode from '@/http/responseMiddleware/statusCode'
// 判断权限的响应拦截器
import '@/http/responseMiddleware/requireAuth'
axios.defaults.timeout = 20000;                        //响应时间
axios.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
// axios.defaults.onUploadProgress = function (p) {
// NProgress.set((p.loaded / p.total));
// }
// axios.defaults.onDownloadProgress = function (p) {
// NProgress.set((p.loaded / p.total));
// }
// 路由
var path = '';
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use ( ( config ) => {

    let newConfig = requestMiddle( config )
    path = config.url;
    //在发送请求之前做某件事
    NProgress.start ();
    // 设置访问token
    let token = store.state.userInfo.userToken
    newConfig.headers.Authorization = `${token ? token : ''}`
    // 接收json
    newConfig.headers.Accept = 'application/json';
     // console.log("newConfig is______________ ", newConfig);
    return newConfig;
} , ( error ) => {
    NProgress.done ();
    return Promise.reject ( error );
} );

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use ( ( res ) => {
    //对响应数据做些事
    NProgress.done ();
    // 增加了键名转换和默认值处理的中间件
    let newRes = responseMiddle( res );
    // 因为这里返回的是res.data,所以注册多个拦截器的话，这个只能是最后一个拦截器
    return Promise.resolve ( newRes.data );
} , ( error ) => {
    NProgress.done ();
    // 对系统返回code做统一弹出提示处
    return Promise.reject (statusCode.getStatusErr(error));
    //return Promise.reject ( error );
} );


function mes () {
    /* ELEMENT.Message ( {
        message : store.state.language.serveError ,
        type : "error" ,
        duration : 3000 ,
        customClass : "messageBox"
    } );*/
    //Toast("访问服务器的时候出现了一个错误");
    console.log('在访问服务器的时候出现了一个错误')
}


//返回一个Promise(发送post请求)
export function fetchPost ( url , params , form ) {
    let reqTime = new Date ().getTime ();
    if ( params ) {
        params.reqTime = reqTime;
    } else {
        params = { reqTime }
    }
    if ( form ) {
        params = formData ( params );
    }
    return new Promise ( ( resolve , reject ) => {
        axios.post ( url , params )
            .then ( response => {
                resolve ( response );
            } , err => {
                reject ( err );
                mes ();
            } )
            .catch ( ( error ) => {
                reject ( error )
                mes ();
            } )
    } )
}

////返回一个Promise(发送get请求)
export function fetchGet ( url , param , form ) {
    let reqTime = new Date ().getTime ();
    if ( param ) {
        param.reqTime = reqTime;
    } else {
        param = { reqTime }
    }
    if ( form ) {
        param = formData ( param );
    }
    return new Promise ( ( resolve , reject ) => {
        axios.get ( url , { params : param } )
            .then ( response => {
                resolve ( response )
            } , err => {
                reject ( err )
                mes ();
            } )
            .catch ( ( error ) => {
                reject ( error )
                mes ();
            } )
    } )
}
////返回一个Promise 上传资料
export function fetchUpload ( url , param  ) {
    let reqTime = new Date ().getTime ();
    if ( param ) {
        param.reqTime = reqTime;
    } else {
        param = { reqTime }
    }

    param = formData ( param );

    return new Promise ( ( resolve , reject ) => {
        const headers = { "Content-Type": "multipart/form-data"};
        axios.post ( url , param ,{headers: headers} )
            .then ( response => {
                resolve ( response )
            } , err => {
                reject ( err )
                mes ();
            } )
            .catch ( ( error ) => {
                reject ( error )
                mes ();
            } )
    } )
}

export default {
    fetchPost ,
    fetchGet ,
    fetchUpload ,
}
