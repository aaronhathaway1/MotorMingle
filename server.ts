import express, { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import 'mongoose'
import passport from 'passport'
import './controllers/passport'

const connectMongoose = require('./db/connect')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const port = process.env.PORT || 3000
const app = express()

connectMongoose()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})
app.use(cors())

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
