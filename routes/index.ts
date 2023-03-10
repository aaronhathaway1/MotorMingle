import { Router } from 'express';
import carsRouter from './cars';


const router: Router = Router();

router.use('/cars', carsRouter);


module.exports = router;

