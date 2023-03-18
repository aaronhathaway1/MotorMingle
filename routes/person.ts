const express = require('express');
const router = express.Router();

const personController = require('../controllers/person');

router.get('/', personController.getAllPerson);
router.get('/:id', personController.getOnePerson);
//router.post('/', personController.createPerson);
router.put('/:id', personController.updatePerson);
router.delete('/:id', personController.deletePerson);
module.exports = router;