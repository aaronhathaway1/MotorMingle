import Router from 'express'

const clubsController = require('../controllers/clubs')
const router = Router()

router
    .get('/', clubsController.returnAllClubs)
    .get('/:id', clubsController.findClubById)
    .post('/', clubsController.createClub)

module.exports = router
