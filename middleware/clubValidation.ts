import { Request, Response, NextFunction } from 'express'

const validator = require('../helpers/validate')

const validateClub = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let validationRule

    if (req.method === 'POST') {
        validationRule = {
            clubName: 'required|string',
            clubLocation: 'required|string',
            president: 'required|string',
            clubCreator: 'required|string',
            clubMembers: 'string',
        }
    } else {
        validationRule = {
            clubName: 'string',
            clubLocation: 'string',
            president: 'string',
            clubCreator: 'string',
            clubMembers: 'string',
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

module.exports = { validateClub }
