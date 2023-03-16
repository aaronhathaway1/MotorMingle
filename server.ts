import express from 'express'
import 'dotenv/config'
const connectMongoose = require('./db/connect')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

require('mongoose')
const session = require('express-session');
const passport = require('passport');



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

app.use(
    session({
        secret: 'send it',
        resave: false,
        saveUninitialized: false,
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(function (req, res, next) {
    res.locals.person = req.body.firstName || null;
    next();
})

app.use('/', require('./routes'))
app.listen(port, (): void => {
    console.log(`MotorMingle app listening on port ${port}`)
})
