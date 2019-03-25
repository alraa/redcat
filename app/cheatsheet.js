const jwt = require('jwt-simple')
const config = require('../config')
const translit = require('cyrillic-to-translit-js')
const Sugar = require('sugar')

const encodeToken = payload => jwt.encode(payload, config.tokenKey)
const decodeToken = token => jwt.decode(token, config.tokenKey)
const toUrlString = str => translit({ preset: 'ru' }).transform(str, '-')
const getPrettyDate = (date = Date.now()) => `${new Sugar.Date(date).format('{HH}:{mm}:{ss}:{SSS}')}`
const sleep = async (t = 1000) => new Promise(resolve => setTimeout(resolve, t))

module.exports = {
    encodeToken,
    decodeToken,
    toUrlString,
    getPrettyDate,
    sleep,
}
