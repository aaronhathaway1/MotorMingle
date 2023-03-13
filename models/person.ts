import mongoose from 'mongoose'
const schema = mongoose.Schema;

const personSchema = new schema ({

   firstName: {
    type: String,
    required: true
    },
    lastName: {
        type: String,
        required: true

        },
    email: {
        type: String,
        required: true
        },
    birthday: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
});

 
module.exports = mongoose.model('Person', personSchema);


