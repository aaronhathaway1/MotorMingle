import Router from 'express'
import swaggerUi from 'swagger-ui-express'

const swaggerDocument: any = require('../swagger.json')
const router = Router()
const { ensureAuth } = require('../middleware/auth')

router
    .use('/auth', require('./auth'))
    .use('/person', ensureAuth, require('./person'))
    .use('/cars', ensureAuth, require('./cars'))
    .use('/clubs', ensureAuth, require('./clubs'))
    .use('/events', ensureAuth, require('./events'))
    .use('/api-docs', swaggerUi.serve)
    .get('/api-docs', swaggerUi.setup(swaggerDocument))

module.exports = router
