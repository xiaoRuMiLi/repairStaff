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


export function requestMiddle ( config ) {
	let url = config.url
	let params = config.params
	if (!(url in option)) {
        return config;
	}
	// 更改对象键名
	if ( 'changeKey' in option[url] ) {
        params = changeKey( params , option[url].changeKey )
        
	}
	// 添加默认值
	if ( 'defaultVal' in option[url] ) {
        params = setDefaultVal( params , option[url].defaultVal )
	}
	config.params = params
	return config
}
