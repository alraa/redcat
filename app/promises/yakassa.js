const request = require('request')
const crypto = require('crypto')

const config = require('../../config')
const basicAuth = 'Basic ' + Buffer.from(config.yakassa.shopid + ':' + config.yakassa.secret).toString('base64')
const numeral = require('numeral')

exports.create = ({ value, currency = 'RUB', description = 'RedCatStore', type = 'bank_card' }) =>
    new Promise((resolve, reject) => {
        let idemp = crypto.randomBytes(32).toString('hex')

        let body = {
            amount: {
                value: numeral(value).format('0.00'),
                currency,
            },
            payment_method_data: { type },
            confirmation: {
                type: 'redirect',
                return_url: config.server.frontBaseUrl + '/',
            },
            description: description,
        }

        request(
            {
                method: 'POST',
                url: 'https://payment.yandex.net/api/v3/payments',
                headers: {
                    'Content-Type': 'application/json',
                    'Idempotence-Key': idemp,
                    Authorization: basicAuth,
                },
                body: JSON.stringify(body),
            },
            (err, res, body) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({ body: JSON.parse(body), idemp })
                }
            },
        )
    })

exports.get = id =>
    new Promise((resolve, reject) => {
        request(
            {
                method: 'GET',
                url: 'https://payment.yandex.net/api/v3/payments/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Idempotence-Key': idemp,
                    Authorization: basicAuth,
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

exports.action = (paymentObject, newStatus) =>
    new Promise((resolve, reject) => {
        if (['capture', 'cancel'].indexOf(newStatus) == -1) {
            return reject(newStatus + ' is bad action')
        }
        let idemp = crypto.randomBytes(32).toString('hex')

        request(
            {
                method: 'POST',
                url: `https://payment.yandex.net/api/v3/payments/${paymentObject.id}/${newStatus}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Idempotence-Key': idemp,
                    Authorization: basicAuth,
                },
                body: JSON.stringify({ amount: paymentObject.amount }),
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
