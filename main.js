const express = require('express')
const dotenv = require('dotenv');
const {registerRoute, loginRoute, logoutRoute} = require('./routes/routeAccount')
const home = require('./routes/home')
const cartRoute = require('./routes/cart')
const buyRouter = require('./routes/buy')
const cookieParse = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
//const corsOptionsDelegate = require('./utils/corsConfig')

dotenv.config();

const app = express();

app.use(cors());

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(express.static('public'))

app.use(cookieParse());

app.use(session({

    secret: 'secreto',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000
    }    
}));

app.use(passport.initialize());

app.use(passport.session());

app.use('/api', home);

app.use('/register', registerRoute);

app.use('/login', loginRoute)

app.use('/logout', logoutRoute)

app.use('/cart', cartRoute)

app.use('/buy', buyRouter)

module.exports = app;