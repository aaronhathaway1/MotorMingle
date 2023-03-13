import Router from 'express'

const router = Router()

router.use('/clubs', require('./clubs'))
router.use('/person', require('./person'))

module.exports = router
