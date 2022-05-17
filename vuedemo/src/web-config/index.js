/*
* @Author: Marte
* @Date:   2022-01-08 21:33:12
* @Last Modified by:   Marte
* @Last Modified time: 2022-05-15 23:12:30
*/

'use strict';
export default {
    // 返回集合每次数量
    numberPerPage: 20,
    // 默认图片文件前缀，如果缺失自动补全
    remoteImageFolder: 'http://weixiubang.club/img/',
    // 模型Str
    models: {
    	message: "message",
    	construction: "construction",
    },
    // 绩效get数据时的params
    performanceSet: {
        construction: {days: 30, target: 20},
        message: {days: 30, hours: 24, target: 10}, // days：300 时间周期300天。hours: 24。超过24小时回复的会被判断为超时回复。 
        evaluate: {days: 30, target: 80},
        inspect: {days: 30, target: 80}
    }


}