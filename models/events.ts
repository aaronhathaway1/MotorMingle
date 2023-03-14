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

EventSchema.statics = {
    valueExists(query) {
        return this.findOne(query).then((result: any) => result)
    },
}

module.exports = mongoose.model('Event', EventSchema)
