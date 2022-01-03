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
export function responseMiddle ( res ) {
	let url = config.url
	let data = res.data
	// 更改对象键名
	if ( url in option & 'changeKey' in option[url] ) {
        params = changeKey( params , option[url].changeKey )
        
	}
	// 添加默认值
	if ( url in option & 'defaultVal' in option[url] ) {
        params = setDefaultVal( params , option[url].defaultVal )
	}
	config.params = params
	return config
}
