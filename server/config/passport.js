
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models');
const bcrypt = require('bcrypt')


const verifyUserLogin = (username, password, done) => {
    // User.findOne({ username: username }, (err, user) => {
    //     if (err) {
    //         return done(err);
    //     }
    //     if (!user) {
    //         return done(null, false, { message: 'Incorrect username' });
    //     }

    //     bcrypt.compare(password, user.password, (err, res) => {
    //         if (err) {
    //             return done(err);
    //         }

    //         if (res == false) {
    //             return done(null, false, { message: 'Incorrect password.' });
    //         }

    //         console.log('Verified user!');
    //         return done(null, user);
    //     })
    // })
    User.findOne({ username: username }).then((user) => {

        if (!user) { return done(null, false) }

        bcrypt.compare(password, user.password, (err, res) => {

            if (res === false) {
                return done(null, false, { message: 'Incorrect password.' })
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
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (userId, done) {
    // User.findById(userId, (err, user) => {
    //     if (err) {
    //         done(err)
    //     }

    //     done(null, user);
    // });

    User.findById(userId).then((user) => {
        done(null, user)
    }).catch((err) => done(err))
});

module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('isAuth Approved!');
        next();
    } else {
        console.log('Auth NOT Approved!');
        res.status(401).json({ msg: 'You are not authorized' })
    }
}