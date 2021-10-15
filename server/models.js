
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    // userid: {
    //     type: String,
    //     required: true
    // },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    album: {
        type: [Object],
        required: true
    },
},
    { autoCreate: true }
);

// UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema)