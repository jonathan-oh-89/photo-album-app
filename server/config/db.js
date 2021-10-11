
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI
const mongoDBName = process.env.MONGO_DBNAME
const mongoUser = process.env.MONGO_USER
const mongoPassword = process.env.MONGO_PASSWORD
const mongoConnectionString = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoURI}/${mongoDBName}?retryWrites=true&w=majority`

mongoose.connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Mongo connected!");
});



const MongoStore = require('connect-mongo');

const sessionStore = MongoStore.create({
    mongoUrl: mongoConnectionString,
    collectionName: 'sessions'
})

module.exports = sessionStore