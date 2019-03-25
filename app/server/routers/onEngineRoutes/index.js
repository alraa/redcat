const { Router } = require('express')
const router = Router()

router.use('/public', require('./publicRouter'))

router.use('/user', isAuth)
router.use('/user', require('./userRouter'))

router.use('/admin', isAuth)
router.use('/admin', require('./adminRouter'))

module.exports = router
