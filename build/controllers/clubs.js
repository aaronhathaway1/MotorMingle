"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Club = require('../models/clubs');
const ObjectId = require('mongodb').ObjectId;
const returnAllClubs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Club.find().then((allClubs) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(allClubs);
        });
    }
    catch (err) {
        console.log('catch error:', err);
        res.status(500).json(err);
    }
});
const createClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const club = new Club({
        clubName: req.body.clubName,
        clubLocation: req.body.clubLocation,
        president: req.body.president,
        clubCreator: req.body.clubCreator,
        clubMembers: req.body.clubMembers,
    });
    try {
        const savedClub = yield club.save();
        if (!savedClub) {
            res.status(500).json('Unable to save club!');
        }
        else {
            res.status(201).json(`New Club ID: ${savedClub._id}`);
        }
    }
    catch (err) {
        console.log('catch error', err);
        res.status(500).json(err);
    }
});
const findClubById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ObjectId.isValid(req.params)) {
        res.status(400).json('Must use a valid Club ID.');
    }
    const clubId = new ObjectId(req.params.id);
    try {
        yield Club.findById(clubId).then((club) => {
            if (club) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(club);
            }
            else {
                res.status(400).json(`Unable to find club with ID ${clubId}`);
            }
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const updateClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ObjectId.isValid(req.params)) {
        res.status(400).json('Must use a valid Club ID.');
    }
    const clubId = new ObjectId(req.params.id);
    try {
        let doc = yield Club.findOne(clubId);
        if (!doc) {
            res.status(404).json(`Club with ID ${clubId} not found.`);
        }
        if (req.body.clubName) {
            doc.clubName = req.body.clubName;
        }
        if (req.body.clubLocation) {
            doc.clubLocation = req.body.clubLocation;
        }
        if (req.body.president) {
            doc.president = req.body.president;
        }
        if (req.body.clubCreator) {
            doc.clubCreator = req.body.clubCreator;
        }
        if (req.body.clubMembers) {
            doc.clubMembers = req.body.clubMembers;
        }
        yield doc.save();
        res.status(204).json();
    }
    catch (err) {
        if (err.name === 'CastError') {
            res.status(400).json(err.message);
        }
        else {
            res.status(500).json(err);
        }
    }
});
const deleteClub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ObjectId.isValid(req.params)) {
        res.status(400).json('Must use a valid Club ID.');
    }
    const clubId = new ObjectId(req.params.id);
    console.log('clubId = ', clubId);
    try {
        yield Club.deleteOne({ _id: clubId }).then((response) => {
            if (response.deletedCount > 0) {
                res.status(200).json(response);
            }
            else {
                res.status(404).json(response.error || `Unable to find club with ID ${clubId}`);
            }
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
module.exports = {
    returnAllClubs,
    createClub,
    findClubById,
    updateClub,
    deleteClub,
};
