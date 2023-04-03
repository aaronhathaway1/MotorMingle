import mongoose from 'mongoose'
const schema = mongoose.Schema

const personSchema = new schema({
    googleId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        min: '1900-01-01',
        max: '2023-01-01'
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
})

module.exports = mongoose.model('Person', personSchema)
