const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
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


module.exports = mongoose.model('User', UserSchema)