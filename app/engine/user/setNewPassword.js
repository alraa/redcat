const { User } = require('../../database')

module.exports = (resolve, reject, { user_id, newPassword }) => {
    User.findById(user_id)
        .then(user => user.setPassword(newPassword).save())
        .then(() => resolve())
        .catch(err => {
            console.error(err)
            reject()
        })
}
