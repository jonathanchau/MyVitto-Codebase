const express = require('express');
const router = express.Router();
const pool = require("../config/db.js");
const bcrypt = require("bcrypt"); /* npm install bcrypt */
const passport = require("../config/passport.js");

// sees if the user has logged on or not already (remembers login using cookie)
router.get("/login", async (req, res) => {
    const db = await pool.getConnection();

    const user_id = req.session.user_id; 
    // console.log(req.session.user_id)   

    try {
        const result = await db.execute('SELECT * FROM users WHERE user_id = ?', [user_id])
        // console.log(result[0])

        if (result) {
            if (req.session.user_id) {
                res.send({ loggedIn: true, userInfo: result[0] })
            } else{
                res.send({ loggedIn: false, userInfo: result[0] })
            }
        }
    } catch (err) {
        res.send({ err: err})
    } finally {
        db.release();  // ends the connection
    }

    // db.query(
    //     "SELECT * FROM users WHERE user_id = ?;",
    //     [user_id],
    //     (err, result) => {
    //         if (err) {
    //             res.send({ err: err })
    //         }
    //         if (result) {
    //             if (req.session.user_id) {
    //                 res.send({ loggedIn: true, userInfo: result })
    //             } else {
    //                 res.send({ loggedIn: false, userInfo: result })
    //             }
    //         }
    //     }
    // )
});

/* http request; checks if username or email can be found in the database. if it can, checks if the password can be found*/
router.post("/login", async (req, res) => {
    const db = await pool.getConnection();

    const usernameOrEmail = req.body.usernameOrEmail;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe;

    try {
        const result = await db.execute('SELECT * FROM users WHERE username = ? OR email = ?', [usernameOrEmail, usernameOrEmail]);

        if (result) {
            const response = await bcrypt.compare(password, result[0][0].password);

            if (response) {
                if (rememberMe) { // checks if the user clicked the remember me check box
                    req.session.cookie.maxAge = 2592000000;
                }
                req.session.user_id = result[0][0].user_id; // saves the result in session
                // console.log(result[0][0].user_id)
                // console.log(req.session.user_id)
                res.status(200).send(result[0]);
            } else {
                res.status(401).send({ message: "*Wrong Login Credentials" });
            }
        } else {
            res.status(401).send({ message: "*Wrong Login Credentials" });
        }
    } catch (err) {
        res.status(500).send({ err: err })
    } finally {
        db.release();
    }

    // db.query(
    //     "SELECT * FROM users WHERE username = ? OR email = ?;",
    //     [usernameOrEmail, usernameOrEmail],
    //     (err, result) => {
    //         if (err) {
    //             res.send({ err: err })
    //         }
    //         if (result.length > 0) {
    //             bcrypt.compare(password, result[0].password, (error, response) => {
    //                 if (response) {
    //                     if (rememberMe) { // checks if the user clicked the remember me check box
    //                         req.session.cookie.maxAge = 2592000000;
    //                     }
    //                     req.session.user_id = result[0].user_id; // saves the result
    //                     console.log(result);
    //                     res.send(result);
    //                 } else {
    //                     res.send({ message: "*Wrong Login Credentials" });
    //                 }
    //             });
    //         } else {
    //             res.send({ message: "*Wrong Login Credentials" });
    //         }
    //     }
    // )
});

// authentication giving the scope of profile and email
router.get("/authenticateWithGoogle", passport.authenticate('google', {
    scope: ['profile', 'email'],
    failureRedirect:'http://localhost:3000/login'
}), async (req, res) => {
    req.session.user_id = req.user.id; // save information to user's session
    const username = req.user.displayName;
    res.redirect(`http://localhost:3000/Dashboard/${username}`)
    // res.status(200).json(req.user);
});

// get the currently authenticated user's information
router.get("/google-getUser", async (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

module.exports = router;
