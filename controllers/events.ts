import { Request, Response } from 'express'
const Event = require('../models/events')
const ObjectId = require('mongodb').ObjectId

const returnAllEvents = async (req: Request, res: Response) => {
    try {
        await Event.find().then((allEvents: typeof Event) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(allEvents)
        })
    } catch (err) {
        console.log('catch error:', err)
        res.status(500).json(err)
    }
}

const createEvent = async (req: Request, res: Response): Promise<void> => {
    const event = new Event({
        date: req.body.date,
        time: req.body.time,
        location: req.body.president,
        organizer: req.body.organizer,
    })
    try {
        const savedEvent = await event.save()
        if (!savedEvent) {
            res.status(500).json('Unable to save event!')
        } else {
            res.status(201).json(`New Event ID: ${savedEvent._id}`)
        }
    } catch (err) {
        console.log('catch error', err)
        res.status(500).json(err)
    }
}

const findEventById = async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params)) {
        res.status(400).json('Must use a valid Event ID.')
    }

    const eventId = new ObjectId(req.params.id)
    try {
        await Event.findById(eventId).then((event: typeof Event) => {
            if (event) {
                res.setHeader('Content-Type', 'application/json')
                res.status(200).json(event)
            } else {
                res.status(400).json(`Unable to find event with ID ${eventId}`)
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

const updateEvent = async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params)) {
        res.status(400).json('Must use a valid Event ID.')
    }
    const eventId = new ObjectId(req.params.id)
    try {
        let doc = await Event.findOne(eventId)
        if (!doc) {
            res.status(404).json(`Event with ID ${eventId} not found.`)
        }
        if (req.body.date) {
            doc.date = req.body.date
        }
        if (req.body.time) {
            doc.time = req.body.time
        }
        if (req.body.location) {
            doc.location = req.body.location
        }
        if (req.body.organizer) {
            doc.organizer = req.body.organizer
        }

        await doc.save()
        res.status(204).json()
    } catch (err: any) {
        if (err.name === 'CastError') {
            res.status(400).json(err.message)
        } else {
            res.status(500).json(err)
        }
    }
}

const deleteEvent = async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params)) {
        res.status(400).json('Must use a valid Event ID.')
    }
    const eventId = new ObjectId(req.params.id)
    console.log('eventId = ', eventId)
    try {
        await Event.deleteOne({ _id: eventId }).then((response: any) => {
            if (response.deletedCount > 0) {
                res.status(200).json(response)
            } else {
                res.status(404).json(
                    response.error || `Unable to find event with ID ${eventId}`
                )
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    returnAllEvents,
    createEvent,
    findEventById,
    updateEvent,
    deleteEvent,
}
