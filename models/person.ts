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
        type: Date
    },
    city: { 
        type: String
    },
    state: {
        type: String
    }
     

});

 
module.exports = mongoose.model('Person', personSchema);


