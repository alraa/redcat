const { User } = require('../../database')
const Link = require('../../database/specialLink')
const crypto = require('crypto')

const config = require('.././../../config')

module.exports = async (resolve, reject, { secret }) => {
    const link = await Link.findOne({ secret, type: 'password-reset' })

    if (!link || link.expiresAt < new Date())
        return reject({ status: 400, message: 'Время действия ссылки истекло или ссылки никогда не существовала' })

    let user = await User.findOne({ _id: link.user_id })
    if (!user) return reject()
    let rndPass = crypto.randomBytes(8).toString('hex')
    user.setPassword(rndPass)
    await user.save()

    link.done = true
    await link.save()

    let message = {
        to: user.email,
        subject: 'Ваш пароль для сайта Red Cat Store сброшен',
        html: `<p><b>Ваш пароль для сайта Red Cat Store сброшен</b></p>
Новые данные для входа:<br>
<p>Логин (не менялся): <b>${user.email}</b></p>
<p>Новый пароль: <b>${rndPass}</b></p>`,
    }

    ENGINE.emit('nodemailer/send', message)
        .then(res => resolve())
        .catch(err => reject())
}
