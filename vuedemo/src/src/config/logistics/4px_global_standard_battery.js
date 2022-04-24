/*
* @Author: Marte
* @Date:   2021-05-30 15:47:32
* @Last Modified by:   Marte
* @Last Modified time: 2021-05-31 12:56:26
*/

'use strict';
var px_battery_QZ  = {
    name: '4PX全球速递标准-带电(QZ)',
    // 普货
    type: 'battery',
    // 是否挂号
    register: false,
    volumeWeight: 6000,
    // 追踪 true 可追踪
    track: true,
    country: {

        FR: {
            // 起重，不足50按50收
            weight_start: 500,
            // 按500克进位
            step: 500,
            // 首重500 克 收53元 所以把他计做免费重量，因为非挂号没有挂号费
            free_weight: 500,
            // 体积重和实际重量超出部分计一半重量还是计全部重量，俗话计全泡和半泡，默认为1
            full_volume: 1,

            service: [
                {
                    from: 0,
                    to: 30000,
                    cost: 48,
                    registration_fee: 54,
                }
            ],
            max_size: {
                length: 100,
                width: 100,
                height: 100,
            },
            min_size: {
                length: 14,
                width:9,
                height: 1,
            },
            // 时效
            aging: {
                min: 5,
                max: 7

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return (length + width + height <= 145)
            }


        },
        CA: {
            // 这个的意思是体积中是实际重量的2倍，按照体积重收费,默认是1
            volume_rate: 2,
             // 首重500 克 收53元 所以把他计做免费重量，因为非挂号没有挂号费
            step: 1,
            free_weight: 50,
            service: [
                {
                    from: 0,
                    to: 300,
                    cost: 109,
                    registration_fee: 25.5,
                },
                {
                    from: 300,
                    to: 500,
                    cost: 105.5,
                    registration_fee: 26.5,
                },
                {
                    from: 500,
                    to: 2000,
                    cost: 101,
                    registration_fee: 31.5,
                },
                {
                    from: 2000,
                    to: 30000,
                    cost: 101,
                    registration_fee: 31,
                },
            ],
            max_size: {
                length: 120,
                width: 120,
                height: 120,
            },
            min_size: {
                length: 14,
                width:9,
                height: 1,
            },
            // 时效
            aging: {
                min: 4,
                max: 8

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return length + width + height < 200
            }


        },
        DE: {
            // 起重，不足50按50收
            weight_start: 50,
            // 按500克进位
            step: 500,
            // 首重500 克 收53元 所以把他计做免费重量，因为非挂号没有挂号费
            free_weight: 500,
            service: [
                {
                    from: 0,
                    to: 20000,
                    cost: 45,
                    registration_fee: 45,
                }
            ],
            max_size: {
                length: 120,
                width: 60,
                height: 60,
            },
            min_size: {
                length: 21,
                width: 10,
                height: 1,
            },
            // 时效
            aging: {
                min: 6,
                max: 8

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return (length + width + height <= 145)
            }


        },
        UK: {
            // 起重，不足50按50收
            weight_start: 50,
            // 按500克进位
            step: 500,
            // 首重500 克 收53元 所以把他计做免费重量，因为非挂号没有挂号费
            free_weight: 500,
            service: [
                {
                    from: 0,
                    to: 5000,
                    cost: 65,
                    registration_fee: 90,
                },
                {
                    from: 5000,
                    to: 10000,
                    cost: 72,
                    registration_fee: 90,
                },
                {
                    from: 10000,
                    to: 20000,
                    cost: 68.5,
                    registration_fee: 90,
                },
                {
                    from: 20000,
                    to: 30000,
                    cost: 66.5,
                    registration_fee: 90,
                }
            ],
            max_size: {
                length: 120,
                width: 60,
                height: 60,
            },
            min_size: {
                length: 21,
                width: 10,
                height: 1,
            },
            // 时效
            aging: {
                min: 3,
                max: 5

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return (length + width + height <= 145)
            }
        }

    }

}

export default px_battery_QZ