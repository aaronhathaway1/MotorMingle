"use strict";
const swaggerAutogen = require('swagger-autogen')();
const inDevMode = process.env.NODE_ENV === 'development';
let doc;
console.log(process.env.NODE_ENV);
if (inDevMode) {
    doc = {
        info: {
            title: 'MotorMingle Data Base',
            description: 'This is a database designed to help car enthusiasts get together.',
        },
        host: 'localhost:3000',
        schemes: ['http'],
    };
}
else {
    doc = {
        info: {
            title: 'MotorMingle Data Base',
            description: 'This is a database designed to help car enthusiasts get together.',
        },
        host: 'motormingle.onrender.com',
        schemes: ['https'],
    };
}
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.ts'];
swaggerAutogen(outputFile, endpointsFiles, doc);
