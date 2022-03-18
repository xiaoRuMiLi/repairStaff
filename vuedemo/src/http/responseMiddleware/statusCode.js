/*
* @Author: Marte
* @Date:   2022-01-03 21:17:16
* @Last Modified by:   Marte
* @Last Modified time: 2022-03-18 21:05:08
*/
'use strict';
const { Toast } = require('vant');
const isDevelop = process.env.NODE_ENV === "development";

const getStatusErr = ( error, toast = true ) =>
{
    console.log('error____',error);
    // console.log(error.message);
    // console.log(error.response);
    // console.log(error.response.status);
    // 网络异常
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.message.indexOf('timeout') !== -1) {
        Toast('网络异常');
        return {
            code: -10000,
            msg: '网络异常',
        };
    }
    if (error && error.response.status) {
        switch (error.response.status) {
            case 400:
                error.message = "Bad Request/请求错误(400)";
                break;
            case 401:
                error.message = "Unauthorized/无权限,登录过期(401)";
                break;
            case 403:
                error.message = "Forbidden/拒绝访问(403)";
                break;
            case 404:
                error.message = "Not Found/无此请求(404)";
                break;
            case 408:
                error.message = "Request Timeout/请求超时(408)";
                break;
            case 500:
                error.message = "Internal Server Error/服务器错误(500)";
                break;
            case 501:
                error.message = "Not Implemented/服务未实现(501)";
                break;
            case 502:
                error.message = "Bad Gateway/网关错误(502)";
                break;
            case 503:
                error.message = "Service Unavailable/服务不可用(503)";
                break;
            case 504:
                error.message = "Gateway Timeout/网关超时(504)";
                break;
            case 505:
                error.message = "HTTP Version Not Supported/HTTP版本不受支持(505)";
                break;
            default:
                error.message = `未知错误(${error.response.status})!`;
        }
    }
    if ( toast )
    {
        Toast(error.message + ' 。 Message： ' + error.response.data.message);
    }
    return {
        code: error.response.status,
        msg: error.message,
    };
}
export default {
    getStatusErr: getStatusErr
}