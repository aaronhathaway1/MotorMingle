import Router from 'express'
import swaggerUi from 'swagger-ui-express'

const swaggerDocument: any = require('../swagger.json')
const router = Router()

router
    .use('/clubs', require('./clubs'))
    .use('/api-docs', swaggerUi.serve)
    .get('/api-docs', swaggerUi.setup(swaggerDocument))

module.exports = router
