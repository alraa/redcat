const request = require('request')
const sugar = require('sugar')
const md5 = require('md5')
const config = require('../../../config')

exports.createTrack = ({
    country,
    province,
    city,
    address,
    name,
    phone,
    goodsName,
    goodsPrice,
    fast,
    localOrder,
    weight,
}) =>
    new Promise((resolve, reject) => {
        let param = {
            time: '' + new sugar.Date().format('{year}-{MM}-{dd} {HH}:{mm}:{ss}').raw,
            country: '' + country,
            province: '' + province,
            city: '' + city,
            address: '' + address,
            name: '' + name,
            phone: '' + phone,
            'goods name': goodsName,
            'goods price': '' + Math.ceil(+goodsPrice / 9.7),
            'fast or not': '' + fast ? 'true' : 'false',
            'local order': '' + localOrder,
            weight: '' + Math.ceil(weight),
            length: '0',
            width: '0',
            height: '0',
        }

        return request(
            {
                method: 'POST',
                url: `http://api.std-express.com/getNewOrder.std`,
                qs: {
                    customer: config.std_express.customer,
                    sign: md5(
                        param['local order'] + param.time + config.std_express.key + config.std_express.customer,
                    ).toUpperCase(),
                    param: JSON.stringify(param),
                },
            },
            (err, res, body) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(body))
                }
            },
        )
    })

/**
 * 			error codes
 *	1,	user not exist
 *	2,	authorize failure.
 *	3,	Datetime format error.
 *	4,	Datetime is not the current day.
 *	5,	country not exist
 *	6,	province not exist
 *	7,	city not exist.
 *	8,	address error.
 *	9,	receive person name is empty.
 *	10,	destination phone number error.
 *	11,	goods name is empty or too long.
 *	12,	goods price is not suitable.
 *	13,	not select fast or slow mode.
 *	14,	local order number is empty.
 *	15,	local order number is repeat.
 *	16,	request order numbers is out of range one day.
 *	17,	std system busy.
 *	18, JSON format error.
 *	19,	out of range orders one days.
 *
 *
 * 	res ~~ {"status":"false","reason":"10"}
 */

// 'russia', 'belarus', 'kazakhstan'

// exports.createTrack({
// 	country: 'russia',
// 	province: 'Москва',
// 	city: 'Москва',
// 	address: 'xxxxxxxxxxxxx',
// 	name: 'Пирожеов Иван',
// 	phone: '+7888888888',
// 	goodsName: 'Red Cat Store goods',
// 	goodsPrice: '1200',
// 	fast: 'true',
// 	localOrder: '1000',
// 	weight: '50',
// }).then(res => {
// 	console.log(res)
// })
