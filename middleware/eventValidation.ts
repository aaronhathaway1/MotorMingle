import { Request, Response, NextFunction } from 'express'

const validator = require('../helpers/validate')

const eventValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let validationRule

    if (req.method === 'POST') {
        validationRule = {
            date: 'required|string',
            time: 'required|string',
            location: 'required|string',
            organizer: 'required|string',
        }
    } else {
        validationRule = {
            date: 'string',
            time: 'string',
            location: 'string',
            organizer: 'string',
        }
    }

    validator(req.body, validationRule, {}, (err: any, status: any) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err,
            })
        } else {
            next()
        }
    }).catch((err: any) => console.log(err))
}

module.exports = { eventValidate }
