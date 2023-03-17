import { Request, Response } from 'express'
const Club = require('../models/clubs')
const ObjectId = require('mongodb').ObjectId

const returnAllClubs = async (req: Request, res: Response) => {
    try {
        await Club.find((err: Error, allClubs: typeof Club) => {
            if (err) {
                res.status(500).json(err)
            }
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(allClubs)
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

const createClub = async (req: Request, res: Response): Promise<void> => {
    const club = new Club({
        clubName: req.body.clubName,
        clubLocation: req.body.clubLocation,
        president: req.body.president,
        clubCreator: req.body.clubCreator,
        clubMembers: req.body.clubMembers,
    })
    try {
        const savedClub = await club.save()
        if (!savedClub) {
            res.status(500).json('Unable to save club!')
        } else {
            res.status(201).json(`New Club ID: ${savedClub._id}`)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

const findClubById = async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params)) {
        res.status(400).json('Must use a valid Club ID.')
    }

    const clubId = new ObjectId(req.params.id)
    try {
        Club.findById(clubId, function (err: Error, club: typeof Club) {
            if (err) {
                res.status(500).json({ message: err })
            }
            if (club) {
                res.setHeader('Content-Type', 'application/json')
                res.status(200).json(club)
            } else {
                res.status(400).json(`Unable to find club with ID ${clubId}`)
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { returnAllClubs, createClub, findClubById }
