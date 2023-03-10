import express, { Router } from 'express';
// import { check, validationResult } from 'express-validator';
import * as carsController from '../controllers/cars';

const router: Router = express.Router();

// GET /feed/posts
router.get('/protected', carsController.getData);

router.get('/:id', carsController.getSingleData);

// router.post('/', carsController.createNewCar);
router.post('/', (req: express.Request, res: express.Response) => {
    carsController.createNewCar(req, res);
});

router.put('/:id', carsController.updateCar);

router.delete('/:id', carsController.deleteCar);

export default router;
