const { Router } = require('express')
const router = Router()
const co = require('co')
const { User } = require('../../database')

global.isAuth = (req, res, next) => {
    if (req.isAuth) {
        next()
    } else {
        res.replyErr({ status: 403, message: 'Не авторизован' })
    }
}

global.checkAccess = (keys = 'admin') => (req, res, next) => {
    co(function*() {
        if (!req.isAuth) {
            return res.replyErr({ status: 403, message: 'Не авторизован' })
        }

        let user = yield User.findOne({ _id: req.user._id })

        if (!user) return res.replyErr({ status: 404, message: 'Пользователь не найден' })

        let { accountMeta } = user

        if (accountMeta.admin) return next()

        if (!Array.isArray(keys)) keys = [keys]

        for (let key of keys) if (accountMeta[key]) return next()

        return res.replyErr({ status: 403, message: 'Нельзя выполнить с этими правами доступа' })
    }).catch(err => {
        console.error(err)
        return res.replyErr({ status: 403, message: 'Нельзя выполнить с этими правами доступа' })
    })
}

router.use(require('./onEngineRoutes')) // departed

// help page

const mw = require('./middlewares')

// get all for front
router.get('/help', mw.help.getAll)

router.use('/help', checkAccess('admin'))

router.get('/help/top', mw.help.getTop)
router.post('/help/top', checkAccess('admin'), mw.help.createTop)
router.put('/help/top/:id', checkAccess('admin'), mw.help.updateTop)
router.delete('/help/top/:id', checkAccess('admin'), mw.help.removeTop)

router.get('/help/delivery', mw.help.getDelivery)
router.post('/help/delivery', checkAccess('admin'), mw.help.createDelivery)
router.put('/help/delivery/:id', checkAccess('admin'), mw.help.updateDelivery)
router.delete('/help/delivery/:id', checkAccess('admin'), mw.help.removeDelivery)

router.get('/help/video', mw.help.getVideo)
router.put('/help/video', checkAccess('admin'), mw.help.updateVideo)

router.get('/help/contact', mw.help.getContact)
router.post('/help/contact', checkAccess('admin'), mw.help.createContact)
router.put('/help/contact/:id', checkAccess('admin'), mw.help.updateContact)
router.delete('/help/contact/:id', checkAccess('admin'), mw.help.removeContact)

// скидки

router.get('/trading-actions', mw.tActions.get)
router.get('/trading-actions/:id', mw.tActions.getOne)
router.post('/trading-actions', checkAccess('admin'), mw.tActions.create)
router.put('/trading-actions/:id', checkAccess('admin'), mw.tActions.update)
router.delete('/trading-actions/:id', checkAccess('admin'), mw.tActions.remove)

// возвраты со счета

router.post('/money-withdraws', isAuth, mw.withdraws.createRequest)
router.get('/money-withdraws', isAuth, mw.withdraws.get)
router.post('/money-withdraws-all', checkAccess('admin'), mw.withdraws.getForAdmin)
router.post('/money-withdraws/:id/confirm', checkAccess('admin'), mw.withdraws.confirm)
router.post('/money-withdraws/:id/decline', checkAccess('admin'), mw.withdraws.decline)

module.exports = router
