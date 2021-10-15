
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models');
const bcrypt = require('bcrypt')


const verifyUserLogin = (username, password, done) => {
    User.findOne({ username: username }).then((user) => {

        if (!user) { return done(null, false) }

        bcrypt.compare(password, user.password, (err, res) => {

            if (res === false) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        })
    }).catch((err) => {
        console.log("Error verifying login function");
        done(err)
    })
}

passport.use(new LocalStrategy(verifyUserLogin));


//when we log in, we serialize and deserialize user
passport.serializeUser((user, done) => {
    console.log("Serialize: ", user);
    // console.log("Serializing");
    done(null, user.id);
})

passport.deserializeUser((userId, done) => {
    console.log("Deserialize: ", userId);
    User.findById(userId).then((user) => {
        done(null, user)
    }).catch((err) => done(err))
});

module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        // console.log('isAuth Approved!');
        next();
    } else {
        console.log('isAuth NOT Approved!');
        res.status(401).json({ message: 'You are not authorized' })
    }
}