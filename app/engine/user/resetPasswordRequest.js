const { User } = require('../../database')
const Link = require('../../database/specialLink')

const config = require('.././../../config')

module.exports = async (resolve, reject, { email }) => {
    let user = await User.findOne({ email }, { _id: 1 })

    if (!user) return reject({ message: 'Такого почтового ящика не существует' })

    new Link({ user_id: user._id, type: 'password-reset' })
        .save()
        .then(res => {
            let secret = res.secret
            let link = config.server.footBaseUrl + '/confirm/reset-password?secret=' + secret
            let message = {
                to: email,
                subject: 'Сброс пароля на сайте Red Cat Store',
                html: `Кто-то, возможно вы, запросил сброс пароля на сайте Red Cat Store<br>
При переходе на <a href="${link}" target="_blank">Эту Ссылку</a> вам на почту будет выслан новый пароль<br>
Ссылка действительна 1 час`,
            }
            ENGINE.emit('nodemailer/send', message)
                .then(res => resolve())
                .catch(err => reject())
        })
        .catch(err => {
            console.error(err)
            reject()
        })
}
