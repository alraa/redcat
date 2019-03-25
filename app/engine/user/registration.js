const co = require('co')
const { User } = require('../../database')
const Link = require('../../database/specialLink')
const config = require('../../../config')

module.exports = (resolve, reject, form) => {
    let { email, personMeta, delivery, password } = form

    let newUser = new User({ email, personMeta, delivery })

    console.log({ newUser })

    newUser.setPassword(password)

    console.log({ newUser })

    newUser
        .save()
        .then(async user => {
            let { secret } = await new Link({ user_id: user._id, type: 'confirm-registration' }).save()

            console.log({ secret })

            let link = config.server.frontBaseUrl + '/confirm/account?secret=' + secret

            let msgOpts = {
                to: user.email,
                subject: 'Вы зарегестрировались на сайте Red Cat Store',
                html: `<br>Спасибо за регистранию на сайте Red Cat Store</br>`,
            }
            resolve({ message: 'Письмо для подтверждения отправлено на почту' })

            ENGINE.emit('nodemailer/send', msgOpts)
                .then(() => console.log('email sent'))
                .catch(err => console.error(err))
        })
        .catch(err => {
            if (err.code === 11000) {
                resolve({ status: 400, code: 'email_occupied' })
            } else {
                console.error({ err })
                reject()
            }
        })
}
