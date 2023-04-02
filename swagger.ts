require('dotenv/config')

const swaggerAutogen = require('swagger-autogen')()
const inDevMode = process.env.NODE_ENV === 'development'
let doc

if (inDevMode) {
    doc = {
        info: {
            title: 'MotorMingle Data Base',
            description:
                'This is a database designed to help car enthusiasts get together.',
        },
        host: 'localhost:3000',
        schemes: ['http'],
    }
} else {
    doc = {
        info: {
            title: 'MotorMingle Data Base',
            description:
                'This is a database designed to help car enthusiasts get together.',
        },
        host: 'motor-mingle.onrender.com',
        schemes: ['https'],
    }
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.ts']

swaggerAutogen(outputFile, endpointsFiles, doc)
