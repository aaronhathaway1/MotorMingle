const express = require('express')
const connectMongoose = require('./db/connect')

require('mongoose')
require('dotenv').config()

connectMongoose()

const port = process.env.PORT || 3000
const app = express()

app.use('/', require('./routes'))

app.listen(port,  ()=> {
    console.log(`Example app listening on port ${port}`)
})
