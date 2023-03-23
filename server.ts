import express, { Request, Response, NextFunction } from 'express'
import 'dotenv/config' 
import { connectMongoose } from './db/connect'
import bodyParser from 'body-parser'
import cors from 'cors'

require('mongoose')

connectMongoose()

const port = process.env.PORT || 3000
const app = express()

connectMongoose()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}
 app.use(
    session({
        secret: 'send it',
        resave: false,
        saveUninitialized: false,
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.person = req.body.firstName || null
    next()
})
app.use('/', require('./routes'))
app.use('/auth', require('./routes/auth'))
app.listen(port, (): void => {
    console.log(`MotorMingle app listening on port ${port}`)
})
