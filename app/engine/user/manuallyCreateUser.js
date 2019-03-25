// ENGINE 'user/manually-create'

const { User } = require('../../database')
const crypto = require('crypto')
const co = require('co')

module.exports = async (resolve, reject, data) => {
    co(function*() {
        let { email, name, accountMeta } = data

        if (!email) {
            reject()
        }

        let rndPassword = crypto.randomBytes(5).toString('hex')

        let mailOptions = {
            from: 'Red Cat Store <RCS@gamil.com>',
            to: email,
            subject: `${name}, для Вас был создан аккаунт на Red Cat Store`,
            html: `Здравствуйте, ${name}, для вас был создан аккаунт на сайте Red Cat Store <br />
  <em>Данные для входа</em><br />
  Логин: <b>${email}</b> <br />
  Пароль: <b>${rndPassword}</b>`,
        }

        let newUser = new User({
            email,
            accountMeta,
            personMeta: {
                name,
            },
        })

        newUser.setPassword(rndPassword)

        yield newUser.save()

        ENGINE.emit('nodemailer/send', mailOptions)
            .then(info => {
                resolve({ status: 200, message: 'Успешно!' })
            })
            .catch(err => {
                console.error(err)
                reject({ status: 500 })
            })
    }).catch(err => {
        console.error(err)
        reject()
    })
}
