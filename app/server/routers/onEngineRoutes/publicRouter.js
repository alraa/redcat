const { Router } = require('express')
const router = Router()

router.post('/registration', (req, res) => {
    ENGINE.emit('user/registration', req.body)
        .then(res.reply)
        .catch(res.replyErr)
})

router.post('/login', (req, res) => {
    ENGINE.emit('user/login', { ...req.body, forAdmin: req.query.hasOwnProperty('admin;)') })
        .then(res.reply)
        .catch(res.replyErr)
})

router.get('/categories-tree', (req, res, next) => {
    ENGINE.emit('etc/get-categories-tree')
        .then(res.reply)
        .catch(res.replyErr)
})

router.post('/reset-password-with-old', (req, res, next) => {
    ENGINE.emit('user/reset-password-with-old', req.body)
        .then(res.reply)
        .catch(res.replyErr)
})

router.post('/reset-password-request', (req, res, next) => {
    ENGINE.emit('user/reset-password-request', req.body)
        .then(res.reply)
        .catch(res.replyErr)
})

router.get('/reset-password-confirm', (req, res, next) => {
    ENGINE.emit('user/reset-password-confirm', req.query)
        .then(res.reply)
        .catch(res.replyErr)
})

router.get('/confirm-registration', (req, res) => {
    console.log(req.query)
    ENGINE.emit('user/confirm-registration', req.query)
        .then(res.reply)
        .catch(res.replyErr)
})

router.get('/count-delivery-price', (req, res) => {
    ENGINE.emit('count-delivery-price', req.query)
        .then(res.reply)
        .catch(res.replyErr)
})

// category

router.get('/restful/category', (req, res) => {
    ENGINE.emit('category/gets', req.params.id)
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/category/:field/:value', (req, res) => {
    let { field, value } = req.params
    ENGINE.emit('category/get', { [field]: value })
        .then(res.reply)
        .catch(res.replyErr)
})

// subcategory

router.get('/restful/subcategory', (req, res) => {
    ENGINE.emit('subcategory/gets')
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/subcategory/:field/:value', (req, res) => {
    let { field, value } = req.params
    ENGINE.emit('subcategory/get', { [field]: value })
        .then(res.reply)
        .catch(res.replyErr)
})

// brand

router.get('/restful/brand', (req, res) => {
    ENGINE.emit('brand/gets')
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/brand/:field/:value', (req, res) => {
    let { field, value } = req.params
    ENGINE.emit('brand/get', { [field]: value })
        .then(res.reply)
        .catch(res.replyErr)
})

// color

router.get('/restful/color', (req, res) => {
    ENGINE.emit('color/gets')
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/color/:field/:value', (req, res) => {
    let { field, value } = req.params
    ENGINE.emit('color/get', { [field]: value })
        .then(res.reply)
        .catch(res.replyErr)
})

// item

router.get('/restful/item', (req, res) => {
    ENGINE.emit('item/gets', { ...req.query, published: true })
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/item/:field/:value', (req, res) => {
    let { field, value } = req.params
    ENGINE.emit('item/get', { [field]: value, published: true })
        .then(res.reply)
        .catch(res.replyErr)
})

// page

router.get('/restful/page', (req, res) => {
    ENGINE.emit('page/gets')
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/page/alt/:alt', (req, res) => {
    ENGINE.emit('page/get-alt', req.params.alt)
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/page/:id', (req, res) => {
    ENGINE.emit('page/get', req.params.id)
        .then(res.reply)
        .catch(res.replyErr)
})

module.exports = router
