const { Router } = require('express')
const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

const router = Router()
const filesPath = path.resolve(__dirname, '../../../public/files')
const fileUploader = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, filesPath)
        },
        filename: function(req, file, cb) {
            let arr = file.originalname.split('.')
            let extension = arr.length > 1 ? '.' + arr[arr.length - 1] : ''
            let filename = Date.now().toString(36) + '_' + crypto.randomBytes(2).toString('hex') + extension
            cb(null, filename)
        },
    }),
})

router.post('/manually-create-account', checkAccess('admin'), (req, res) => {
    ENGINE.emit('user/manually-create', req.body)
        .then(res.reply)
        .catch(res.replyErr)
})

router.post('/file', checkAccess('items'), fileUploader.single('file'), (req, res) => {
    ENGINE.emit('etc/admin-upload-file', req.file)
        .then(res.reply)
        .catch(res.replyErr)
})

router.post('/file64', checkAccess('items'), (req, res) => {
    ENGINE.emit('etc/admin-upload-file-base64', req.body)
        .then(res.reply)
        .catch(res.replyErr)
})

//
// ──────────────────────────────────────────────────────────
//   :::::: R E S T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────
//

router.use('/restful/category', checkAccess('items'))
router.post('/restful/category', (req, res) => {
    ENGINE.emit('category/create', req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.put('/restful/category/:id', (req, res) => {
    ENGINE.emit('category/update', req.params.id, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.delete('/restful/category/:id', (req, res) => {
    ENGINE.emit('category/delete', req.params.id)
        .then(res.reply)
        .catch(res.replyErr)
})

router.use('/restful/subcategory', checkAccess('items'))
router.post('/restful/subcategory', (req, res) => {
    ENGINE.emit('subcategory/create', req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.put('/restful/subcategory/:id', (req, res) => {
    ENGINE.emit('subcategory/update', req.params.id, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.delete('/restful/subcategory/:id', (req, res) => {
    ENGINE.emit('subcategory/delete', req.params.id)
        .then(res.reply)
        .catch(res.replyErr)
})

router.use('/restful/brand', checkAccess('items'))
router.post('/restful/brand', (req, res) => {
    console.log(req.body)
    ENGINE.emit('brand/create', req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.put('/restful/brand/:id', (req, res) => {
    ENGINE.emit('brand/update', req.params.id, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.delete('/restful/brand/:id', (req, res) => {
    ENGINE.emit('brand/delete', req.params.id)
        .then(res.reply)
        .catch(res.replyErr)
})

router.use('/restful/color', checkAccess('items'))
router.post('/restful/color', (req, res) => {
    ENGINE.emit('color/create', req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.put('/restful/color/:id', (req, res) => {
    ENGINE.emit('color/update', req.params.id, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.delete('/restful/color/:id', (req, res) => {
    ENGINE.emit('color/delete', req.params.id)
        .then(res.reply)
        .catch(res.replyErr)
})

router.use('/restful/user', checkAccess('clients'))
router.get('/restful/user', (req, res) => {
    ENGINE.emit('user/gets', req.query)
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/user/:id', (req, res) => {
    ENGINE.emit('user/get', req.params.id)
        .then(res.reply)
        .catch(res.replyErr)
})
router.put('/restful/user/:_id', (req, res) => {
    ENGINE.emit('user/update-for-admin', req.params._id, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.delete('/restful/user/:id', (req, res) => {
    ENGINE.emit('user/delete', req.params.id)
        .then(res.reply)
        .catch(res.replyErr)
})

router.post('/restful/item', checkAccess('items'), (req, res) => {
    ENGINE.emit('item/create', req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/item', checkAccess('items'), (req, res) => {
    ENGINE.emit('item/gets', req.query)
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/item/:field/:value', checkAccess('items'), (req, res) => {
    let { field, value } = req.params
    ENGINE.emit('item/get', { [field]: value }, true)
        .then(res.reply)
        .catch(res.replyErr)
})
router.post('/restful/item/:id/action/:action', checkAccess('items'), (req, res) => {
    ENGINE.emit('item/action', req.params.id, req.params.action)
        .then(res.reply)
        .catch(res.replyErr)
})
router.put('/restful/item/:id', checkAccess('items'), (req, res) => {
    ENGINE.emit('item/update', req.params.id, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.delete('/restful/item/:id', checkAccess('items'), (req, res) => {
    ENGINE.emit('item/delete', req.params.id)
        .then(res.reply)
        .catch(res.replyErr)
})
router.post('/restful/item/action-many/:action', checkAccess('items'), (req, res) => {
    ENGINE.emit('item/action-for-many', req.params.action, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/item/next-code', (req, res) => {
    ENGINE.emit('item/get-next-code')
        .then(res.reply)
        .catch(res.replyErr)
})

router.use('/restful/page', checkAccess('admin'))
router.post('/restful/page', (req, res) => {
    ENGINE.emit('page/create', req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.put('/restful/page/:id', (req, res) => {
    ENGINE.emit('page/update', req.params.id, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.delete('/restful/page/:id', (req, res) => {
    ENGINE.emit('page/delete', req.params.id)
        .then(res.reply)
        .catch(res.replyErr)
})

//
// ─── ORDERS ─────────────────────────────────────────────────────────────────────
//

router.use('/restful/order', checkAccess(['offers', 'providers']))
router.get('/restful/order', (req, res) => {
    ENGINE.emit('order/gets', req.query)
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/orders-with-items', (req, res) => {
    ENGINE.emit('order/gets-with-items', req.query)
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/order/:order_id/items', (req, res) => {
    ENGINE.emit('order/get-ordered-items-by-order', { ...req.params })
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/order/items', (req, res) => {
    ENGINE.emit('order/get-ordered-items-by-order', { ...req.query })
        .then(res.reply)
        .catch(res.replyErr)
})
router.post('/restful/order/:order_id/item/:item_id/set-status/:status', (req, res) => {
    let { order_id, item_id, status } = req.params
    ENGINE.emit('order/set-status-to-item', order_id, item_id, status)
        .then(res.reply)
        .catch(res.replyErr)
})
router.post('/restful/order/:order_id/item/:item_id/confirm-out-of-stock', (req, res) => {
    let { order_id, item_id } = req.params
    ENGINE.emit('order/confirm-out-of-stock', order_id, item_id)
        .then(res.reply)
        .catch(res.replyErr)
})
router.get('/restful/order/:id', (req, res) => {
    ENGINE.emit('order/get', { _id: req.params.id })
        .then(res.reply)
        .catch(res.replyErr)
})
router.put('/restful/order/:id', (req, res) => {
    ENGINE.emit('order/update', req.params.id, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})
router.put('/restful/ordered-item/:id', (req, res) => {
    ENGINE.emit('ordered-item/update', req.params.id, req.body)
        .then(res.reply)
        .catch(res.replyErr)
})

module.exports = router
