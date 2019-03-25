const { User } = require('../../database')
const Link = require('../../database/specialLink')

const config = require('.././../../config')

module.exports = async (resolve, reject, { email, password, newPassword }) => {
    let user = await User.findOne({ email })

    if (!user) return reject({ status: 404, message: 'Пользователь не найден' })
    if (!user.validPassword(password)) return reject({ status: 404, message: 'Пароль не праильный' })

    user.setPassword(newPassword)
    await user.save()

    resolve()

    let message = {
        to: user.email,
        subject: 'Ваш пароль на сайте Red Cat Store изменен',
        html: `<p><b>Ваш пароль на сайте Red Cat Store изменен, используя старый пароль</b></p>`,
    }

    ENGINE.emit('nodemailer/send', message)
        .then(res => resolve())
        .catch(err => reject())
}
