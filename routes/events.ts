import Router from 'express'

const eventsController = require('../controllers/events')
const router = Router()
const validation = require('../middleware/eventValidation')


router
    .get('/', eventsController.returnAllEvents)
    .get('/:id', eventsController.findEventById)
    .post('/', validation.eventValidate ,eventsController.createEvent)
    .put('/:id',validation.eventValidate , eventsController.updateEvent)
    .delete('/:id', eventsController.deleteEvent)

module.exports = router
