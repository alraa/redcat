// ENGINE 'nodemailer/send'
// Разрешить использование аккаутна другими приложениями - тут https://myaccount.google.com/lesssecureapps

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const nodemailer = require('nodemailer')
// const opn = require('opn')

const smtpTransport = require('nodemailer-smtp-transport')
const { user, pass } = require('../../../config').nodemailer

let transporter = nodemailer.createTransport(
    smtpTransport({
        service: 'gmail',
        auth: { user, pass },
    }),
)

// nodemailer.createTestAccount((err, account) => {
//   if (err) {
//     return console.error('Failed to create a testing account. ' + err.message)
//   }

//   console.log('Nodemailer test account created')

//   transporter = nodemailer.createTransport({
//     host: account.smtp.host,
//     port: account.smtp.port,
//     secure: account.smtp.secure,
//     auth: {
//       user: account.user,
//       pass: account.pass,
//     },
//   })
//   email = account.user
// })

module.exports = (resolve, reject, message) => {
    message.from = 'Red Cat Store, <' + user + '>'
    transporter
        .sendMail(message)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
}

// module.exports(() => console.log('sent'), err => console.error(err), {
//   to: 'danis.sliceplanet@gmail.com',
//   subject: 'Ваша учетная запись для Red Cat Store подтверждена',
//   html: `<p><b>Ваша учетная запись для Red Cat Store подтверждена! Приятных покупок!</b></p>`,
// })
