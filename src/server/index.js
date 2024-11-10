const express = require("express");
const cors = require("cors"); /* npm install cors */
const bodyParser = require("body-parser"); /* npm install body-parser */
const cookieParser = require("cookie-parser"); /* npm install cookie-parser */
const session = require("express-session"); /* npm install express-session */
const MySQLStore = require('express-mysql-session')(session);
const crypto = require('crypto');
const jwt = require('jwt-simple'); /*npm install jwt-simple*/
const passport = require('passport'); /* npm install passport */
const rateLimiter = require('express-rate-limit'); /*npm install express-rate-limit*/

const db = require("./src/config/db.js");
const Login = require("./src/routes/Login.js");
const Logout = require("./src/routes/Logout.js");
const Registration = require("./src/routes/Registration.js");
const Dashboard = require("./src/routes/Dashboard.js");
const ForgotPassword = require("./src/routes/ForgotPassword.js");
const ResetPassword = require("./src/routes/ResetPassword.js");
const UserInformation = require("./src/routes/UserInformation.js")

const app = express();

// middlewares
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));

const sessionSecret = crypto.randomBytes(32).toString('hex');

const sessionStore = new MySQLStore({
    /* Your MySQL connection details */
    expiration: 86400000, /* Cookie will last 24 hours */
    checkExpirationInterval: 1800000, // 30 minutes in milliseconds
    clearExpired: true,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data',
        },
    }
}, db);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    session({
        secret: sessionSecret, /* can be anything */
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 86400000, /* Cookie will last 24 hours */
        },
    })
);

app.use(passport.initialize()); // for google login
app.use(passport.session());

app.use(rateLimiter({ // limits request made by a person
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
}));

// routes
app.use("/", Login);
app.use("/", Logout);
app.use("/", Registration);
app.use("/", Dashboard);
app.use("/", UserInformation);
app.use("/", ForgotPassword);
app.use("/", ResetPassword);

app.listen(3001, () => {
    console.log("Running Server");
});
