/*
* @Author: Marte
* @Date:   2022-01-03 22:09:18
* @Last Modified by:   Marte
* @Last Modified time: 2022-03-07 23:24:38
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

    /*----------------------------------- 上传图片 -----------------------------------*/
    api_imageUpload: API_BASE_URL + '/api/image/upload',
    /*----------------------------------- 删除图片 -----------------------------------*/
    api_imageDelete: API_BASE_URL + '/api/v1/image_delete/',
}
// export default 在其他文件引入时语法是 import 别名 from @/web-config/apiUrl 不能使用 import  { Url } from @/web-config/apiUrl. 要这样引用不能加default关键字
export {
    URL
}

