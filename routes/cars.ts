import { Router } from 'express'
import * as carsController from '../controllers/cars'

const validation = require('../middleware/carValidation')
const router = Router()

// GET /feed/posts
router
    .get('/', carsController.getData)
    .get('/:id', carsController.getSingleData)
    .post('/', validation.validateCar, carsController.createNewCar)
    .put('/:id', validation.validateCar, carsController.updateCar)
    .delete('/:id', carsController.deleteCar)

module.exports = router
