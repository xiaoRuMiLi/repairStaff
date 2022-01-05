import option from './config/config.json'
// 修改对象的健明
const changeKey = function (obj , conf ) {
	let  newObj = {};
	for ( let i in obj ) {
        if ( i in conf ) {
        	let newKey = conf[i];
        	newObj[newKey] = obj[i];
        } else {
        	newObj[i] = obj[i];
        }    
	}
	return newObj;
}
// 增加默认值
const setDefaultVal = function ( obj , conf ) {
	let nObj = obj;
	for ( let i in conf ) {
        if ( !obj.hasOwnProperty(i) ) {
        	nObj[i] = conf[i] 	
        }
	}
	return nObj
}

// 还未写好，等接口做出来了再改变
/**
 * [responseMiddle ]
 * @param  {[type]} res  [description]
 * @return {[type]}      [description]
 */
export function responseMiddle ( res ) {
	console.log(res);
	const url = res.config.url;
	let data = null;
	if (typeof res.data.data == 'object') {
		data = res.data.data;
	} else {
        data = JSON.parse( res.data.data );
	}
	let isArr = Array.isArray(data);
	let isObj = Object.prototype.toString.call(data) === '[object Object]';
    let resArr = [];
    let newRes = res;
	if ( isArr )
	{
        for ( let i in data ) 
        {
        	let item = typeof data[i] == 'string'? JSON.parse( data[i] ): data[i];
        	let resData = item;
        	//如果对象为空则跳过
        	if ( Object.keys(item).length == 0 ) {
        		continue;
        	}
        	// 更改对象键名
			if ( url in option & 'changeKey' in option[url] ) {
		        resData = changeKey( item , option[url].changeKey )    
			}
			// 添加默认值
			if ( url in option & 'defaultVal' in option[url] ) {
		        resData = setDefaultVal( resData , option[url].defaultVal );   
			}
			resArr.push(resData);

        }
        newRes.data.data = resArr;
	}
	if ( isObj )
	{
		let item = typeof data == 'string'? JSON.parse( data ): data;
		// 更改对象键名
		if ( url in option & 'changeKey' in option[url] ) {
	        resData = changeKey( item , option[url].changeKey ) 
		}
		// 添加默认值
		if ( url in option & 'defaultVal' in option[url] ) {
	        resData = setDefaultVal( item , option[url].defaultVal )    
		}
		newRes.data.data = resData
	} 
	console.log(newRes);
	return newRes;
}
