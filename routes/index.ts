import Router from 'express'

const router = Router()

router.use('/clubs', require('./clubs'))
router.use('/person', require('./person'))
router.use('/auth', require('./auth'))
module.exports = router
