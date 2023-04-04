import Router from 'express'
import swaggerUi from 'swagger-ui-express'

const swaggerDocument: any = require('../swagger.json')
const router = Router()
const { ensureAuth } = require('../middleware/auth')

router
    .use('/auth', require('./auth'))
    .use('/person', require('./person'))
    .use('/cars', require('./cars'))
    .use('/clubs', require('./clubs'))
    .use('/events', require('./events'))
    .use('/api-docs', swaggerUi.serve)
    .get('/api-docs', swaggerUi.setup(swaggerDocument))

module.exports = router
