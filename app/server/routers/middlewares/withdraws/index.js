const Decimal = require('decimal.js')

const { MoneyWithdraw, User } = require('../../../../database')

let withdraws = {}

withdraws.createRequest = (req, res, next) => {
    let userId = req.user._id,
        sum = req.body.sum,
        data = req.body.data

    if (!+sum) throw new Error('no sum in body')

    User.findById(userId)
        .then(user => {
            if (sum > user.balance) throw new Error('sum > user.balance')

            user.balance = Decimal(+user.balance).minus(+sum)

            return Promise.all([
                new MoneyWithdraw({ ...data, sum, userId }).save(), //
                user.save(),
            ])
        })
        .then(([moneyWithdraw, user]) => {
            //
        })
        .catch(next)
}

withdraws.get = (req, res, next) => {
    MoneyWithdraw.find({ userId: req.user._id })
        .limit(Math.min(req.query.limit || 50, 20))
        .skip(+req.query || 0)
        .lean()
        .exec()
        .then(withdraws => res.json({ withdraws }))
        .catch(next)
}

withdraws.getForAdmin = (req, res, next) => {
    let query = {}

    if (req.params.userId) query.userId = req.params.userId

    MoneyWithdraw.find(query)
        .limit(Math.min(req.query.limit || 50, 20))
        .skip(+req.query || 0)
        .lean()
        .exec()
        .then(withdraws => res.json({ withdraws }))
        .catch(next)
}

withdraws.confirm = (req, res, next) => {
    MoneyWithdraw.findById(req.params.id)
        .then(withdraw => {
            if (!withdraw) throw new Error('withdraw not found')
            return User.findById(withdraw.userId).then(user => {
                user, withdraw
            })
        })
        .then(({ user, withdraw }) => {
            if (!user) throw new Error('user not found')

            withdraw.status = 'confirmed'
            return withdraw.save()
        })
        .then(withdraw => res.json({ withdraw }))
        .catch(next)
}

withdraws.decline = (req, res, next) => {
    MoneyWithdraw.findById(req.params.id)
        .then(withdraw => {
            if (!withdraw) throw new Error('withdraw not found')
            return User.findById(withdraw.userId).then(user => {
                user, withdraw
            })
        })
        .then(({ user, withdraw }) => {
            if (!user) throw new Error('user not found')

            withdraw.status = 'declined'
            user.balance = new Decimal(user.balance).plus(withdraw.sum)
            return Promise.all([
                withdraw.save(), //
                user.save(),
            ])
        })
        .then(withdraw => res.json({ withdraw }))
        .catch(next)
}

module.exports = { withdraws }
