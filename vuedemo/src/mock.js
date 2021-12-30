// import Mock from 'mockjs';Mock.js 生成随机数据,拦截 Ajax请求 开始 前后端分离 让前端攻城师独立于后端进行开发。 增加单元测试的真实性 通过随机数据,模拟各种场景
import { $random } from "@/function"

const Mock = require ( 'mockjs' );
const h = `http://localhost:8080`
const role = { admin : 5233 , tourist : 5232 , users : 5231 , other : 5230 }
const success = { code : 200 , message : "成功" }
const warning = { code : 300 , message : "未成功" }
const danger = { code : 400 , message : "失败" }
const login = function ( r ) {
    let b = JSON.parse ( r.body );
    let u = b.username;
    if ( u == b.password ) {
        let userrole;
        let userid;
        if ( role.hasOwnProperty ( u ) ) {
            userrole = role[ u ];
            userid = `userid_${u}`;
        } else {
            userrole = role.other;
            userid = `userid_other`;
        }
        let res = {
            data : { username : Mock.mock ( `@name` ) , userrole , userid , token : Mock.mock ( `@String(30)` ) } ,
            ...success
        }
        return res;
    } else {
        return danger;
    }
}
const table = function ( r ) {
    let b = JSON.parse ( r.body );
    let page = b.page;
    let pageSize = b.pageSize;
    let reqData = b.data;
    let maxState = b.maxState;

    if ( page < 1 || page == undefined ) {
        page = 1
    }
    if ( pageSize == undefined ) {
        pageSize = 30;
    }
    if ( maxState == undefined ) {
        maxState = 4;
    }

    let start = ( page - 1 ) * pageSize
    let end = page * pageSize;

    let resData = [];
    for ( start ; start < end ; start++ ) {
        let handReqData = reqData.map ( ( e , i ) => {
            return e + ( start + 1 );
        } );
        let resObj = {};
        reqData.forEach ( ( e , i ) => {
            resObj[ e ] = handReqData[ i ]
        } );
        resData.push ( { ...resObj , state : $random ( 1 , maxState ) } )
    }

    let res = {
        data : resData ,
        total : 300 ,
        ...success
    }
    return res;
}
Mock.mock ( h + `/user/login` , 'post' , login );
Mock.mock ( h + `/data/table` , 'post' , table );
Mock.mock ( h + '/data/test', 'get', function ( options ) { console.log( ' mocck options ', options )} )
/* Mock.mock( rurl?, rtype?, template ) )
// 或者
Mock.mock( rurl, rtype, function( options ) )
Mock.mock( rurl, rtype, template )
表示当拦截到rurl和rtype的ajax请求时，将根据数据模板template生成模拟数据，并作为响应数据返回。

Mock.mock( rurl, rtype, function( options ) )
记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。

作者：彼得潘北北
链接：https://www.jianshu.com/p/c5568910e946
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

axios.post("/user/login").then(response => {
if (response.data) {
    console.log(response.data)
    alert(response.data.name)
}
})*/
export default Mock;
