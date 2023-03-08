import express from 'express'
const connectMongoose = require('./db/connect')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

require('mongoose')
require('dotenv').config()

connectMongoose()

const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        next()
    }
)
app.use(cors())
app.use('/', require('./routes'))
app.listen(port, () => {
    console.log(`MotorMingle app listening on port ${port}`)
})
