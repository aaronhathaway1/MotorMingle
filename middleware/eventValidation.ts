
import { Request, Response, NextFunction } from 'express'

const validator = require('../helpers/validate');

const eventValidate = async (req: Request, res: Response, next: NextFunction) => {
  const validationRule = {
     
    date: 'required|string',
    time: 'required|string',
    location: 'required|string',
    organizer: 'required|string',
  }
  
  validator(req.body, validationRule, {}, (err:any, status:any) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next()
    }
  })
}

module.exports = {
  eventValidate
}