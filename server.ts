import express from 'express'
import 'dotenv/config'
import { connectMongoose } from './db/connect'
import bodyParser from 'body-parser'
import cors from 'cors'

require('mongoose')

connectMongoose()

const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}
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
app.listen(port, (): void => {
    console.log(`MotorMingle app listening on port ${port}`)
})
