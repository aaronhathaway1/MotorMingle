"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const connectMongoose = require('./db/connect');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('mongoose');
connectMongoose();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use(cors());
app.use('/', require('./routes'));
app.listen(port, () => {
    console.log(`MotorMingle app listening on port ${port}`);
});
