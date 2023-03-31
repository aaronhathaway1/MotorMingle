import Router from 'express'

const validation = require('../middleware/clubValidation')
const clubsController = require('../controllers/clubs')
const router = Router()

router
    .get('/', clubsController.returnAllClubs)
    .get('/:id', clubsController.findClubById)
    .post('/', validation.validateClub, clubsController.createClub)
    .put('/:id', validation.validateClub, clubsController.updateClub)
    .delete('/:id', clubsController.deleteClub)

module.exports = router
