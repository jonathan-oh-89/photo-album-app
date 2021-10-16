const path = require('path');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { cloudinaryUpload, cloudinaryRetrieve, cloudinaryDelete, cloudinaryRetrieveAll } = require('./cloudinary');
const User = require('./models');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
}

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}


const sessionStore = require('./config/db');


const allowedOrigins = ['http://localhost:3000', 'https://photo-app-jono.herokuapp.com'];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true
};
app.use(cors(corsOptions));


app.use(cookieParser(process.env.SESSION_SECRET))

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


//initialize passport and create session
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const { isAuth } = require('./config/passport')

app.use((req, res, next) => {
    console.log("*** session user: ", req.user);
    next();
})

app.post('/register', async (req, res) => {
    console.log("*** RECEIVED REGISTER POST");

    const exists = await User.exists({ username: req.body.username })

    if (exists) {
        res.status(400).send({ 'message': 'Username already taken' })
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

                req.logIn(newUser, (err) => {
                    if (err) { return next(err); }
                    return res.status(200).json(newUser);
                });
            })
        })
    }
});


app.post('/login', (req, res, next) => {
    console.log("*** RECEIVED LOGIN POST");
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).json({ message: "Invalid Username or Password" })
        }

        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.status(200).json(user);
        });


    })(req, res, next);
});


app.get('/logout', (req, res) => {
    req.logout();
    // req.session.destroy();
    res.status(200).send({ 'message': 'logout success!' })
})


app.get('/', isAuth, (req, res, next) => {
    res.send({ 'test': 'Hello from server!' })
})

app.post('/retrieveimages', isAuth, async (req, res, next) => {
    console.log("*** RECEIVED RETRIEVEIMAGES POST");
    const { userid, username, album } = req.body;

    const photoArray = await cloudinaryRetrieve(username)

    res.status(200).send(photoArray)
})

app.get('/retrieveallimages', async (req, res) => {
    console.log("*** RECEIVED RETRIEVEALLIMAGES GET");
    const photoArray = await cloudinaryRetrieveAll()
    res.status(200).send(photoArray)
})

app.post('/uploadimages', isAuth, async (req, res) => {
    try {
        const { imgFiles, userid, username } = req.body;

        const photoAlbum = await cloudinaryUpload(imgFiles, username)

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(1000) /// waiting 1 second.
        console.log("Sleep for 1 second to let cloudinary finish upload");

        User.findByIdAndUpdate({ _id: userid }, { $push: { album: photoAlbum } }, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Successfully uploaded user album");
                return res.status(200).send(photoAlbum)
            }
        })
    } catch (error) {
        console.log(error);
    }
})

app.post('/deleteimages', isAuth, async (req, res, next) => {
    const { userid, username, imageid } = req.body;

    const fileToDelete = username + "/" + imageid;

    const deleteStatus = await cloudinaryDelete(fileToDelete)


    User.findByIdAndUpdate({ _id: userid }, { $pull: { album: { imageid: imageid } } }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Deleted img");
            res.status(deleteStatus).send({ 'message': 'delete image success!' })
        }
    })
})


app.get('*', (req, res) => {
    res.send('Did not reach any apis');
})



const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log("Listening to PORT ", PORT);
})