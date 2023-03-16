import Router from 'express'
import swaggerUi from 'swagger-ui-express'

const swaggerDocument: any = require('../swagger.json')
const router = Router()

router
    .use('/cars', require('./cars'))
    .use('/clubs', require('./clubs'))
    .use('/events', require('./events'))
    .use('/api-docs', swaggerUi.serve)
    .get('/api-docs', swaggerUi.setup(swaggerDocument))

module.exports = router
