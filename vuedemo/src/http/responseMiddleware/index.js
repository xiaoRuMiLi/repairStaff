import option from './config/config.json'
// 修改对象的健明
const changeKey = function (obj , conf ) {
	let  newObj = {};
	for ( let i in obj ) {
        if ( i in conf ) {

        	let newKey = conf[i];
        	newObj[newKey] = obj[i];
        	console.log(newObj)
        } else {
        	newObj[i] = obj[i];
        }    
	}
	return newObj;
}
// 增加默认值
const setDefaultVal = function ( obj , conf ) {
	for ( let i in conf ) {
        if ( !obj.hasOwnProperty(i) ) {
        	obj[i] = conf[i]
        }
	}
	return obj
}

// 还未写好，等接口做出来了再改变
/**
 * [responseMiddle ]
 * @param  {[type]} res  [description]
 * @param  {[type]} path [访问路由]
 * @return {[type]}      [description]
 */
export function responseMiddle ( res, path ) {
	console.log( res );
	console.log('path____',path);
	let data = JSON.parse( res.data );
	let isArr = Array.isArray(data);
	let isObj = o instanceof Object;
    let url =path;
    let resData = null;
    let resArr = [];
    let newRes = res;
	if ( isArr )
	{
        for ( i in data ) 
        {
        	// 更改对象键名
			if ( url in option & 'changeKey' in option[url] ) {
		        resData = changeKey( i , option[url].changeKey )
		        resArr.append(resData);
		        
			}
			// 添加默认值
			if ( url in option & 'defaultVal' in option[url] ) {
		        resData = setDefaultVal( i , option[url].defaultVal )
		        resArr.append(resData);
			}

        }
        newRes.data = resArr;
	}
	if ( isObj )
	{
		// 更改对象键名
		if ( url in option & 'changeKey' in option[url] ) {
	        resData = changeKey( i , option[url].changeKey ) 
		}
		// 添加默认值
		if ( url in option & 'defaultVal' in option[url] ) {
	        resData = setDefaultVal( i , option[url].defaultVal )    
		}
		newRes.data = resData
	}
	
	return newRes;
}
