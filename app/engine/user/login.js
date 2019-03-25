const { User } = require('../../database')

module.exports = (resolve, reject, { email, password, forAdmin }) => {
    if (!email || !password) return reject({ status: 400, message: 'Нет нужных полей запроса' })

    User.findOne({ email })
        .then(res => {
            if (res === null) {
                return reject({ status: 400, code: 'not_found' })
            }

            if (
                forAdmin &&
                !res.accountMeta.admin &&
                !res.accountMeta.providers &&
                !res.accountMeta.offers &&
                !res.accountMeta.clients &&
                !res.accountMeta.items
            ) {
                return reject({ status: 400, code: 'not_found' })
            }

            const isValid = res.validPassword(password)

            console.log(isValid ? 'Valid password' : 'Invalid password')

            if (isValid === false) {
                return reject({ status: 400, code: 'invalid_password' })
            }

            let token = res.createToken()

            return resolve({
                status: 200,
                message: 'Успешно!',
                result: { token },
            })
        })
        .catch(err => {})
}

// User.findOne({ email: 'danis.sliceplanet@gmail.com' }).then(user => {
//     user.setPassword('super')
//     user.save().then(res => {
//         console.log({ res })
//     })
// })
