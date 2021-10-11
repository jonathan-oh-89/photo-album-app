// const path = require('path');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { cloudinaryUpload } = require('./cloudinary');
const User = require('./models');
const passport = require('passport');
const bcrypt = require('bcrypt')

require('dotenv').config();
const sessionStore = require('./config/db');
const { isAuth } = require('./config/passport');

const app = express();

const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true
};
app.use(cors(corsOptions));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}))

require('./config/passport')

//initialize passport and create session
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log("*** session user: ", req.user);
    next();
})

// app.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/photoalbum',
//         failureRedirect: '/fail'
//     }));


app.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("*** Received login");

    res.send({ 'msg': 'login success!' })
});

app.post('/register', async (req, res) => {
    console.log("Received data", req.body);

    const exists = await User.exists({ username: req.body.username })

    if (exists) {
        1
        console.log("Username already taken!");
        res.send({ 'mongorecord': exists })
    } else {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                if (err) return next(err);

                const newUser = new User({
                    username: req.body.username,
                    password: hash
                })

                await newUser.save();
                res.redirect('/')
            })
        })
    }
});

app.get('/logout', (req, res) => {
    console.log("*** logout request received: ", req);
    res.send({ 'msg': 'logout success!' })
})


app.get('/', isAuth, (req, res, next) => {

    // if (req.session.viewCount) {
    //     req.session.viewCount = req.session.viewCount + 1
    // } else {
    //     req.session.viewCount = 1
    // }

    res.send({ 'test': 'Hello from server!' })
})

app.get('/photoalbum', isAuth, (req, res, next) => {
    // res.redirect('/photoalbum');
})


app.post('/uploadimages', (req, res) => {
    imgFiles = req.body.photos
    cloudinaryUpload(imgFiles)
})



app.get('*', (req, res) => {
    res.send('Did not reach any apis');
})

const PORT = 8000

app.listen(PORT, () => {
    console.log("Listening to PORT ", PORT);
})