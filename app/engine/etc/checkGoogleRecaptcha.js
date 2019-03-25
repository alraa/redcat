// ENGINE   'etc/check-google-recaptcha'

const request = require('request')

const { recaptchaSecret } = require('../../../config')

module.exports = (resolve, reject, form) => {
    request.post(
        {
            form: {
                secret: recaptchaSecret,
                response: form.recaptcha,
            },
            json: true,
            url: 'https://www.google.com/recaptcha/api/siteverify',
        },
        (err, res, body) => {
            if (err) {
                // запрос не успешен
                return reject({ err })
            } else {
                // запрос успешен
                return resolve({ success: body.success })
            }
        },
    )
}
