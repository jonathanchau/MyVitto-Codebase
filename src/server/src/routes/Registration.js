const express = require('express');
const router = express.Router();
const pool = require("../config/db.js");
const bcrypt = require("bcrypt"); /* npm install bcrypt */
const crypto = require("crypto");
const { isValidEmail } = require("../utils/isVaildEmail.js");
const { isValidPassword } = require("../utils/isValidPassword.js");
const { checkForDuplicates } = require('../utils/checkDuplicates.js');

const saltRounds = 10;

/* http request; inserts username, email, and password into the database, also hashes and salts passwords */
router.post("/register", async (req, res) => {
    const db = await pool.getConnection();

    const id = crypto.randomUUID(); // NOTE: it is possible for another user to have the same UUID (Highly improbable though)
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    var validCredentials = true;
    var invalidEmail = "";
    var invalidUserName = "";
    var invalidPassword = "";
    var duplicate = "";

    if (checkForDuplicates(username)) {
        validCredentials = false;
        duplicate = "*Duplicate email or username. Please choose another";
    }

    if (!isValidEmail(email)) {
        validCredentials = false;
        invalidEmail = "*Has to be a valid email"
    }
    if (username.length === 0) {
        validCredentials = false;
        invalidUserName = "*Username must not be blank";
    }
    if (!isValidPassword(password)) {
        validCredentials = false;
        invalidPassword = "*8-20 characters, 1 special, 1 number required";
    }

    if (validCredentials) {
        try {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log(err)
                }
                const result = await db.execute(
                    "INSERT INTO users (user_id, username, password, email, profile_color) VALUES (?,?,?,?,?);",
                    [id, username, hash, email, randomColor]
                )

                req.session.user_id = id; // saves the result into session
                res.status(200).json({ result: result, username: username, invalidEmail: invalidEmail, invalidUserName: invalidUserName, invalidPassword: invalidPassword });
            })
        } catch (err) {
            console.log(err);
        } finally {
            db.release();
        }
        // bcrypt.hash(password, saltRounds, (err, hash) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     db.query(
        //         "INSERT INTO users (user_id, username, password, email, profile_color) VALUES (?,?,?,?,?);",
        //         [id, username, hash, email, randomColor],
        //         (err, result) => {
        //             req.session.user_id = id; // saves the result
        //             res.status(200).json({result: result, username: username, invalidEmail: invalidEmail, invalidUserName: invalidUserName, invalidPassword: invalidPassword});
        //             if (err){
        //                 res.status(404).json(err);
        //             }
        //         }
        //     );
        // })
    }
    else {
        res.status(200).json({ username: null, invalidEmail: invalidEmail, invalidUserName: invalidUserName, invalidPassword: invalidPassword });
        db.release();
    }
});

module.exports = router;
