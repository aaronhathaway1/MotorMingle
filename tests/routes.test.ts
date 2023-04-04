const request = require('supertest')
const app = require('../server')
import connectMongoose from '../db/connect'
/**
 * Logging In and Out
 */

// googleId
// "106338859714071933953"

// firstName
// "CSE341"

// lastName
// "Dalinar"

// email
// "cse341dalinar@gmail.com"

describe('POST /auth', () => {
    // it('responds with status 200 and a success message', async () => {
    //     const response = await request(app)
    //         .post('/login')
    //         .send({ username: 'testuser', password: 'testpass' })
    //     expect(response.statusCode).toBe(200)
    //     expect(response.body.message).toBe('Login successful')
    // })

    it('responds with status 401 and an error message if credentials are incorrect', async () => {
        const response = await request(app)
            .post('/auth')
            .send({ username: 'wronguser', password: 'wrongpass' })
        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe('Invalid credentials')
    })
})

/**
 * Cars Routes
 */

describe('GET / cars', () => {
    it('responds with status 200', async () => {
        const response = await request(app).get('/cars')
        expect(response.statusCode).toBe(200)
    })

    it('responds with JSON', async () => {
        const response = await request(app).get('/cars')
        expect(response.headers['content-type']).toMatch(/json/)
    })

    it('responds with the cars data', async () => {
        const response = await request(app).get('/cars')
        expect(response.body.message).toBe([
            {
                _id: '640acad6bfd4834a2a305761',
                carMake: 'Ford',
                carModel: 'Mustang',
                engineSize: '170 cu in (2.8 L)',
                color: 'black',
                year: '1966',
                price: '26000',
            },
        ])
    })
})

/**
 * Clubs Routes
 */
