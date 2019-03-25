// ENGINE 'etc/is-free-login-data'

const allow = ['login', 'email']

module.exports = (resolve, reject, { key, value }) => {
    if (allow.indexOf(key) === -1) {
        return reject({ status: 403 })
    }

    DATABASE.emit('users/read', { [key]: value }, 'id')
        .then(res => resolve({ status: 200, free: res.length === 0 }))
        .catch(err => reject({ status: 500 }))
}
