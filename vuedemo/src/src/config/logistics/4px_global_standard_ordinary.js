/*
* @Author: Marte
* @Date:   2021-05-30 11:42:48
* @Last Modified by:   Marte
* @Last Modified time: 2021-05-30 19:46:04
*/

'use strict';
var px_ordinary_QY  = {
    name: '4PX全球速递标准-普货(QY)',
    // 普货
    type: 'ordinary',
    // 是否挂号
    register: false,
    volumeWeight: 6000,
    // 追踪 true 可追踪
    track: true,
    country: {

        FR: {
            // 起重，不足50按50收
            weight_start: 50,
            // 按500克进位
            step: 500,
            // 首重500 克 收53元 所以把他计做免费重量，因为非挂号没有挂号费
            free_weight: 500,
            service: [
                {
                    from: 0,
                    to: 30000,
                    cost: 46,
                    registration_fee: 53,
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
                    cost: 81,
                    registration_fee: 24,
                },
                {
                    from: 300,
                    to: 500,
                    cost: 77.5,
                    registration_fee: 25,
                },
                {
                    from: 500,
                    to: 2000,
                    cost: 73,
                    registration_fee: 29.5,
                },
                {
                    from: 2000,
                    to: 30000,
                    cost: 73,
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
                    cost: 42,
                    registration_fee: 44,
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
                min: 7,
                max: 10

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return (length + width + height <= 145)
            }


        },
        IT: {
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
                    cost: 44,
                    registration_fee: 66.5,
                }
            ],
            max_size: {
                length: 60,
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
                min: 7,
                max: 10

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return (length + width + height <= 145)
            }


        },
        ES: {
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
                    cost: 42,
                    registration_fee: 44,
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
                min: 8,
                max: 10

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return (length + width + height <= 145)
            }


        },


    }
}

export default px_ordinary_QY