const request = require('supertest')
const app = require('../server')
import { UUID, UUIDExtended } from 'bson'
import connectMongoose from '../db/connect'
const { ObjectId } = require('mongodb')
const { deleteCar } = require('../controllers/cars')

/**
 * GET
 */

describe('GET / cars', () => {
    //Get
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
        expect(response.body).toEqual([
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

    //Get w/ID
    it('returns with one car by id', async () => {
        const response = await request(app).get(
            '/cars/640acad6bfd4834a2a305761'
        )
        expect(response.body).toEqual({
            _id: '640acad6bfd4834a2a305761',
            carMake: 'Ford',
            carModel: 'Mustang',
            engineSize: '170 cu in (2.8 L)',
            color: 'black',
            year: '1966',
            price: '26000',
        })
    })
})

/**
 * PUT
 */

describe('PUT /cars/:id', () => {
    it('updates the car', async () => {
        const _id = new ObjectId('640acad6bfd4834a2a305761')
        const mockCar = {
            carMake: 'Toyota',
            carModel: 'Camry',
            engineSize: '3.5L',
            color: 'Black',
            year: 2022,
            price: 28000,
        }

        const response = await request(app).post('/cars').send({ _id }, mockCar)

        expect(response.statusCode).toBe(204)
    })
})
// let db: any
// beforeAll(async () => {
//     db = await connectMongoose()
// })

// afterAll(async () => {
//     if (db.conection) {
//         await db.connection.close()
//     }
// })

// it('updates a car successfully', async () => {
//     const mockCar = {
//         carMake: 'Toyota',
//         carModel: 'Camry',
//         engineSize: '3.5L',
//         color: 'Black',
//         year: 2022,
//         price: 28000,
//     }

//     const response = await request(app)
//         .put(`/cars/${new ObjectId()}`)
//         .send(mockCar)

//     expect(response.status).toBe(204)
// })

// it('returns a 500 status if the server encounters an error', async () => {
//     let connection: any
//     connection = await connectMongoose()

//     jest.spyOn(
//         connection.collection('cars'),
//         'replaceOne'
//     ).mockImplementation(() => {
//         throw new Error('Database not available')
//     })

//     const mockCar = {
//         carMake: 'Toyota',
//         carModel: 'Camry',
//         engineSize: '3.5L',
//         color: 'Black',
//         year: 2022,
//         price: 28000,
//     }

//     const response = await request(app)
//         .put(`/cars/${new ObjectId()}`)
//         .send(mockCar)

//     expect(response.status).toBe(500)
//     expect(response.body).toEqual({ message: 'Internal server error' })
// })
// })

/**
 * POST
 */

// describe('POST /cars', () => {
//     it('creates a new car', async () => {
//         const car = {
//             carMake: 'Toyota',
//             carModel: 'Camry',
//             engineSize: '2.5L',
//             color: 'Blue',
//             year: 2021,
//             price: 25000,
//         }

//         const response = await request(app).post('/cars').send(car)

//         expect(response.status).toBe(201)
//         expect(response.body.acknowledged).toBe(true)
//     })

//     it('returns an error when required fields are missing', async () => {
//         const car = {
//             carMake: 'Toyota',
//             carModel: 'Camry',
//             engineSize: '2.5L',
//             color: 'Blue',
//             year: 2021,
//         }

//         const response = await request(app).post('/cars').send(car)

//         expect(response.status).toBe(500)
//         expect(response.body.message).toBe(
//             'Some error occurred while adding the car.'
//         )
//     })
// })

/**
 * DELETE
 */

// describe('deleteCar', () => {
//     it('deletes a car successfully', async () => {
//         const mockReq = {
//             params: {
//                 id: '123',
//             },
//         }
//         const mockRes = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//             send: jest.fn(),
//         }
//         const mockConnection = {
//             collection: jest.fn().mockReturnThis(),
//             deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
//         }
//         jest.spyOn(global, 'ObjectId').mockReturnValueOnce('123')
//         jest.spyOn(global, 'connectMongoose').mockResolvedValueOnce(
//             mockConnection
//         )

//         await deleteCar(mockReq, mockRes)

//         expect(mockConnection.collection).toHaveBeenCalledWith('cars')
//         expect(mockConnection.deleteOne).toHaveBeenCalledWith({ _id: '123' })
//         expect(mockRes.status).toHaveBeenCalledWith(204)
//         expect(mockRes.send).toHaveBeenCalled()
//     })

//     it('returns an error if car was not deleted', async () => {
//         const mockReq = {
//             params: {
//                 id: '123',
//             },
//         }
//         const mockRes = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//             send: jest.fn(),
//         }
//         const mockConnection = {
//             collection: jest.fn().mockReturnThis(),
//             deleteOne: jest.fn().mockResolvedValue({ deletedCount: 0 }),
//         }
//         jest.spyOn(global, 'ObjectId').mockReturnValueOnce('123')
//         jest.spyOn(global, 'connectMongoose').mockResolvedValueOnce(
//             mockConnection
//         )

//         await deleteCar(mockReq, mockRes)

//         expect(mockConnection.collection).toHaveBeenCalledWith('cars')
//         expect(mockConnection.deleteOne).toHaveBeenCalledWith({ _id: '123' })
//         expect(mockRes.status).toHaveBeenCalledWith(500)
//         expect(mockRes.json).toHaveBeenCalledWith({
//             message: 'Some error occurred while deleting the car.',
//         })
//     })

//     it('returns an error if there was a server error', async () => {
//         const mockReq = {
//             params: {
//                 id: '123',
//             },
//         }
//         const mockRes = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//             send: jest.fn(),
//         }
//         jest.spyOn(global, 'ObjectId').mockReturnValueOnce('123')
//         jest.spyOn(global, 'connectMongoose').mockRejectedValueOnce(
//             new Error('Connection error')
//         )

//         await deleteCar(mockReq, mockRes)

//         expect(mockRes.status).toHaveBeenCalledWith(500)
//         expect(mockRes.json).toHaveBeenCalledWith({
//             message: 'Internal server error',
//         })
//     })
// })
