import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
    date: {
        type: 'String',
        required: true,
    },
    time: {
        type: 'String',
        required: true,
    },
    location: {
        type: 'String',
        required: true,
    },
    organizer: {
        type: 'String',
        required: true,
    },
}) 
 
 
module.exports = mongoose.model('Event', EventSchema)
