import Router from 'express'

const router = Router()

router.use('/clubs', require('./clubs'))

module.exports = router
