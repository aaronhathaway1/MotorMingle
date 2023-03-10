import express from 'express';
import 'dotenv/config'
import { connectMongoose } from './db/connect';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

require('mongoose')
require('dotenv').config()

connectMongoose()


const port = process.env.PORT || 3000
const app = express();

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
app.listen(port, (): void => {
    console.log(`MotorMingle app listening on port ${port}`)
})