"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clubsController = require('../controllers/clubs');
const router = (0, express_1.default)();
router
    .get('/', clubsController.returnAllClubs)
    .get('/:id', clubsController.findClubById)
    .post('/', clubsController.createClub)
    .put('/:id', clubsController.updateClub)
    .delete('/:id', clubsController.deleteClub);
module.exports = router;
