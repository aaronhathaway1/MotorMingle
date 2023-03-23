import { Request, Response } from 'express'
const Club = require('../models/clubs')
const ObjectId = require('mongodb').ObjectId

const returnAllClubs = async (req: Request, res: Response) => {
    try {
        await Club.find().then((allClubs: typeof Club) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(allClubs)
        })
    } catch (err) {
      console.log('catch error:', err)
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
        await Club.findById(clubId).then((club: typeof Club) => {
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

const updateClub = async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params)) {
        res.status(400).json('Must use a valid Club ID.')
    }
    const clubId = new ObjectId(req.params.id)
    try {
        let doc = await Club.findOne(clubId)
        if (!doc) {
            res.status(404).json(`Club with ID ${clubId} not found.`)
        }
        if (req.body.clubName) {
            doc.clubName = req.body.clubName
        }
        if (req.body.clubLocation) {
            doc.clubLocation = req.body.clubLocation
        }
        if (req.body.president) {
            doc.president = req.body.president
        }
        if (req.body.clubCreator) {
            doc.clubCreator = req.body.clubCreator
        }
        if (req.body.clubMembers?.length > 1) {
            for (let i in req.body.clubMembers) {
                if (doc.clubMembers.includes(req.body.clubMembers[i])) {
                    res.status(400).json(
                        `${req.body.clubMembers[i]} is already a member of ${doc.clubName}.`
                    )
                    return
                } else {
                    doc.clubMembers.push(req.body.clubMembers[i])
                }
            }
        } else if (!doc.clubMembers.includes(req.body.clubMembers)) {
            doc.clubMembers.push(req.body.clubMembers)
        }
        if (doc.clubMembers.includes(req.body.removeMember)) {
            doc.clubMembers.remove(req.body.removeMember)
        }
        await doc.save()
        res.status(204).json()
    } catch (err: any) {
        console.log('catch error', err)
        if (err.name === 'CastError') {
            res.status(400).json(err.message)
        } else {
            res.status(500).json(err)
        }
    }
}

const deleteClub = async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params)) {
        res.status(400).json('Must use a valid Club ID.')
    }
    const clubId = new ObjectId(req.params.id)
    console.log('clubId = ', clubId)
    try {
        await Club.deleteOne({ _id: clubId }).then((response: any) => {
            if (response.deletedCount > 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json(
                    response.error || `Unable to find club with ID ${clubId}`
                )
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    returnAllClubs,
    createClub,
    findClubById,
    updateClub,
    deleteClub,
}
