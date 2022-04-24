
var px_ordinary_O5  = {
    name: '联邮通经济挂号普货(O5)',
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
                    to: 1000,
                    cost: 29.9,
                    registration_fee: 15.5,
                },
                {
                    from: 1000,
                    to: 2000,
                    cost: 29.9,
                    registration_fee: 15.5,
                }

            ],
            max_size: {
                length: 60,
                width: 40,
                height: 40,
            },
            min_size: {
                length: 15,
                width:10,
                height: 1,
            },
            aging: {
                min: 10,
                max: 12

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
                    to: 400,
                    cost: 43,
                    registration_fee: 18,
                },
                {
                    from: 400,
                    to: 2000,
                    cost: 36,
                    registration_fee: 21,
                },
                {
                    from: 2000,
                    to: 3000,
                    cost: 36,
                    registration_fee: 21,
                }

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
            aging: {
                min: 7,
                max: 10

            },
            // 根据长宽高来计算规则， 符合物流条件返回真，否则返回假
            rule: function( length, width, height, weight ) {
                return true
            }


        }
    }
}

export default px_ordinary_O5