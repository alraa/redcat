const { User } = require('../../database')
const Link = require('../../database/specialLink')

module.exports = async (resolve, reject, { secret }) => {
    const link = await Link.findOne({ secret: secret, type: 'confirm-registration' })

    console.log(link)

    if (!link || link.expiresAt < new Date())
        return reject({ status: 400, message: 'Время действия ссылки истекло или ссылки никогда не существовала' })

    let user = await User.findOne({ _id: link.user_id })
    if (!user) return reject()

    user.accountMeta.confirmed = true
    await user.save()

    link.done = true
    await link.save()

    let message = {
        to: user.email,
        subject: 'Ваша учетная запись для Red Cat Store подтверждена',
        html: `<p><b>Ваша учетная запись для Red Cat Store подтверждена! Приятных покупок!</b></p>`,
    }

    ENGINE.emit('nodemailer/send', message)
        .then(res => resolve({ result: user.createToken() }))
        .catch(err => reject())
}
