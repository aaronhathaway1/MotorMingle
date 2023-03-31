import { Request, Response, NextFunction } from 'express'

const validator = require('../helpers/validate')

const validateCar = async (req: Request, res: Response, next: NextFunction) => {
    let validationRule

    if (req.method === 'POST') {
        validationRule = {
            carMake: 'required|string',
            carModel: 'required|string',
            engineSize: 'required|string',
            color: 'required|string',
            year: 'required|string',
            price: 'string',
        }
    } else {
        validationRule = {
            carMake: 'string',
            carModel: 'string',
            engineSize: 'string',
            color: 'string',
            year: 'string',
            price: 'string',
        }
    }

    await validator(req.body, validationRule, {}, (err: any, status: any) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed.',
                data: err,
            })
        } else {
            next()
        }
    }).catch((err: any) => console.log(err))
}

module.exports = { validateCar }
