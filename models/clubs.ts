import mongoose from 'mongoose'

const ClubSchema = new mongoose.Schema({
    clubName: {
        type: 'String',
        required: true,
    },
    clubLocation: {
        type: 'String',
        required: true,
    },
    president: {
        type: 'String',
        required: true,
    },
    clubCreator: {
        type: 'String',
        required: true,
    },
    clubMembers: ['String'],
})

module.exports = mongoose.model('Club', ClubSchema)
