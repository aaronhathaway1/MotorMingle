import Router from 'express'

const eventsController = require('../controllers/events')
const router = Router()

router
    .get('/', eventsController.returnAllEvents)
    .get('/:id', eventsController.findEventById)
    .post('/', eventsController.createEvent)
    .put('/:id', eventsController.updateEvent)
    .delete('/:id', eventsController.deleteEvent)

module.exports = router
