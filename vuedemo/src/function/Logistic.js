/*
* @Author: Marte
* @Date:   2021-05-30 17:26:33
* @Last Modified by:   Marte
* @Last Modified time: 2021-06-03 17:39:58
*/

'use strict';
import px_battery_OH from '@/config/logistics/4px_lyt_standard_regis_battery.js'
import px_battery_QZ from '@/config/logistics/4px_global_standard_battery.js'
import px_ordinary_QY from '@/config/logistics/4px_global_standard_ordinary.js'
import px_ordinary_O5 from '@/config/logistics/4px_lyt_cheap_regis_ordinary.js'
import px_ordinary_QC from '@/config/logistics/4px_lyt_standard_regis_ordinary.js'
import px_ordinary_PX from '@/config/logistics/4px_lyt_first_regis_ordinary.js'
import  LOGISTIC from '@/config/setting/logistic.js'
/**
 * [get_logistic 根据运费模板计算运费]
 * @param  {[type]} obj    [description]
 * @param  {[type]} length [description]
 * @param  {[type]} width  [description]
 * @param  {[type]} height [description]
 * @param  {[type]} weight [description]
 * @return {[type]}        [description]
 */
function Logistic( obj, country ) {
    var self = this
    self.obj = obj;
    this.msg = {
        country: '国家或地区不正确或者不在设置服务的范围内',
        length: '长度单位必须为大于0的数字',
        width: '宽度单位必须为大于0的数字',
        height: '高度单位必须为大于0的数字',
        weight: '重量单位必须为大于0的数字',
        over_weight: '超出了服务的重量段',
        over_length: '长宽高超出了服务的尺寸',
        over_rule: '超出了服务尺寸的规则'
    }
    self.msgText = '';
    self.verify = {
        country: function ( data ) {
            if ( LOGISTIC.countryList.indexOf(data) != -1 && self.obj.country.hasOwnProperty( data )) {
                return true
            } else {
                return false
            }

        },
        length: function ( data ) {
            if (Number(data) > 0) {
                return true
            } else {
                return false
            }

        },
        width: function ( data ) {
            if (Number(data) > 0) {
                return true
            } else {
                return false
            }

        },
        height: function ( data ) {
            if (Number(data) > 0) {
                return true
            } else {
                return false
            }

        },
        weight: function ( data ) {
            if (Number(data) > 0) {
                return true
            } else {
                return false
            }

        },

    }
    // 计泡重单位
    self.volumeWeight = 8000
    // 是否计泡超过实际重量计半泡还是全泡
    self.full_volume = 1
    self.country = country
    // 计费重
    self.cost_weight = 0
    // 体积重
    self.volWei = 0
    // 运费
    self.freight = 0
    // 免费重
    self.free_weight = 0
    // 步重
    self.step_weight = 0
    // 挂号费
    self.registration_fee = 0
    // 运费名称
    self.name = ''
    // 是否追踪
    self.track = true
     // 是否挂号
    self.register = true
    // 是普货还是带电
    self.type = ''
    // 起重
    self.weight_start = 0
    // 时效
    self.aging = { min: 0, max: 1 }
}
Logistic.prototype.constructor = Logistic
// 全部正确返回假 错误返回错误的消息
Logistic.prototype.getInputErrMsg = function ( ) {
    var self = this;
    var msgText = 'undefined'
    for ( let key in self.verify) {
        if ( self.hasOwnProperty(key) && typeof self.verify[key] == 'function' ){
            var result = self.verify[key](self[key])
            if ( !result ) {
                self.msgText = msgText = self.msg[key]
                break;
            }
        }
    }
    return msgText != 'undefined'? msgText: false

}
Logistic.prototype.checkInput = function ( ) {
    var self = this;
    var errMsg = self.getInputErrMsg();
    // 正常则不需要提示错误
    if ( errMsg ) {
        self.msgText = errMsg;
        return errMsg;
    }
    self.name = self.obj.name
    // 是否追踪
    self.track = self.obj.track
     // 是否挂号
    self.register = self.obj.register
    // 计泡单位
    self.volumeWeight = self.obj.hasOwnProperty('volumeWeight')? self.obj.volumeWeight:  8000
    self.type = self.obj.type
    return false


}
Logistic.prototype.getServiceInfo = function ( length, width, height, weight ) {
    var self = this;
    self.length = length
    self.width = width
    self.height = height
    self.weight = weight
    let inputCheck = self.checkInput()
    if (inputCheck) {
        return;
    }
    let currentConuntry = self.obj.country[self.country]
    let services = currentConuntry.service
    function getService ( weight,services ) {
        let res = false
        services.forEach( function (i){
            if ( weight > i.from && weight <= i.to ) {
                res = i
            }

        })
        return res
    }

    // 体积重
    self.volWei = (self.length * self.width * self.height / self.volumeWeight * 1000).toFixed(2)
    // 实际计费重量 = 体积重和实际重哪个更重，差 乘以 超出部分计半泡还是全泡，普遍是全泡，再加上质量重量
    self.cost_weight = self.volWei > self.weight? (self.volWei - self.weight) * self.full_volume + self.weight: self.weight
    let service = getService ( self.cost_weight, services )
    self.msgText = 'success'
    self.aging = currentConuntry.aging
    if  ( !service ) {

        self.msgText = self.msg.over_weight
        return false
    }
    if ( typeof currentConuntry.rule == 'function '){
        if ( !currentConuntry.rule( self.length, self.width, self.height, self.weight ) ) {

            self.msgText = self.msg.over_rule
            return false
        }
    }
    let is_over_length = self.isOverLength(currentConuntry.max_size, currentConuntry.min_size)
    if ( is_over_length ) {

        self.msgText = is_over_length
        return false

    }
    // 求免费重，就是那种首重多少公斤，然后多少钱那种，好多钱则计算在挂号费里面，全球速递就是这种
    self.free_weight = currentConuntry.hasOwnProperty( 'free_weight' )? currentConuntry.free_weight: 0;
    // 起重， 如果没有超过起重则按照起重计算
    self.weight_start = currentConuntry.hasOwnProperty('weight_start')? currentConuntry.weight_start: 0
    // 求步重
    self.step_weight = currentConuntry.hasOwnProperty('step')? currentConuntry.step: 1;
    // 求计费重
    // 向上取整,有小数就整数部分加1
    self.cost_weight = Math.ceil(self.cost_weight/self.step_weight) * self.step_weight
    self.registration_fee = service.registration_fee
    let end_weight = self.cost_weight > self.free_weight? self.cost_weight - self.free_weight: 0
    // 和起步重比较按照大者来算
    end_weight = self.weight_start > end_weight? self.weight_start: end_weight
    self.freight = end_weight/ 1000 * service.cost + self.registration_fee
    /*console.log('volWei' , self.volWei)
    console.log('amout', self.freight)
    console.log('service', service)
    console.log('cost_weight2' , self.cost_weight)
    console.log('end_weight' , end_weight)
    console.log('free_weight' , self.free_weight)*/
    return {
        name: self.name,
        country: self.country,
        track: self.track,
        type: self.type,
        register: self.register,
        freight : self.freight,
        aging: self.aging,
        msg: self.msgText

    }

}
//  不接受的尺寸返回真， 接受的尺寸返回假
Logistic.prototype.isOverLength = function ( max_size, min_size ) {
    var self = this;
    if (self.length > max_size.length || self.width > max_size.width || self.length < min_size.length || self.width < min_size.width || self.height < min_size.height){
        return self.msg.over_length
    } else {
        return false
    }

}
export { Logistic, px_battery_OH, px_battery_QZ, px_ordinary_QY, px_ordinary_O5, px_ordinary_QC, px_ordinary_PX }

/**var logistic = new Logistic( px_battery_OH, 'DE' )
var logistic1 = new Logistic( px_battery_QZ, 'DE' )
var logistic2 = new Logistic( px_ordinary_QY, 'DE' )
var logistic3 = new Logistic( px_ordinary_O5, 'DE' )
var logistic4 = new Logistic( px_ordinary_QC, 'DE' )
var logistic5 = new Logistic( px_ordinary_PX, 'US' )
var result = logistic.getServiceInfo( 30 , 20 , 20, 20)
var result1 = logistic1.getServiceInfo( 30 , 20. , 20, 20)
var result2 = logistic2.getServiceInfo( 30 , 20 , 20, 20)
var result3 = logistic3.getServiceInfo( 30 , 20 , 20, 20)
var result4= logistic4.getServiceInfo( 30 , 20 , 20, 20)
var result5= logistic5.getServiceInfo( 30 , 20 , 20, 20)
console.log( result, result1, result2, result3, result4, result5 )**/