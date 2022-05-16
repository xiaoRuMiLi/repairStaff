/*
* @Author: Marte
* @Date:   2022-01-03 22:09:18
* @Last Modified by:   Marte
* @Last Modified time: 2022-05-16 22:31:11
*/

'use strict';
/* 接口管理 */

const API_BASE_URL = '/Api';


/* 接口地址： */
const URL = {
/*----------------------------------- 首页 -----------------------------------*/
    getWorkHours: API_BASE_URL + '/publicDoAction.php?code=workHour-01', // 获取分页数组（新） - get

    api_getPageArrDic: API_BASE_URL + '/mock/pages', // 获取分页数组 - post
    api_getSimpleArrDic: API_BASE_URL + '/getSimpleArrDic', // 获取数组

    addHomeData: API_BASE_URL + "/home/add",
    getData: API_BASE_URL + "/home/list",
    /*----------------------------------- 订单 -----------------------------------*/
    api_constructionSearch: API_BASE_URL + '/api/v1/constructions', // 获取分页数组 - get
    /*----------------------------------- 施工单详情 -----------------------------------*/
    api_constructionShow: API_BASE_URL + '/api/v1/constructions/', // 获取详情 - get
    /*----------------------------------- 施工单标记接单时间为当前时间 -----------------------------------*/
    api_constructionSetReceiveAtToNow: API_BASE_URL + '/api/v1/construction_setReceiveAtToNow/',/*{id}, // 获取详情 - get
    /*----------------------------------- 施工单标记实际完成时间为当前时间 -----------------------------------*/
    api_constructionSetRealCompleteAtToNow: API_BASE_URL + '/api/v1/construction_setRealCompleteAtToNow/',/*{id}, // 获取详情 - get
    /*----------------------------------- 施工单修改备注 -----------------------------------*/
    api_constructionSetRemarks: API_BASE_URL + '/api/v1/construction_set_remarks/',/*{id}, //  - post
    /*----------------------------------- 按月获取近两年施工单金额合计 -----------------------------------*/
    api_constructionGetTotalGroupByMoon: API_BASE_URL + '/api/v1/get_total_group_by_moon',
    /*----------------------------------- 分享接口调用 -----------------------------------*/
    api_getWxShareTicket: '/url/weChat/index.php', // 临时接口上线时需要修改
    /*----------------------------------- 根据施工单获取相关的信息接受者 -----------------------------------*/
    api_getMessageReceiversByConstructionId:  API_BASE_URL + "/api/v1/get_message_receivers_by_construction_id/",
    /*----------------------------------- 获取一定天数施工单超时占比 -----------------------------------*/
    api_getConstructionRealCompleteOutTimeInDays:  API_BASE_URL + "/api/v1/construction/real_complete_out_time_in_days/",

    /*-登录操作------------------------------------------------------------------------*/
    /*----------------------------------- 登陆 -----------------------------------*/
    api_login: API_BASE_URL + '/api/v1/loginApi2',/*{id}, //  - post
    /*----------------------------------- 退出登陆 -----------------------------------*/
    api_loginOut: API_BASE_URL + '/api/v1/login_out',
    /*----------------------------------- 设置用户头像 -----------------------------------*/
    api_userSetAvatar: API_BASE_URL + '/api/v1/user/set_avatar',
    /*-----------------------------------获取手机验证码 -----------------------------------*/
    api_userGetPhone_verify: API_BASE_URL + '/api/v1/user/verification_codes',
     /*-----------------------------------获取邮箱验证码 -----------------------------------*/
    api_userGetEmail_verify: API_BASE_URL + '/api/v1/user/get_email_code',
    /*-----------------------------------修改密码 -----------------------------------*/
    api_userSetPassword: API_BASE_URL + '/api/v1/user/set_password',
    /*-----------------------------------获取用户信息 -----------------------------------*/
    api_userGetUserInfo: API_BASE_URL + '/api/v1/user',


    /*-图片操作------------------------------------------------------------------------*/
    /*----------------------------------- 上传图片 -----------------------------------*/
    api_imageUpload: API_BASE_URL + '/api/v1/image/upload',
    /*----------------------------------- 删除图片 -----------------------------------*/
    api_imageDelete: API_BASE_URL + '/api/v1/image/delete/',

    /*-信息操作------------------------------------------------------------------------*/
    /*----------------------------------- 消息搜索 -----------------------------------*/
    api_messageSearch: API_BASE_URL + '/api/v1/message/search',
    /*----------------------------------- 消息详情 -----------------------------------*/
    api_messageShow: API_BASE_URL + '/api/v1/message/show/',
    /*----------------------------------- 同一主题的而消息 -----------------------------------*/
    api_getMessagesByMorph: API_BASE_URL + '/api/v1/message/get_messages_by_morph/',
    /*----------------------------------- 回复一条消息 -----------------------------------*/
    api_messageReply: API_BASE_URL + '/api/v1/message/reply',
    /*----------------------------------- 一条消息标记已读 -----------------------------------*/
    api_messageRead: API_BASE_URL + '/api/v1/message/read/',
    /*----------------------------------- 创建一条新的消息 -----------------------------------*/
    api_messageCreate: API_BASE_URL + '/api/v1/message/create',
    /*----------------------------------- 统计一定时间内超时回复条数 -----------------------------------*/
    api_messageReplyTimeOut: API_BASE_URL + "/api/v1/message/reply_time_out/",  // params days/hours


    /*-统计操作------------------------------------------------------------------------*/
    /*----------------------------------- 员工版主页统计 -----------------------------------*/
    api_statistics: API_BASE_URL + '/api/v1/statistics/staff/index',
    /*----------------------------------- 质检单单位时间内平均分  ------------------------------*/
    api_inspectGetScoreAvgInDays: API_BASE_URL + "/api/v1/inspect/get_score_avg_in_days/",
    /*----------------------------------- 评价单单位时间内平均分  ------------------------------*/
    api_evaluateGetConstructionScoreAvgInDays: API_BASE_URL + "/api/v1/evaluate/get_construction_score_avg_in_days/",

    /*-公告操作------------------------------------------------------------------------*/
    /*----------------------------------- 获取最后三天公告 -----------------------------------*/
    api_getLastNotice: API_BASE_URL + "/api/v1/notice/get_last_three",

    /*-建议------------------------------------------------------------------------*/
    /*----------------------------------- 保存一条建议 -----------------------------------*/
    api_opinionStore: API_BASE_URL + "/api/v1/opinion/store",


}
// export default 在其他文件引入时语法是 import 别名 from @/web-config/apiUrl 不能使用 import  { Url } from @/web-config/apiUrl. 要这样引用不能加default关键字
export {
    URL
}

