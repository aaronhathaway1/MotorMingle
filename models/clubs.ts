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

ClubSchema.statics = {
    valueExists(query) {
        return this.findOne(query).then((result: any) => result)
    },
}

module.exports = mongoose.model('Club', ClubSchema)
