import { Router } from 'express'

import * as carsController from '../controllers/cars';

const router = Router()

// GET /feed/posts
router
    .get('/', carsController.getData)
    .get('/:id', carsController.getSingleData)
    .post('/', carsController.createNewCar)
    .put('/:id', carsController.updateCar)
    .delete('/:id', carsController.deleteCar)

export default router;
