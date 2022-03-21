/*
* @Author: Marte
* @Date:   2022-03-18 20:38:06
* @Last Modified by:   Marte
* @Last Modified time: 2022-03-21 22:43:35
*/

'use strict';
import axios from 'axios'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
const { Toast } = require('vant');
import store from '@/store';
import router from '@/router';
export const getErr = ( error, toast = true ) =>
{
    // 网络异常
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.message.indexOf('timeout') !== -1) {
        Toast('网络异常');
    }
    if (error && error.response.status) {
        if ( error.response.status == 401 ) {
            router.push({name: 'login'});
        }
    }
    return error; // 添加多个拦截器记得要返回error,其它拦截器才能获取到这个参数
}
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use ( ( res ) => {
    //对响应数据做些事
    NProgress.done ();
    return Promise.resolve ( res );
} , ( error ) => {
    NProgress.done ();
    return Promise.reject (getErr(error));
} );