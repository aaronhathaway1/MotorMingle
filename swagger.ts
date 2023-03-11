const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'MotorMingle Data Base',
        description:
            'This is a database designed to help car enthusiasts get together.',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    // host: 'motormingle.onrender.com',
    // schemes: ['https'],
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.ts']

swaggerAutogen(outputFile, endpointsFiles, doc)
