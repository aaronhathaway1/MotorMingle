"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = require('../swagger.json');
const router = (0, express_1.default)();
router
    .use('/clubs', require('./clubs'))
    .use('/api-docs', swagger_ui_express_1.default.serve)
    .get('/api-docs', swagger_ui_express_1.default.setup(swaggerDocument));
module.exports = router;
