import Router from 'express'

const clubsController = require('../controllers/clubs')
const router = Router()

router
    .get('/', clubsController.returnAllClubs)
    .get('/:id', clubsController.findClubById)
    .post('/', clubsController.createClub)
    .put('/:id', clubsController.updateClub)
    .delete('/:id', clubsController.deleteClub)

module.exports = router
