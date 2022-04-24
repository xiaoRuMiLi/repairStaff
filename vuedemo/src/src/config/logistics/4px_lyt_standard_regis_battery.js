/*
* @Author: Marte
* @Date:   2021-05-30 11:29:42
* @Last Modified by:   Marte
* @Last Modified time: 2021-05-31 16:09:25
*/

'use strict';
var px_battery_OH  = {
    name: '联邮通标准挂号-带电(OH)',
    // 普货
    type: 'battery',
    volumeWeight: 8000,
    // 追踪 true 可追踪
    track: true,
     // 是否挂号
    register: true,
    country: {
        UK: {
            service: [
                {
                    from: 0,
                    to: 3000,
                    cost: 60,
                    registration_fee: 18,
                }


            ],
            max_size: {
                length: 60,
                width: 46,
                height: 40,
            },
            min_size: {
                length: 15,
                width:10,
                height: 1,
            },
            // 时效
            aging: {
                min: 5,
                max: 6

            },
            rule: function( length, width, height, weight ) {
                return true

            }


        },
         US: {
            service: [
                {
                    from: 0,
                    to: 100,
                    cost: 115,
                    registration_fee: 18,
                },
                {
                    from: 100,
                    to: 200,
                    cost: 115,
                    registration_fee: 18,
                },
                {
                    from: 200,
                    to: 450,
                    cost: 110,
                    registration_fee: 18,
                },
                {
                    from: 450,
                    to: 700,
                    cost: 119,
                    registration_fee: 18,
                },
                {
                    from: 700,
                    to: 1000,
                    cost: 115,
                    registration_fee: 9,
                },
                {
                    from: 1000,
                    to: 3000,
                    cost: 115,
                    registration_fee: 9,
                },


            ],
            max_size: {
                length: 60,
                width: 60,
                height: 60,
            },
            min_size: {
                length: 15,
                width:10,
                height: 1,
            },
            // 时效
            aging: {
                min: 7,
                max: 12

            },
            rule: function( length, width, height, weight ) {
                if ( length + (( width, height) * 2) <= 210 ) {
                    return false
                } else {
                    return true

                }

            }


        },
        FR: {
            service: [
                {
                    from: 0,
                    to: 2000,
                    cost: 70,
                    registration_fee: 18,
                }
            ],
            max_size: {
                length: 50,
                width: 50,
                height: 50,
            },
            min_size: {
                length: 14,
                width:9,
                height: 1,
            },
            // 时效
            aging: {
                min: 7,
                max: 10

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return true
            }


        },
        DE: {
            service: [
                {
                    from: 0,
                    to: 1000,
                    cost: 62,
                    registration_fee: 20,
                },
                {
                    from: 1000,
                    to: 2000,
                    cost: 62,
                    registration_fee: 20,
                },


            ],
            max_size: {
                length: 60,
                width: 40,
                height: 40,
            },
            min_size: {
                length: 21,
                width:10,
                height: 1,
            },
             // 时效
            aging: {
                min: 7,
                max: 10

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return true
            }


        },
        IT: {
            service: [
                {
                    from: 0,
                    to: 2000,
                    cost: 65,
                    registration_fee: 23,
                },


            ],
            max_size: {
                length: 60,
                width: 60,
                height: 60,
            },
            min_size: {
                length: 15,
                width:10,
                height: 1,
            },
             // 时效
            aging: {
                min: 10,
                max: 12

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {

                if ( length + width + height < 90 ) {
                    return true
                } else {
                    return false
                }
            },


        },
        ES: {
            service: [
                {
                    from: 0,
                    to: 3000,
                    cost: 62,
                    registration_fee: 18,
                },


            ],
            max_size: {
                length: 60,
                width: 60,
                height: 60,
            },
            min_size: {
                length: 14,
                width: 9,
                height: 1,
            },
             // 时效
            aging: {
                min: 7,
                max: 10

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {

                if ( length + width + height < 90 ) {
                    return true
                } else {
                    return false
                }
            },


        },
        SE: {
            service: [
                {
                    from: 0,
                    to: 2000,
                    cost: 81,
                    registration_fee: 20,
                },


            ],
            max_size: {
                length: 50,
                width: 50,
                height: 50,
            },
            min_size: {
                length: 14,
                width: 9,
                height: 1,
            },
             // 时效
            aging: {
                min: 7,
                max: 10

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return true
            },

        },
        HL: {
            service: [
                {
                    from: 0,
                    to: 2000,
                    cost: 83,
                    registration_fee: 20.5,
                },


            ],
            max_size: {
                length: 50,
                width: 50,
                height: 50,
            },
            min_size: {
                length: 14,
                width: 9,
                height: 1,
            },
             // 时效
            aging: {
                min: 7,
                max: 10

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {

                return true
            },


        },
    }
}

export default px_battery_OH