const { Router } = require('express')
const router = Router()

router.post('/create-order', (req, res, next) => {
    ENGINE.emit('order/create-from-users-basket', req.user._id, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})

router.post('/change-password', (req, res) => {
    ENGINE.emit('user/set-new-password', { newPassword: req.body.password, user_id: req.user._id })
        .then(res.reply)
        .catch(res.replyErr)
})

//

router.get('/restful/profile/me', (req, res) => {
    ENGINE.emit('user/get', req.user._id)
        .then(res.reply)
        .catch(res.replyErr)
})

router.put('/restful/profile/me', (req, res) => {
    ENGINE.emit('user/update-safe', req.user._id, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})

router.get('/restful/order/my', (req, res) => {
    ENGINE.emit('order/gets', { user_id: req.user._id })
        .then(res.reply)
        .catch(res.replyErr)
})

router.get('/restful/order/my/:id', (req, res) => {
    ENGINE.emit('order/get-with-items', { _id: req.params.id, user_id: req.user._id })
        .then(res.reply)
        .catch(res.replyErr)
})

module.exports = router
