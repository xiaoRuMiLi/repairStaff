/*
* @Author: Marte
* @Date:   2021-05-31 15:35:23
* @Last Modified by:   Marte
* @Last Modified time: 2021-05-31 16:08:15
*/

'use strict';
var px_ordinary_PX  = {
    name: '联邮通优先挂号普货(PX)',
    // 普货
    type: 'ordinary',
    // 体积重计费规则。长*宽*高/该单位 = 体积重，
    volumeWeight: 8000,
    // 可追踪
    track: true,
    // 是否挂号
    register: true,
    country: {
        UK: {
            service: [
                {
                    from: 0,
                    to: 3000,
                    cost: 49,
                    registration_fee: 18,
                }


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
            aging: {
                min: 6,
                max: 8

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return length * width * height < 0.031
            }


        },
        US: {
            // 起重
            weight_start: 50,
            service: [
                {
                    from: 0,
                    to: 100,
                    cost: 90,
                    registration_fee: 24,
                },
                {
                    from: 100,
                    to: 200,
                    cost: 90,
                    registration_fee: 24,
                },
                {
                    from: 200,
                    to: 340,
                    cost: 100,
                    registration_fee: 28,
                },
                {
                    from: 340,
                    to: 450,
                    cost: 103,
                    registration_fee: 28,
                },
                {
                    from: 450,
                    to: 700,
                    cost: 122,
                    registration_fee: 41,
                },
                {
                    from: 700,
                    to: 1000,
                    cost: 102,
                    registration_fee: 61,
                },
                {
                    from: 1000,
                    to: 2000,
                    cost: 102,
                    registration_fee: 61,
                }

            ],
            max_size: {
                length: 60,
                width: 40,
                height: 35,
            },
            min_size: {
                length: 21,
                width:10,
                height: 1,
            },
            aging: {
                min: 5,
                max: 8

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return true
            }


        },
        FR: {
            service: [
                {
                    from: 0,
                    to: 250,
                    cost: 48,
                    registration_fee: 23,
                },
                {
                    from: 250,
                    to: 500,
                    cost: 48,
                    registration_fee: 23,
                },
                {
                    from: 500,
                    to: 3000,
                    cost: 48,
                    registration_fee: 23,
                }
            ],
            max_size: {
                length: 60,
                width: 40,
                height: 40,
            },
            min_size: {
                length: 16,
                width:11,
                height: 1,
            },
            aging: {
                min: 4,
                max: 6

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return true
            }


        }
    }
}

export default px_ordinary_PX